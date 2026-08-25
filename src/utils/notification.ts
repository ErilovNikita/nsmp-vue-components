import { notification } from 'ant-design-vue'
import type { NotificationPlacement } from 'ant-design-vue'
import { defineComponent, h, ref } from 'vue'

export type NotificationType = 'success' | 'info' | 'warning' | 'error'
type AntNotificationOptions = Parameters<typeof notification.open>[0]
export type NotificationContent = AntNotificationOptions['message']

export interface OpenNotificationOptions {
  /** Notification title. */
  title: NotificationContent
  /** Main notification content. */
  description?: NotificationContent
  /** Additional content, for example action buttons. */
  action?: NotificationContent
  /** Notification position. @default 'topRight' */
  placement?: NotificationPlacement
  /** NSMP notification color scheme. @default 'info' */
  type?: NotificationType
  /** Time before automatic closing, in seconds. @default 4.5 */
  duration?: number
  /** Whether the notification should close automatically. @default true */
  autoClose?: boolean
  /** Whether to display the manual close button. @default true */
  closable?: boolean
  /** Whether to show description and actions immediately. @default false */
  expandedByDefault?: boolean
  /** Stable key. Reusing a key updates an existing notification. */
  key?: string
  icon?: NotificationContent
  class?: string
  style?: AntNotificationOptions['style']
  onClick?: () => void
  onClose?: () => void
  getContainer?: AntNotificationOptions['getContainer']
}

export interface NotificationController {
  key: string
  close: () => void
}

let notificationId = 0

const createNotificationKey = () => {
  notificationId += 1
  return `nsmp-notification-${notificationId}`
}

const renderContent = (content: NotificationContent | undefined) => {
  return typeof content === 'function' ? content() : content
}

const createNotificationContent = (
  title: NotificationContent,
  description: NotificationContent | undefined,
  action: NotificationContent | undefined,
  icon: NotificationContent | undefined,
  expandedByDefault: boolean,
) => defineComponent({
  name: 'NsmpNotificationContent',
  setup() {
    const expanded = ref(expandedByDefault)
    const hasDescription = description !== undefined && description !== null
    const hasAction = action !== undefined && action !== null
    const expandable = hasDescription || hasAction

    return () => h('div', {
      class: [
        'nsmp-notification__layout',
        expanded.value && 'nsmp-notification__layout--expanded',
      ],
    }, [
      h('button', {
        type: 'button',
        class: 'nsmp-notification__toggle',
        disabled: !expandable,
        'aria-expanded': expanded.value,
        'aria-label': expanded.value ? 'Свернуть уведомление' : 'Раскрыть уведомление',
        onClick: (event: { stopPropagation: () => void }) => {
          event.stopPropagation()
          expanded.value = !expanded.value
        },
      }, [expandable ? h('span', { class: 'nsmp-notification__chevron' }) : null]),
      h('div', { class: 'nsmp-notification__content' }, [
        h('div', { class: 'nsmp-notification__title' }, [
          icon ? h('span', { class: 'nsmp-notification__icon' }, [renderContent(icon)]) : null,
          renderContent(title),
        ]),
        expanded.value && hasDescription
          ? h('div', { class: 'nsmp-notification__description' }, [renderContent(description)])
          : null,
        expanded.value && hasAction
          ? h('div', { class: 'nsmp-notification__action' }, [renderContent(action)])
          : null,
      ]),
    ])
  },
})

/** Opens a one-off notification and returns a controller for closing it manually. */
export const openNotification = (options: OpenNotificationOptions): NotificationController => {
  const {
    title,
    description,
    action,
    placement = 'topRight',
    type = 'info',
    duration = 4.5,
    autoClose = true,
    closable = true,
    expandedByDefault = false,
    key = createNotificationKey(),
    icon,
    class: className,
    ...rest
  } = options

  const content = createNotificationContent(
    title,
    description,
    action,
    icon,
    expandedByDefault,
  )

  notification.open({
    ...rest,
    key,
    message: () => h(content),
    placement,
    duration: autoClose ? duration : null,
    class: [
      'nsmp-notification',
      `nsmp-notification--${type}`,
      className,
      !closable && 'nsmp-notification--not-closable',
    ].filter(Boolean).join(' '),
  })

  return {
    key,
    close: () => notification.close(key),
  }
}

export const closeNotification = (key: string) => notification.close(key)

export const destroyNotifications = () => notification.destroy()

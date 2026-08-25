import { mount } from '@vue/test-utils'
import { notification } from 'ant-design-vue'
import { h } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  closeNotification,
  destroyNotifications,
  openNotification,
} from '@/utils'

vi.mock('ant-design-vue', () => ({
  notification: {
    open: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
    close: vi.fn(),
    destroy: vi.fn(),
  },
}))

describe('notification utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('opens a notification with convenient defaults', () => {
    const controller = openNotification({
      title: 'Saved',
      description: 'Changes have been saved',
    })

    expect(notification.open).toHaveBeenCalledWith(expect.objectContaining({
      key: controller.key,
      placement: 'topRight',
      duration: 4.5,
      class: 'nsmp-notification nsmp-notification--info',
    }))

    controller.close()
    expect(notification.close).toHaveBeenCalledWith(controller.key)
  })

  it('supports a type, action, persistent mode, and hidden close button', () => {
    const action = () => 'Undo'

    openNotification({
      title: 'Deleted',
      action,
      type: 'warning',
      placement: 'bottomLeft',
      autoClose: false,
      closable: false,
      class: 'custom-notification',
    })

    expect(notification.open).toHaveBeenCalledWith(expect.objectContaining({
      placement: 'bottomLeft',
      duration: null,
      class: 'nsmp-notification nsmp-notification--warning custom-notification nsmp-notification--not-closable',
    }))
  })

  it('is collapsed by default and expands the description and action on click', async () => {
    openNotification({
      title: 'Task changed',
      description: 'New task description',
      action: 'Open task',
    })

    const args = vi.mocked(notification.open).mock.calls[0][0]
    const renderMessage = args.message as () => ReturnType<typeof h>
    const wrapper = mount({ render: renderMessage })

    expect(wrapper.text()).toContain('Task changed')
    expect(wrapper.text()).not.toContain('New task description')
    expect(wrapper.text()).not.toContain('Open task')
    expect(wrapper.find('.nsmp-notification__toggle').attributes('aria-expanded')).toBe('false')

    await wrapper.find('.nsmp-notification__toggle').trigger('click')

    expect(wrapper.text()).toContain('New task description')
    expect(wrapper.text()).toContain('Open task')
    expect(wrapper.find('.nsmp-notification__toggle').attributes('aria-expanded')).toBe('true')
  })

  it('can be expanded by default', () => {
    openNotification({
      title: 'Task changed',
      description: 'New task description',
      expandedByDefault: true,
    })

    const args = vi.mocked(notification.open).mock.calls[0][0]
    const renderMessage = args.message as () => ReturnType<typeof h>
    const wrapper = mount({ render: renderMessage })

    expect(wrapper.text()).toContain('New task description')
    expect(wrapper.find('.nsmp-notification__toggle').attributes('aria-expanded')).toBe('true')
  })

  it('forwards callbacks and supports direct close and destroy helpers', () => {
    const onClick = vi.fn()
    const onClose = vi.fn()

    openNotification({ title: 'Info', key: 'info-key', onClick, onClose })
    closeNotification('info-key')
    destroyNotifications()

    expect(notification.open).toHaveBeenCalledWith(expect.objectContaining({ onClick, onClose }))
    expect(notification.close).toHaveBeenCalledWith('info-key')
    expect(notification.destroy).toHaveBeenCalledOnce()
  })
})

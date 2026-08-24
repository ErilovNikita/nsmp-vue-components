import { mount } from '@vue/test-utils'
import { Alert as AntAlert } from 'ant-design-vue'
import { describe, expect, it } from 'vitest'
import { Alert } from '@/components'

const mountAlert = (options = {}) => mount(Alert, {
  ...options,
  global: {
    stubs: {
      AAlert: {
        name: 'AntAlert',
        props: ['closable', 'message', 'showIcon', 'type'],
        emits: ['close'],
        template: `
          <section>
            <span class="message"><slot name="message">{{ message }}</slot></span>
            <slot name="action" />
            <button class="close" @click="$emit('close', $event)">Close</button>
          </section>
        `,
      },
    },
  },
})

describe('Alert', () => {
  it('is hidden initially and preserves the old default settings', () => {
    const wrapper = mountAlert()

    expect(wrapper.findComponent(AntAlert).exists()).toBe(false)
    expect(wrapper.props()).toMatchObject({
      closable: true,
      open: false,
      showIcon: true,
      type: 'info',
    })
  })

  it('implements the complete chainable AlertController API', async () => {
    const wrapper = mountAlert()

    const api = wrapper.vm.setType('success')
    expect(api.setMessage('Saved')).toBe(api)
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AntAlert).props()).toMatchObject({
      message: 'Saved',
      type: 'success',
    })

    expect(api.clear()).toBe(api)
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(AntAlert).props('message')).toBeUndefined()

    expect(api.hidden()).toBe(api)
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(AntAlert).exists()).toBe(false)

    expect(api.show()).toBe(api)
  })

  it('hides and clears the message when Ant Design closes the alert', async () => {
    const wrapper = mountAlert()
    wrapper.vm.setMessage('Temporary message')
    await wrapper.vm.$nextTick()

    await wrapper.find('.close').trigger('click')

    expect(wrapper.findComponent(AntAlert).exists()).toBe(false)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('supports v-model:open and the action slot', async () => {
    const wrapper = mountAlert({
      props: { open: true, message: 'Cached data found' },
      slots: { action: '<button class="restore">Restore</button>' },
    })

    expect(wrapper.find('.message').text()).toBe('Cached data found')
    expect(wrapper.find('.restore').text()).toBe('Restore')

    await wrapper.setProps({ open: false })
    expect(wrapper.findComponent(AntAlert).exists()).toBe(false)
  })
})

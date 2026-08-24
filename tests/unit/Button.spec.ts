import { mount } from '@vue/test-utils'
import { defineComponent, h, markRaw } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { NsmpButton } from '@/components'

const Icon = defineComponent({
  setup() {
    return () => h('img', { alt: 'Delete icon', src: '/delete.svg' })
  },
})

describe('NsmpButton', () => {
  it('maps the NSMP type to the Ant Design button', () => {
    const wrapper = mount(NsmpButton, {
      props: { type: 'default' },
      slots: { default: 'Delete' },
    })

    expect(wrapper.find('button').classes()).toContain('ant-btn-dangerous')
    expect(wrapper.text()).toBe('Delete')
  })

  it('renders the icon component before the button content', () => {
    const wrapper = mount(NsmpButton, {
      props: { icon: markRaw(Icon) },
      slots: { default: 'Delete' },
    })

    expect(wrapper.find('button img').attributes('alt')).toBe('Delete icon')
    expect(wrapper.find('button').text()).toBe('Delete')
  })

  it('forwards click handlers to the Ant Design button', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NsmpButton, {
      props: { onClick },
      slots: { default: 'Save' },
    })

    await wrapper.find('button').trigger('click')

    expect(onClick).toHaveBeenCalledOnce()
  })
})

import { mount } from '@vue/test-utils'
import { defineComponent, h, markRaw } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components'

const Icon = defineComponent({
  setup() {
    return () => h('img', { alt: 'Delete icon', src: '/delete.svg' })
  },
})

describe('Button', () => {
  it('maps the type to the Ant Design button', () => {
    const wrapper = mount(Button, {
      props: { type: 'default' },
      slots: { default: 'Delete' },
    })

    expect(wrapper.find('button').classes()).toContain('ant-btn-default')
    expect(wrapper.text()).toBe('Delete')
  })

  it('renders the icon component before the button content', () => {
    const wrapper = mount(Button, {
      props: { icon: markRaw(Icon) },
      slots: { default: 'Delete' },
    })

    expect(wrapper.find('button img').attributes('alt')).toBe('Delete icon')
    expect(wrapper.find('button').text()).toBe('Delete')
  })

  it('renders an SVG string before the button content', () => {
    const icon = '<svg viewBox="0 0 16 16" aria-label="Save icon"><path d="M1 1h14v14H1z" /></svg>'
    const wrapper = mount(Button, {
      props: { icon },
      slots: { default: 'Save' },
    })

    expect(wrapper.find('button .btn-icon svg').attributes('aria-label')).toBe('Save icon')
    expect(wrapper.find('button .btn-icon path').attributes('d')).toBe('M1 1h14v14H1z')
    expect(wrapper.find('button').text()).toBe('Save')
  })

  it('forwards click handlers to the Ant Design button', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { onClick },
      slots: { default: 'Save' },
    })

    await wrapper.find('button').trigger('click')

    expect(onClick).toHaveBeenCalledOnce()
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NsmpConfigProvider } from '@/components'

describe('NsmpConfigProvider', () => {
  it('provides the Naumen theme by default', () => {
    const wrapper = mount(NsmpConfigProvider, {
      slots: { default: '<button class="probe">Content</button>' },
    })

    expect(wrapper.find('.probe').exists()).toBe(true)
    expect(wrapper.find('.ant-btn').exists()).toBe(false)
  })

  it('accepts a custom Ant Design theme', () => {
    const wrapper = mount(NsmpConfigProvider, {
      props: { theme: { token: { colorPrimary: '#00aa00' } } },
    })

    expect(wrapper.props('theme')).toEqual({ token: { colorPrimary: '#00aa00' } })
  })
})

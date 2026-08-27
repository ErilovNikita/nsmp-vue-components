import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Caption } from '@/components'

describe('Caption', () => {
  it('renders level four title and default slot', () => {
    const wrapper = mount(Caption, {
      props: { label: 'Настройки' },
      slots: { default: '<p class="content">Содержимое</p>' },
    })

    expect(wrapper.find('h4').text()).toBe('Настройки')
    expect(wrapper.find('h4').classes()).toContain('library-caption-title')
    expect(wrapper.find('.content').text()).toBe('Содержимое')
  })

  it('forwards a custom title level', () => {
    const wrapper = mount(Caption, {
      props: { label: 'Раздел', level: 2 },
    })

    expect(wrapper.find('h2').text()).toBe('Раздел')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ConfigProvider as AntConfigProvider } from 'ant-design-vue'
import { ConfigProvider } from '@/components'

describe('ConfigProvider', () => {
  it('provides the blue theme by default', () => {
    const wrapper = mount(ConfigProvider, {
      slots: { default: '<button class="probe">Content</button>' },
    })

    expect(wrapper.find('.probe').exists()).toBe(true)
    expect(wrapper.find('.ant-btn').exists()).toBe(false)
  })

  it('provides the Russian Ant Design locale by default', () => {
    const wrapper = mount(ConfigProvider)
    const locale = wrapper.findComponent(AntConfigProvider).props('locale')

    expect(locale).toMatchObject({
      locale: 'ru',
      Modal: { cancelText: 'Отмена' },
    })
    expect(locale?.DatePicker?.lang.placeholder).toBe('Выберите дату')
  })

  it('allows the default locale to be overridden', () => {
    const locale = { locale: 'custom' }
    const wrapper = mount(ConfigProvider, { props: { locale } })

    expect(wrapper.findComponent(AntConfigProvider).props('locale')).toStrictEqual(locale)
  })

  it('accepts a custom Ant Design theme', () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { token: { colorPrimary: '#00aa00' } } },
    })

    expect(wrapper.props('theme')).toEqual({ token: { colorPrimary: '#00aa00' } })
  })

  it('maps buttonBackground to the Ant Design Button theme', () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        nsmpTheme: {
          buttonBackground: '#123456',
        },
      },
    })

    const antTheme = wrapper.findComponent(AntConfigProvider).props('theme')

    expect(antTheme?.components?.Button).toMatchObject({ colorPrimary: '#123456' })
  })
})

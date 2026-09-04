import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ConfigProvider as AntConfigProvider } from 'ant-design-vue'
import { ConfigProvider } from '@/components'
import { blue } from '@/tokens'

describe('ConfigProvider', () => {
  it('provides the blue theme by default', () => {
    const wrapper = mount(ConfigProvider, {
      slots: { default: '<button class="probe">Content</button>' },
    })

    expect(wrapper.find('.probe').exists()).toBe(true)
    expect(wrapper.find('.ant-btn').exists()).toBe(false)
    const antTheme = wrapper.findComponent(AntConfigProvider).props('theme')

    expect(blue).toMatchObject({
      accentColor: '#7f96b9',
      inputHeight: '32px',
    })
    expect(antTheme?.token).toMatchObject({
      colorPrimary: blue.accentColor,
      controlHeight: 32,
    })
    expect(antTheme?.components?.Button).toMatchObject({
      colorPrimary: blue.buttonBackground,
    })
    expect(wrapper.find('.library-theme').attributes('style')).toContain(
      '--library-button-default-bg: #f4f4f4',
    )
    expect(wrapper.find('.library-theme').attributes('style')).toContain(
      '--library-modal-color-bg-base: #fff',
    )
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

  it('adds global compact styles when compact mode is enabled', async () => {
    const wrapper = mount(ConfigProvider, { props: { compact: true } })
    const themeStyles = wrapper.find('.library-theme')

    expect(themeStyles.classes()).toContain('library-theme--compact')

    await wrapper.setProps({ compact: false })
    expect(themeStyles.classes()).not.toContain('library-theme--compact')

    wrapper.unmount()
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

  it('maps the default button colors for every interaction state', () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        nsmpTheme: {
          advlistButtonTextColor: '#111111',
          advlistButtonBackground: '#222222',
          advlistButtonHoverTextColor: '#333333',
          advlistButtonHoverBackground: '#444444',
          advlistButtonActiveTextColor: '#555555',
          advlistButtonActiveBackground: '#666666',
        },
      },
    })

    const antTheme = wrapper.findComponent(AntConfigProvider).props('theme')

    expect(antTheme?.components?.Button).toMatchObject({
      defaultColor: '#111111',
      defaultBg: '#222222',
      defaultHoverColor: '#333333',
      defaultHoverBg: '#444444',
      defaultActiveColor: '#555555',
      defaultActiveBg: '#666666',
    })
  })

  it('maps inputBackground to every form input component', () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        nsmpTheme: {
          inputBackground: '#123456',
        },
      },
    })

    const antTheme = wrapper.findComponent(AntConfigProvider).props('theme')

    expect(antTheme?.components?.Input).toMatchObject({ colorBgContainer: '#123456' })
    expect(antTheme?.components?.InputNumber).toMatchObject({ colorBgContainer: '#123456' })
    expect(antTheme?.components?.DatePicker).toMatchObject({ colorBgContainer: '#123456' })
    expect(antTheme?.components?.Select).toMatchObject({ colorBgContainer: '#123456' })
  })
})

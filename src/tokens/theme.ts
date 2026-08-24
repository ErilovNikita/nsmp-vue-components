import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

export const naumen: ThemeConfig = {
    components: {
        Button: {
            colorPrimary: '#ec8e2b',
            colorPrimaryHover: '#d37513',
            colorPrimaryActive: '#a45b0f',
        },
        Checkbox: {
            lineHeight: 1,
            colorPrimary: 'rgb(0, 99, 176)',
            colorPrimaryHover: 'rgb(0, 99, 176)',
        }
    },
    token: {
        borderRadius: 2,
        colorPrimaryHover: 'rgb(0, 99, 176)',
        colorText: '#323232',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 13,
    }
}

export type NsmpTheme = ThemeConfig

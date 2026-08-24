import type { ConfigProviderProps } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { NsmpThemeProperties } from '@/data'

export interface NsmpConfigProviderProps extends Omit<ConfigProviderProps, 'theme'> {
  theme?: ThemeConfig
  nsmpTheme?: NsmpThemeProperties
}

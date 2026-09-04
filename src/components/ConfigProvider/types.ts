import type { ConfigProviderProps as AntConfigProviderProps } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { NsmpThemeProperties } from '@/utils'

export interface ConfigProviderProps extends Omit<AntConfigProviderProps, 'theme'> {
  theme?: ThemeConfig
  nsmpTheme?: NsmpThemeProperties
  compact?: boolean
}

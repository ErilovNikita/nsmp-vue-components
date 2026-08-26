import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { NsmpThemeProperties } from '@/utils'
import { blue } from '@/tokens'
import { createComponentTokens } from './componentTokens'
import { createGlobalTokens } from './globalTokens'
import type { TokenRecord } from './tokenUtils'

export const createProviderTheme = (
  nsmpTheme?: NsmpThemeProperties,
  theme?: ThemeConfig,
): ThemeConfig => {
  const componentTokens = createComponentTokens(nsmpTheme)
  type ComponentName = keyof typeof componentTokens

  const mergedComponents = Object.fromEntries(
    (Object.keys(componentTokens) as ComponentName[]).map(componentName => [
      componentName,
      {
        ...(blue.components?.[componentName] as TokenRecord | undefined),
        ...componentTokens[componentName],
        ...(theme?.components?.[componentName] as TokenRecord | undefined),
      },
    ]),
  )

  return {
    ...blue,
    ...theme,
    token: {
      ...blue.token,
      ...createGlobalTokens(nsmpTheme),
      ...theme?.token,
    },
    components: {
      ...blue.components,
      ...theme?.components,
      ...mergedComponents,
    },
  }
}

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
  const themeProperties = { ...blue, ...nsmpTheme }
  const componentTokens = createComponentTokens(themeProperties)
  type ComponentName = keyof typeof componentTokens

  const mergedComponents = Object.fromEntries(
    (Object.keys(componentTokens) as ComponentName[]).map(componentName => [
      componentName,
      {
        ...componentTokens[componentName],
        ...(theme?.components?.[componentName] as TokenRecord | undefined),
      },
    ]),
  )

  return {
    ...theme,
    token: {
      ...createGlobalTokens(themeProperties),
      ...theme?.token,
    },
    components: {
      ...theme?.components,
      ...mergedComponents,
    },
  }
}

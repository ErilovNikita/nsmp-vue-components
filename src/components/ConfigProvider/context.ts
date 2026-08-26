import { computed, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { NsmpThemeProperties } from '@/utils'

export interface DefaultButtonTokens {
  defaultColor: string
  defaultBg: string
  defaultHoverColor: string
  defaultHoverBg: string
  defaultActiveColor: string
  defaultActiveBg: string
}

export const defaultButtonTokens: DefaultButtonTokens = {
  defaultColor: '#5f5f5f',
  defaultBg: '#f4f4f4',
  defaultHoverColor: '#5f5f5f',
  defaultHoverBg: '#e4e4e4',
  defaultActiveColor: '#5f5f5f',
  defaultActiveBg: '#bbb',
}

export const defaultButtonTokensKey: InjectionKey<ComputedRef<DefaultButtonTokens>> =
  Symbol('library-default-button-tokens')

export const provideDefaultButtonTokens = (
  getTheme: () => NsmpThemeProperties | undefined,
) => provide(defaultButtonTokensKey, computed(() => {
  const theme = getTheme()

  return {
    defaultColor: theme?.advlistButtonTextColor ?? defaultButtonTokens.defaultColor,
    defaultBg: theme?.advlistButtonBackground ?? defaultButtonTokens.defaultBg,
    defaultHoverColor: theme?.advlistButtonHoverTextColor ?? defaultButtonTokens.defaultHoverColor,
    defaultHoverBg: theme?.advlistButtonHoverBackground ?? defaultButtonTokens.defaultHoverBg,
    defaultActiveColor: theme?.advlistButtonActiveTextColor ?? defaultButtonTokens.defaultActiveColor,
    defaultActiveBg: theme?.advlistButtonActiveBackground ?? defaultButtonTokens.defaultActiveBg,
  }
}))

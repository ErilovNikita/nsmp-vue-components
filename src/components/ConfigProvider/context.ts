import type { ComputedRef, InjectionKey } from 'vue'

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

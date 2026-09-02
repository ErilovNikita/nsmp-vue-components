import type { ComputedRef, InjectionKey } from 'vue'

export type FormModel = Record<string | number, unknown>

export const formModelKey: InjectionKey<ComputedRef<FormModel | undefined>>
  = Symbol('libraryFormModel')

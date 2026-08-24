export type MaybePromise<T> = T | Promise<T>

export interface LabelValueOption<TValue = string> {
  label: string
  value: TValue
  disabled?: boolean
}

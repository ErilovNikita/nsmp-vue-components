import type { LabelValueOption } from '@/types'

export interface FormatOptionsConfig<TItem, TValue = string> {
  label: (item: TItem) => string
  value: (item: TItem) => TValue
  disabled?: (item: TItem) => boolean
}

export function formatOptions<TItem, TValue = string>(
  items: readonly TItem[],
  config: FormatOptionsConfig<TItem, TValue>,
): LabelValueOption<TValue>[] {
  return items.map((item) => ({
    label: config.label(item),
    value: config.value(item),
    ...(config.disabled ? { disabled: config.disabled(item) } : {}),
  }))
}

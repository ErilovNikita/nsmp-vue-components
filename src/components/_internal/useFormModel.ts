import type { FormItemProps } from 'ant-design-vue'
import { computed, getCurrentInstance, inject } from 'vue'
import { formModelKey, type FormModel } from '../Form/context'

type FieldName = FormItemProps['name']
type PathSegment = string | number

const toPath = (name: FieldName): PathSegment[] => {
  if (name === undefined) return []
  return Array.isArray(name) ? name : [name]
}

const getValue = (model: FormModel, path: PathSegment[]): unknown =>
  path.reduce<unknown>((value, segment) =>
    value !== null && typeof value === 'object'
      ? (value as FormModel)[segment]
      : undefined, model)

const setValue = (model: FormModel, path: PathSegment[], value: unknown) => {
  if (path.length === 0) return

  let target = model
  path.slice(0, -1).forEach((segment, index) => {
    const current = target[segment]
    if (current === null || typeof current !== 'object') {
      target[segment] = typeof path[index + 1] === 'number' ? [] : {}
    }
    target = target[segment] as FormModel
  })
  target[path.at(-1)!] = value
}

export const useFormModel = <Value>(
  name: () => FieldName,
  explicitValue: () => Value | undefined,
  valueProp: 'checked' | 'value',
  emitUpdate: (value: Value) => void,
) => {
  const formModel = inject(formModelKey, computed(() => undefined))
  const instance = getCurrentInstance()
  const hasExplicitValue = () => Object.prototype.hasOwnProperty.call(
    instance?.vnode.props ?? {},
    valueProp,
  )
  const path = computed(() => toPath(name()))
  const value = computed(() => {
    if (hasExplicitValue()) return explicitValue()
    if (!formModel.value) return undefined
    return getValue(formModel.value, path.value) as Value | undefined
  })
  const update = (nextValue: Value) => {
    if (!hasExplicitValue() && formModel.value) {
      setValue(formModel.value, path.value, nextValue)
    }
    emitUpdate(nextValue)
  }

  return { update, value }
}

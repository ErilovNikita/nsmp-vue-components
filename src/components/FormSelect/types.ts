import type { FormItemProps, SelectProps } from 'ant-design-vue'
import type { CheckboxGroupProps } from 'ant-design-vue/es/checkbox/interface'
import type { RadioGroupProps } from 'ant-design-vue/es/radio/Group'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export type FormSelectView = 'select' | 'radio' | 'radio-button'
export type FormSelectRadioButtonStyle = 'outline' | 'solid'

export interface FormSelectProps {
  alertProps?: FormFieldAlertProps
  description?: string | null
  formItemProps?: FormItemProps
  label?: FormItemProps['label']
  /** Enables selection of more than one option in either view. */
  multiple?: boolean
  name?: FormItemProps['name']
  options?: SelectProps['options']
  placeholder?: SelectProps['placeholder']
  rules?: FormItemProps['rules']
  checkboxGroupProps?: CheckboxGroupProps
  /** Selected radio-button appearance. @default 'outline' */
  radioButtonStyle?: FormSelectRadioButtonStyle
  radioGroupProps?: RadioGroupProps
  selectProps?: SelectProps
  value?: SelectProps['value']
  /** Control presentation. @default 'select' */
  view?: FormSelectView
}

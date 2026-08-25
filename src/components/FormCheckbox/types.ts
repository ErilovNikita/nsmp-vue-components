import type { CheckboxProps, FormItemProps } from 'ant-design-vue'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export interface FormCheckboxProps {
  alertProps?: FormFieldAlertProps
  checked?: boolean
  checkboxProps?: CheckboxProps
  description?: string | null
  formItemProps?: FormItemProps
  /** Text displayed to the right of the checkbox. */
  label?: FormItemProps['label']
  name?: FormItemProps['name']
  rules?: FormItemProps['rules']
}

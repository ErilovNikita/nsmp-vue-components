import type { FormItemProps, SwitchProps } from 'ant-design-vue'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export interface FormSwitchProps {
  alertProps?: FormFieldAlertProps
  checked?: SwitchProps['checked']
  description?: string | null
  formItemProps?: FormItemProps
  /** Text displayed to the right of the switch. */
  label?: FormItemProps['label']
  name?: FormItemProps['name']
  rules?: FormItemProps['rules']
  switchProps?: SwitchProps
}

import type { FormItemProps, InputNumberProps } from 'ant-design-vue'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export interface FormNumberProps {
  alertProps?: FormFieldAlertProps
  description?: string | null
  formItemProps?: FormItemProps
  inputNumberProps?: InputNumberProps
  label?: FormItemProps['label']
  max?: InputNumberProps['max']
  min?: InputNumberProps['min']
  name?: FormItemProps['name']
  placeholder?: InputNumberProps['placeholder']
  rules?: FormItemProps['rules']
  step?: InputNumberProps['step']
  value?: InputNumberProps['value']
}

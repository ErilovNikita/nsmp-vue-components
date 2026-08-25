import type {
  FormItemProps as AntFormItemProps,
  InputProps as AntInputProps,
} from 'ant-design-vue'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export interface FormInputProps {
  /** Alert text displayed above the input. */
  description?: string | null
  /** Form field label. */
  label?: AntFormItemProps['label']
  /** Form field path used for model binding and validation. */
  name?: AntFormItemProps['name']
  /** Input placeholder. */
  placeholder?: AntInputProps['placeholder']
  /** Form validation rules. */
  rules?: AntFormItemProps['rules']
  /** Input value used by v-model:value. */
  value?: AntInputProps['value']
  /** Additional FormItem props. Top-level props take precedence. */
  formItemProps?: AntFormItemProps
  /** Additional Alert props. Defaults to open info alert. */
  alertProps?: FormFieldAlertProps
  /** Additional Input props. Top-level props take precedence. */
  inputProps?: AntInputProps
}

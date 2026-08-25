import type { FormItemProps, SliderProps } from 'ant-design-vue'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export interface FormSliderProps {
  alertProps?: FormFieldAlertProps
  description?: string | null
  formItemProps?: FormItemProps
  label?: FormItemProps['label']
  max?: SliderProps['max']
  min?: SliderProps['min']
  name?: FormItemProps['name']
  rules?: FormItemProps['rules']
  sliderProps?: SliderProps
  step?: SliderProps['step']
  value?: SliderProps['value']
}

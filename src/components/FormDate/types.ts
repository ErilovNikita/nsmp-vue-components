import type { FormItemProps } from 'ant-design-vue'
import type {
  DatePickerProps,
  RangePickerProps,
} from 'ant-design-vue/es/date-picker'
import type { Dayjs } from 'dayjs'
import type { FormFieldAlertProps } from '../_internal/FormField.vue'

export type FormDateType = 'date' | 'datetime' | 'date-range' | 'datetime-range'
export type FormDateSingleValue = Dayjs | string | null
export type FormDateRangeValue = [Dayjs | null, Dayjs | null] | [string, string] | null
export type FormDateValue = FormDateSingleValue | FormDateRangeValue
export type FormDateString = string | [string, string]

export interface FormDateProps {
  alertProps?: FormFieldAlertProps
  description?: string | null
  formItemProps?: FormItemProps
  label?: FormItemProps['label']
  name?: FormItemProps['name']
  /** Placeholder for a single picker or a pair of range placeholders. */
  placeholder?: DatePickerProps['placeholder'] | RangePickerProps['placeholder']
  rules?: FormItemProps['rules']
  /** Selection mode. @default 'date' */
  type?: FormDateType
  /** Date or range value used by v-model:value. */
  value?: FormDateValue
  /** Additional props for the single-date picker. Top-level props take precedence. */
  datePickerProps?: DatePickerProps
  /** Additional props for the range picker. Top-level props take precedence. */
  rangePickerProps?: RangePickerProps
}

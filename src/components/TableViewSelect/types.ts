import type { FormSelectControlProps } from '../FormSelect/types'

export interface TableViewSelectProps extends Omit<FormSelectControlProps, 'options' | 'value'> {
	options?: Array<{
		disabled?: boolean
		label?: unknown
		value?: unknown
	}>
	value?: unknown
}
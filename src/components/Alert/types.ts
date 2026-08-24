import type { AlertProps as AntAlertProps } from 'ant-design-vue'

export type AlertType = 'success' | 'info' | 'warning' | 'error'

export interface AlertProps extends Omit<AntAlertProps, 'message' | 'type'> {
  open?: boolean
  message?: string | null
  type?: AlertType
}

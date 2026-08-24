import type { ModalProps as AntModalProps } from 'ant-design-vue'

export interface ModalProps extends Omit<AntModalProps, 'open'> {
  open?: boolean
}

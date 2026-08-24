import type { ModalProps as AntModalProps } from 'ant-design-vue'

export interface NsmpModalProps extends Omit<AntModalProps, 'open'> {
  open?: boolean
}

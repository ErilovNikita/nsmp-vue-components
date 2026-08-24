import type { ButtonProps as AntButtonProps } from 'ant-design-vue'
import type { Component } from 'vue'

export type NsmpButtonVariant = 'primary' | 'default' | 'text'

export interface NsmpButtonProps extends Omit<AntButtonProps, 'type' | 'danger'> {
  variant?: NsmpButtonVariant
  danger?: boolean
  icon?: Component
}

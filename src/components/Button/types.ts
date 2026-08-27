import type { ButtonProps as AntButtonProps } from 'ant-design-vue'
import type { Component } from 'vue'

export type ButtonVariant = 'primary' | 'default' | 'text'

export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'danger'> {
  type?: ButtonVariant
  icon?: Component | string
}

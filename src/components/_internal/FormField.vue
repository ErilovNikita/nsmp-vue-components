<script setup lang="ts">
import { FormItem as AntFormItem, theme as antTheme } from 'ant-design-vue'
import type { FormItemProps as AntFormItemProps } from 'ant-design-vue'
import { computed } from 'vue'
import Alert from '../Alert/Alert.vue'
import type { AlertProps } from '../Alert/types'

export type FormFieldAlertProps = Omit<AlertProps, 'onClose'> & {
  onClose?: (event: MouseEvent) => void
}

const props = defineProps<{
  alertProps?: FormFieldAlertProps
  description?: string | null
  formItemProps?: AntFormItemProps
  label?: AntFormItemProps['label']
  name?: AntFormItemProps['name']
  rules?: AntFormItemProps['rules']
}>()

const { token } = antTheme.useToken()
const themeStyles = computed(() => ({
  '--library-form-color-text-label': token.value.colorTextLabel,
}))

const labelWithColon = computed(() => {
  if (typeof props.label !== 'string') {
    return props.label
  }

  return props.label.endsWith(':') ? props.label : `${props.label}:`
})

const formItemBindings = computed(() => ({
  ...props.formItemProps,
  ...(props.label === undefined ? {} : { label: labelWithColon.value }),
  ...(props.name === undefined ? {} : { name: props.name }),
  ...(props.rules === undefined ? {} : { rules: props.rules }),
}))

const alertBindings = computed(() => ({
  open: true,
  closable: false,
  type: 'info' as const,
  ...props.alertProps,
  ...(props.description === undefined ? {} : { message: props.description }),
}))
</script>

<template>
  <AntFormItem
    v-bind="formItemBindings"
    class="library-form-field"
    :style="themeStyles"
  >
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <Alert v-bind="alertBindings" v-if="alertBindings.message">
      <template v-if="$slots.description" #message>
        <slot name="description" />
      </template>
    </Alert>
    <slot />
  </AntFormItem>
</template>

<script setup lang="ts">
import {
  FormItem as AntFormItem,
  Input as AntInput,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import Alert from '../Alert/Alert.vue'
import type { FormInputProps } from './types'

defineOptions({ name: 'LibraryFormInput' })

const props = defineProps<FormInputProps>()

const emit = defineEmits<{
  change: [event: Event]
  input: [event: Event]
  'update:value': [value: string]
}>()

const input = ref<{
  blur: () => void
  focus: () => void
}>()

const formItemBindings = computed(() => ({
  ...props.formItemProps,
  ...(props.label === undefined ? {} : { label: props.label }),
  ...(props.name === undefined ? {} : { name: props.name }),
  ...(props.rules === undefined ? {} : { rules: props.rules }),
}))

const alertBindings = computed(() => ({
  open: true,
  type: 'info' as const,
  ...props.alertProps,
  ...(props.description === undefined ? {} : { message: props.description }),
}))

const inputBindings = computed(() => ({
  ...props.inputProps,
  ...(props.placeholder === undefined ? {} : { placeholder: props.placeholder }),
  ...(props.value === undefined ? {} : { value: props.value }),
}))

const focus = () => input.value?.focus()
const blur = () => input.value?.blur()

defineExpose({ focus, blur })
</script>

<template>
  <AntFormItem
    v-bind="formItemBindings"
    class="library-form-input"
  >
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>

    <Alert v-bind="alertBindings">
      <template
        v-if="$slots.description"
        #message
      >
        <slot name="description" />
      </template>
    </Alert>

    <AntInput
      ref="input"
      v-bind="inputBindings"
      @change="event => emit('change', event)"
      @input="event => emit('input', event)"
      @update:value="value => emit('update:value', value)"
    >
      <template
        v-if="$slots.prefix"
        #prefix
      >
        <slot name="prefix" />
      </template>
      <template
        v-if="$slots.suffix"
        #suffix
      >
        <slot name="suffix" />
      </template>
      <template
        v-if="$slots.addonBefore"
        #addonBefore
      >
        <slot name="addonBefore" />
      </template>
      <template
        v-if="$slots.addonAfter"
        #addonAfter
      >
        <slot name="addonAfter" />
      </template>
    </AntInput>
  </AntFormItem>
</template>

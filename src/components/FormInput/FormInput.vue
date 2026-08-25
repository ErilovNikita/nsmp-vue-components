<script setup lang="ts">
import { Input as AntInput } from 'ant-design-vue'
import { computed, ref } from 'vue'
import FormField from '../_internal/FormField.vue'
import type { FormInputProps } from './types'

defineOptions({ name: 'LibraryFormInput' })

const props = defineProps<FormInputProps>()
const emit = defineEmits<{
  change: [event: Event]
  input: [event: Event]
  'update:value': [value: string]
}>()
const input = ref<{ blur: () => void; focus: () => void }>()

const inputBindings = computed(() => ({
  ...props.inputProps,
  ...(props.placeholder === undefined ? {} : { placeholder: props.placeholder }),
  ...(props.value === undefined ? {} : { value: props.value }),
}))

defineExpose({
  blur: () => input.value?.blur(),
  focus: () => input.value?.focus(),
})
</script>

<template>
  <FormField
    :alert-props="alertProps"
    :description="description"
    :form-item-props="formItemProps"
    :label="label"
    :name="name"
    :rules="rules"
  >
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots.description" #description><slot name="description" /></template>
    <AntInput
      ref="input"
      v-bind="inputBindings"
      @change="event => emit('change', event)"
      @input="event => emit('input', event)"
      @update:value="value => emit('update:value', value)"
    >
      <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
      <template v-if="$slots.addonBefore" #addonBefore><slot name="addonBefore" /></template>
      <template v-if="$slots.addonAfter" #addonAfter><slot name="addonAfter" /></template>
    </AntInput>
  </FormField>
</template>

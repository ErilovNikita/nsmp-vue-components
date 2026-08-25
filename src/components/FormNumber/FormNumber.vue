<script setup lang="ts">
import { InputNumber as AntInputNumber } from 'ant-design-vue'
import { computed, ref } from 'vue'
import FormField from '../_internal/FormField.vue'
import type { FormNumberProps } from './types'

defineOptions({ name: 'LibraryFormNumber' })

const props = defineProps<FormNumberProps>()
const emit = defineEmits<{
  change: [value: FormNumberProps['value']]
  'update:value': [value: FormNumberProps['value']]
}>()
const input = ref<{ blur: () => void; focus: () => void }>()
const controlBindings = computed(() => ({
  ...props.inputNumberProps,
  ...(props.max === undefined ? {} : { max: props.max }),
  ...(props.min === undefined ? {} : { min: props.min }),
  ...(props.placeholder === undefined ? {} : { placeholder: props.placeholder }),
  ...(props.step === undefined ? {} : { step: props.step }),
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
    <AntInputNumber
      ref="input"
      v-bind="controlBindings"
      @change="value => emit('change', value)"
      @update:value="value => emit('update:value', value)"
    />
  </FormField>
</template>

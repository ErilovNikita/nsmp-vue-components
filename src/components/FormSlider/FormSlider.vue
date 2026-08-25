<script setup lang="ts">
import { Slider as AntSlider } from 'ant-design-vue'
import { computed } from 'vue'
import FormField from '../_internal/FormField.vue'
import type { FormSliderProps } from './types'

defineOptions({ name: 'LibraryFormSlider' })

const props = defineProps<FormSliderProps>()
const emit = defineEmits<{
  afterChange: [value: FormSliderProps['value']]
  change: [value: FormSliderProps['value']]
  'update:value': [value: FormSliderProps['value']]
}>()
const controlBindings = computed(() => ({
  ...props.sliderProps,
  ...(props.max === undefined ? {} : { max: props.max }),
  ...(props.min === undefined ? {} : { min: props.min }),
  ...(props.step === undefined ? {} : { step: props.step }),
  ...(props.value === undefined ? {} : { value: props.value }),
}))
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
    <AntSlider
      v-bind="controlBindings"
      @after-change="value => emit('afterChange', value)"
      @change="value => emit('change', value)"
      @update:value="value => emit('update:value', value)"
    />
  </FormField>
</template>

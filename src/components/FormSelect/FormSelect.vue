<script setup lang="ts">
import { ref } from 'vue'
import FormField from '../_internal/FormField.vue'
import FormSelectControl from './FormSelectControl.vue'
import { useFormModel } from '../_internal/useFormModel'
import type { FormSelectProps } from './types'

defineOptions({ name: 'LibraryFormSelect' })

const props = defineProps<FormSelectProps>()
const emit = defineEmits<{
  change: [value: FormSelectProps['value'], option: unknown]
  'update:value': [value: FormSelectProps['value']]
}>()
const select = ref<{ blur: () => void; focus: () => void }>()
const model = useFormModel<FormSelectProps['value']>(
  () => props.name,
  () => props.value,
  'value',
  value => emit('update:value', value),
)

defineExpose({
  blur: () => select.value?.blur(),
  focus: () => select.value?.focus(),
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

    <FormSelectControl
      ref="select"
      v-bind="props"
      :value="model.value.value"
      @change="(value, option) => emit('change', value, option)"
      @update:value="model.update"
    >
      <template v-if="$slots.dropdownRender" #dropdownRender="slotProps">
        <slot name="dropdownRender" v-bind="slotProps" />
      </template>
      <template v-if="$slots.notFoundContent" #notFoundContent>
        <slot name="notFoundContent" />
      </template>
      <template v-if="$slots.option" #option="slotProps">
        <slot name="option" v-bind="slotProps" />
      </template>
      <template v-if="$slots.tagRender" #tagRender="slotProps">
        <slot name="tagRender" v-bind="slotProps" />
      </template>
    </FormSelectControl>
  </FormField>
</template>

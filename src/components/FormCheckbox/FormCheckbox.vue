<script setup lang="ts">
import { Checkbox as AntCheckbox } from 'ant-design-vue'
import type { CheckboxProps } from 'ant-design-vue'
import { computed } from 'vue'
import FormField from '../_internal/FormField.vue'
import { useFormModel } from '../_internal/useFormModel'
import type { FormCheckboxProps } from './types'

defineOptions({ name: 'LibraryFormCheckbox' })

const props = defineProps<FormCheckboxProps>()
const emit = defineEmits<{
  change: [event: Parameters<NonNullable<CheckboxProps['onChange']>>[0]]
  'update:checked': [checked: boolean]
}>()
const model = useFormModel(
  () => props.name,
  () => props.checked,
  'checked',
  value => emit('update:checked', value),
)
const controlBindings = computed(() => ({
  ...props.checkboxProps,
  ...(model.value.value === undefined ? {} : { checked: model.value.value }),
}))
</script>

<template>
  <FormField
    :alert-props="alertProps"
    :description="description"
    :form-item-props="formItemProps"
    :name="name"
    :rules="rules"
  >
    <template v-if="$slots.description" #description><slot name="description" /></template>
    <AntCheckbox
      v-bind="controlBindings"
      class="library-form-checkbox"
      @change="event => emit('change', event)"
      @update:checked="model.update"
    >
      <slot>{{ label }}</slot>
    </AntCheckbox>
  </FormField>
</template>

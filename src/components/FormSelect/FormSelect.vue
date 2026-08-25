<script setup lang="ts">
import {
  CheckboxGroup as AntCheckboxGroup,
  RadioGroup as AntRadioGroup,
  Select as AntSelect,
} from 'ant-design-vue'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import { computed, ref } from 'vue'
import FormField from '../_internal/FormField.vue'
import type { FormSelectProps } from './types'

defineOptions({ name: 'LibraryFormSelect' })

const props = withDefaults(defineProps<FormSelectProps>(), {
  multiple: false,
  radioButtonStyle: 'outline',
  view: 'select',
})
const emit = defineEmits<{
  change: [value: FormSelectProps['value'], option: unknown]
  'update:value': [value: FormSelectProps['value']]
}>()
const select = ref<{ blur: () => void; focus: () => void }>()

const choiceOptions = computed(() => (props.options ?? []).flatMap(option => {
  if (!option || typeof option !== 'object' || !('value' in option)) return []
  if (typeof option.value !== 'string' && typeof option.value !== 'number') return []

  return [{
    disabled: option.disabled,
    label: option.label,
    value: option.value,
  }]
}))
const selectBindings = computed(() => ({
  ...props.selectProps,
  ...(props.multiple ? { mode: 'multiple' as const } : {}),
  ...(props.options === undefined ? {} : { options: props.options }),
  ...(props.placeholder === undefined ? {} : { placeholder: props.placeholder }),
  ...(props.value === undefined ? {} : { value: props.value }),
}))
const radioBindings = computed(() => ({
  ...props.radioGroupProps,
  options: choiceOptions.value,
  value: props.value,
  ...(props.view === 'radio-button'
    ? {
        buttonStyle: props.radioButtonStyle,
        optionType: 'button' as const,
      }
    : {}),
}))
const checkboxBindings = computed(() => ({
  ...props.checkboxGroupProps,
  options: choiceOptions.value,
  value: Array.isArray(props.value)
    ? props.value.filter((value): value is string | number =>
      typeof value === 'string' || typeof value === 'number')
    : [],
}))

const updateChoice = (value: FormSelectProps['value']) => {
  emit('update:value', value)
  emit('change', value, undefined)
}
const updateMultipleChoice = (value: CheckboxValueType[]) => {
  updateChoice(value.filter((item): item is string | number =>
    typeof item === 'string' || typeof item === 'number'))
}

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

    <AntSelect
      v-if="view === 'select'"
      ref="select"
      v-bind="selectBindings"
      @change="(value, option) => emit('change', value, option)"
      @update:value="value => emit('update:value', value)"
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
    </AntSelect>

    <AntCheckboxGroup
      v-else-if="multiple"
      v-bind="checkboxBindings"
      :class="[
        view === 'radio-button'
          ? 'library-form-select-radio-button-multiple'
          : 'library-form-select-radio-multiple',
        view === 'radio-button'
          ? `library-form-select-radio-button-${radioButtonStyle}`
          : undefined,
      ]"
      @update:value="updateMultipleChoice"
    />

    <AntRadioGroup
      v-else
      v-bind="radioBindings"
      :class="view === 'radio-button'
        ? [
            'library-form-select-radio-button',
            `library-form-select-radio-button-${radioButtonStyle}`,
          ]
        : undefined"
      @update:value="updateChoice"
    />
  </FormField>
</template>

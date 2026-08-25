<script setup lang="ts">
import { Switch as AntSwitch } from 'ant-design-vue'
import type { SwitchProps } from 'ant-design-vue'
import { computed } from 'vue'
import FormField from '../_internal/FormField.vue'
import type { FormSwitchProps } from './types'

defineOptions({ name: 'LibraryFormSwitch' })

const props = defineProps<FormSwitchProps>()
const emit = defineEmits<{
  change: [
    checked: Parameters<NonNullable<SwitchProps['onChange']>>[0],
    event: Parameters<NonNullable<SwitchProps['onChange']>>[1],
  ]
  'update:checked': [checked: Parameters<NonNullable<SwitchProps['onChange']>>[0]]
}>()
const controlBindings = computed(() => ({
  ...props.switchProps,
  ...(props.checked === undefined ? {} : { checked: props.checked }),
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
    <div class="library-form-switch">
      <AntSwitch
        v-bind="controlBindings"
        @change="(checked, event) => emit('change', checked, event)"
        @update:checked="value => emit('update:checked', value)"
      />
      <span v-if="$slots.default || label" class="library-form-switch-label">
        <slot>{{ label }}</slot>
      </span>
    </div>
  </FormField>
</template>

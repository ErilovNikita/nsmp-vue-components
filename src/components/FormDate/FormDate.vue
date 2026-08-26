<script setup lang="ts">
import { DatePicker as AntDatePicker } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import { computed, ref } from 'vue'
import FormField from '../_internal/FormField.vue'
import type {
  FormDateRangeValue,
  FormDateProps,
  FormDateSingleValue,
  FormDateString,
  FormDateValue,
} from './types'

defineOptions({ name: 'LibraryFormDate' })

const props = withDefaults(defineProps<FormDateProps>(), {
  type: 'date',
})
const emit = defineEmits<{
  change: [value: FormDateValue, dateString: FormDateString]
  'update:value': [value: FormDateValue]
}>()

type PickerExpose = { blur: () => void; focus: () => void }

const picker = ref<PickerExpose>()
const rangePicker = ref<PickerExpose>()
const AntRangePicker = AntDatePicker.RangePicker
type DatePickerBindings = InstanceType<typeof AntDatePicker>['$props']
type RangePickerBindings = InstanceType<typeof AntRangePicker>['$props']

const isRange = computed(() => props.type.endsWith('-range'))
const isDateTime = computed(() => props.type.startsWith('datetime'))

const datePickerBindings = computed(() => ({
  ...props.datePickerProps,
  showTime: isDateTime.value,
  ...(props.value === undefined ? {} : { value: props.value as Dayjs | string }),
  ...(typeof props.placeholder === 'string' ? { placeholder: props.placeholder } : {}),
}) as DatePickerBindings)
const rangePickerBindings = computed(() => ({
  ...props.rangePickerProps,
  showTime: isDateTime.value,
  ...(props.value === undefined
    ? {}
    : { value: props.value as [Dayjs, Dayjs] | [string, string] }),
  ...(Array.isArray(props.placeholder) ? { placeholder: props.placeholder } : {}),
}) as RangePickerBindings)

const updateSingleValue = (value: FormDateSingleValue) => emit('update:value', value)
const updateRangeValue = (value: FormDateRangeValue) => emit('update:value', value)
const changeSingleValue = (value: FormDateSingleValue, dateString: string) => {
  emit('change', value, dateString)
}
const changeRangeValue = (value: FormDateRangeValue, dateString: [string, string]) => {
  emit('change', value, dateString)
}

defineExpose({
  blur: () => (isRange.value ? rangePicker.value : picker.value)?.blur(),
  focus: () => (isRange.value ? rangePicker.value : picker.value)?.focus(),
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

    <AntRangePicker
      v-if="isRange"
      ref="rangePicker"
      v-bind="rangePickerBindings"
      @change="changeRangeValue"
      @update:value="updateRangeValue"
    >
      <template v-if="$slots.dateRender" #dateRender="slotProps">
        <slot name="dateRender" v-bind="slotProps" />
      </template>
      <template v-if="$slots.renderExtraFooter" #renderExtraFooter="slotProps">
        <slot name="renderExtraFooter" v-bind="slotProps" />
      </template>
      <template v-if="$slots.suffixIcon" #suffixIcon><slot name="suffixIcon" /></template>
    </AntRangePicker>

    <AntDatePicker
      v-else
      ref="picker"
      v-bind="datePickerBindings"
      @change="changeSingleValue"
      @update:value="updateSingleValue"
    >
      <template v-if="$slots.dateRender" #dateRender="slotProps">
        <slot name="dateRender" v-bind="slotProps" />
      </template>
      <template v-if="$slots.renderExtraFooter" #renderExtraFooter="slotProps">
        <slot name="renderExtraFooter" v-bind="slotProps" />
      </template>
      <template v-if="$slots.suffixIcon" #suffixIcon><slot name="suffixIcon" /></template>
    </AntDatePicker>
  </FormField>
</template>

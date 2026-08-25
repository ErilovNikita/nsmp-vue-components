<script setup lang="ts">
import { Form as AntForm } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { ref, useAttrs } from 'vue'
import type { FormProps } from './types'

defineOptions({
  name: 'LibraryForm',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<FormProps>(), {
  layout: 'vertical',
})
const attrs = useAttrs()
const form = ref<FormInstance>()

const resetFields: FormInstance['resetFields'] = (...args) =>
  form.value?.resetFields(...args)
const clearValidate: FormInstance['clearValidate'] = (...args) =>
  form.value?.clearValidate(...args)
const validateFields: FormInstance['validateFields'] = (...args) =>
  form.value!.validateFields(...args)
const getFieldsValue: FormInstance['getFieldsValue'] = (...args) =>
  form.value?.getFieldsValue(...args) ?? {}
const validate: FormInstance['validate'] = (...args) =>
  form.value!.validate(...args)
const scrollToField: FormInstance['scrollToField'] = (...args) =>
  form.value?.scrollToField(...args)

defineExpose({
  resetFields,
  clearValidate,
  validateFields,
  getFieldsValue,
  validate,
  scrollToField,
})
</script>

<template>
  <AntForm
    ref="form"
    v-bind="{ ...props, ...attrs }"
    class="library-form"
  >
    <slot />
  </AntForm>
</template>

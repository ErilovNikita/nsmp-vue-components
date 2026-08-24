<script setup lang="ts">
import { Modal as AntModal } from 'ant-design-vue'
import { ref, watch } from 'vue'
import type { ModalProps } from './types'

defineOptions({ name: 'LibraryModal' })

const props = withDefaults(defineProps<ModalProps>(), {
  centered: undefined,
  closable: true,
  confirmLoading: undefined,
  destroyOnClose: undefined,
  focusTriggerAfterClose: true,
  forceRender: undefined,
  keyboard: true,
  mask: true,
  maskClosable: true,
  open: undefined,
  visible: undefined,
})

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const isOpen = ref(props.open ?? false)

watch(
  () => props.open,
  (open) => { if (open !== undefined) isOpen.value = open },
)

const setVisible = (open: boolean) => {
  isOpen.value = open
  emit('update:open', open)
}

const show = () => {
  setVisible(true)
  return modalApi
}

const hidden = () => {
  setVisible(false)
  return modalApi
}

const modalApi = {
  show,
  hidden,
}

defineExpose(modalApi)
</script>

<template>
  <AntModal
    v-bind="props"
    :open="isOpen"
    @update:open="setVisible"
  >
    <slot name="alert" />
    <slot name="form">
      <slot />
    </slot>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </AntModal>
</template>

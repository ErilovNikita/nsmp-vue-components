<script setup lang="ts">
import { Modal as AntModal, theme as antTheme } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
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

const { token } = antTheme.useToken()
const themeStyles = computed(() => ({
  '--library-modal-color-bg-base': token.value.colorBgContainer,
  '--library-modal-color-bg-spotlight': token.value.colorBgSpotlight,
  '--library-modal-color-bg-elevated': token.value.colorBgElevated,
}))

const isOpen = ref(props.open ?? false)

const modalProps = computed(() => {
  const bindings: Partial<ModalProps> = { ...props }
  delete bindings.open
  delete bindings['onUpdate:open']

  return bindings
})

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
    v-bind="modalProps"
    :open="isOpen"
    :style="themeStyles"
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

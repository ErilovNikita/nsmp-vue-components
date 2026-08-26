<script setup lang="ts">
import { Alert as AntAlert } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import type { AlertProps, AlertType } from './types'

defineOptions({ name: 'LibraryAlert' })

const props = withDefaults(defineProps<AlertProps>(), {
  closable: true,
  message: null,
  open: false,
  showIcon: true,
  type: 'info',
})

const emit = defineEmits<{
  close: [event: globalThis.MouseEvent]
  'update:open': [open: boolean]
}>()

const isOpen = ref(props.open)
const currentMessage = ref<string | null>(props.message)
const currentType = ref<AlertType>(props.type)

watch(() => props.open, open => isOpen.value = open)
watch(() => props.message, message => currentMessage.value = message)
watch(() => props.type, type => currentType.value = type)

const alertProps = computed(() => {
  const bindings: Partial<AlertProps> = { ...props }
  delete bindings.open
  delete bindings.message
  delete bindings.type

  return bindings
})

const setOpen = (open: boolean) => {
  isOpen.value = open
  emit('update:open', open)
}

const show = () => {
  setOpen(true)
  return alertApi
}

const clear = () => {
  currentMessage.value = null
  return alertApi
}

const hidden = () => {
  setOpen(false)
  clear()
  return alertApi
}

const setMessage = (message: string) => {
  currentMessage.value = message
  show()
  return alertApi
}

const setType = (type: AlertType) => {
  currentType.value = type
  return alertApi
}

const handleClose = (event: globalThis.MouseEvent) => {
  hidden()
  emit('close', event)
}

const alertApi = {
  show,
  hidden,
  setMessage,
  clear,
  setType,
}

defineExpose(alertApi)
</script>

<template>
  <AntAlert
    v-if="isOpen"
    v-bind="alertProps"
    :message="currentMessage ?? undefined"
    :type="currentType"
    @close="handleClose"
  >
    <template
      v-if="$slots.message"
      #message
    >
      <slot name="message" />
    </template>

    <template
      v-if="$slots.action"
      #action
    >
      <slot name="action" />
    </template>

    <template
      v-if="$slots.description"
      #description
    >
      <slot name="description" />
    </template>

    <template
      v-if="$slots.icon"
      #icon
    >
      <slot name="icon" />
    </template>

    <template
      v-if="$slots.closeIcon"
      #closeIcon
    >
      <slot name="closeIcon" />
    </template>
  </AntAlert>
</template>

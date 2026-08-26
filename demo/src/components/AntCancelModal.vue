<script setup lang="ts">
import { Button, Modal } from 'ant-design-vue'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  confirm: []
  'update:open': [open: boolean]
}>()
</script>

<template>
  <Modal
    :open="open"
    title="Отменить изменения?"
    @update:open="emit('update:open', $event)"
  >
    <p>Значения формы будут возвращены к исходному состоянию.</p>
    <template #footer>
      <Button
        type="primary"
        @click="emit('confirm')"
      >
        Сбросить
      </Button>
      <Button @click="emit('update:open', false)">
        Продолжить редактирование
      </Button>
    </template>
  </Modal>
</template>

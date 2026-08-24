<script setup lang="ts">
import { Button as AntButton } from 'ant-design-vue'
import { computed, useAttrs } from 'vue'
import type { ButtonProps } from './types'

defineOptions({
  name: 'LibraryButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
})

const attrs = useAttrs()

const buttonBindings = computed(() => {
  const antButtonProps: Partial<ButtonProps> = { ...props }
  delete antButtonProps.icon
  delete antButtonProps.type

  return {
    ...antButtonProps,
    ...attrs,
    type: props.type,
  }
})
</script>

<template>
  <AntButton
    v-bind="buttonBindings"
  >
    <component
      :is="icon"
      v-if="icon"
      class="btn-icon"
    />
    <slot />
  </AntButton>
</template>

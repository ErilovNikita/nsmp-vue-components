<script setup lang="ts">
import { Button as AntButton } from 'ant-design-vue'
import { computed, useAttrs } from 'vue'
import type { NsmpButtonProps } from './types'

defineOptions({
  name: 'NsmpButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<NsmpButtonProps>(), {
  type: 'default',
})

const attrs = useAttrs()

const buttonBindings = computed(() => {
  const antButtonProps: Partial<NsmpButtonProps> = { ...props }
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

<script setup lang="ts">
import { Button as AntButton } from 'ant-design-vue'
import { Comment, Fragment, Text, computed, useAttrs, useSlots } from 'vue'
import type { VNode } from 'vue'
import type { ButtonProps } from './types'

defineOptions({
  name: 'LibraryButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
})

const attrs = useAttrs()
const slots = useSlots()
const hasContent = (nodes: VNode[]): boolean => nodes.some(node => {
  if (node.type === Comment) return false
  if (node.type === Text) return String(node.children ?? '').trim().length > 0
  if (node.type === Fragment) return hasContent(node.children as VNode[])
  return true
})
const isIconOnly = () => Boolean(props.icon) && !hasContent(slots.default?.({}) ?? [])
const svgIcon = computed(() => typeof props.icon === 'string' ? props.icon : undefined)
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
  <AntButton v-bind="buttonBindings" :class="{ 'library-button-icon-only': isIconOnly() }">
    <span v-if="svgIcon" class="btn-icon" v-html="svgIcon" />
    <component :is="icon" v-else-if="icon" class="btn-icon" />
    <slot />
  </AntButton>
</template>

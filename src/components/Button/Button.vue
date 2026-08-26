<script setup lang="ts">
import { Button as AntButton } from 'ant-design-vue'
import { computed, inject, useAttrs } from 'vue'
import {
  defaultButtonTokens,
  defaultButtonTokensKey,
} from '../ConfigProvider/context'
import type { ButtonProps } from './types'

defineOptions({
  name: 'LibraryButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
})

const attrs = useAttrs()
const providedDefaultButtonTokens = inject(
  defaultButtonTokensKey,
  computed(() => defaultButtonTokens),
)
const resolvedDefaultButtonTokens = computed(() => providedDefaultButtonTokens.value)
const themeStyles = computed(() => ({
  '--library-button-default-color': resolvedDefaultButtonTokens.value.defaultColor,
  '--library-button-default-bg': resolvedDefaultButtonTokens.value.defaultBg,
  '--library-button-default-hover-color': resolvedDefaultButtonTokens.value.defaultHoverColor,
  '--library-button-default-hover-bg': resolvedDefaultButtonTokens.value.defaultHoverBg,
  '--library-button-default-active-color': resolvedDefaultButtonTokens.value.defaultActiveColor,
  '--library-button-default-active-bg': resolvedDefaultButtonTokens.value.defaultActiveBg,
}))

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
    :style="themeStyles"
  >
    <component
      :is="icon"
      v-if="icon"
      class="btn-icon"
    />
    <slot />
  </AntButton>
</template>

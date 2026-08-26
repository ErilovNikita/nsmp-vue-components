<script setup lang="ts">
import { theme as antTheme } from 'ant-design-vue'
import { computed, inject, ref } from 'vue'
import { defaultButtonTokens, defaultButtonTokensKey } from './context'

const { token } = antTheme.useToken()
const buttonTokens = inject(
  defaultButtonTokensKey,
  computed(() => defaultButtonTokens),
)
const root = ref<globalThis.HTMLElement>()

defineExpose({ root })

const themeStyles = computed(() => ({
  '--library-alert-color-fill-tertiary': token.value.colorFillTertiary,
  '--library-alert-color-text-description': token.value.colorTextDescription,
  '--library-button-default-color': buttonTokens.value.defaultColor,
  '--library-button-default-bg': buttonTokens.value.defaultBg,
  '--library-button-default-hover-color': buttonTokens.value.defaultHoverColor,
  '--library-button-default-hover-bg': buttonTokens.value.defaultHoverBg,
  '--library-button-default-active-color': buttonTokens.value.defaultActiveColor,
  '--library-button-default-active-bg': buttonTokens.value.defaultActiveBg,
  '--library-code-color-bg': token.value.colorBgContainer,
  '--library-code-color-bg-header': token.value.colorFillSecondary,
  '--library-code-color-border': token.value.colorBorderSecondary,
  '--library-code-color-split': token.value.colorSplit,
  '--library-code-color-text': token.value.colorText,
  '--library-code-color-text-secondary': token.value.colorTextSecondary,
  '--library-code-color-text-tertiary': token.value.colorTextTertiary,
  '--library-code-color-link': token.value.colorLink,
  '--library-code-color-link-hover-bg': token.value.colorPrimaryBg,
  '--library-code-color-focus': token.value.colorPrimary,
  '--library-code-color-keyword': token.value.colorPrimary,
  '--library-code-color-string': token.value.colorSuccessText,
  '--library-code-color-number': token.value.colorWarningText,
  '--library-code-color-title': token.value.colorPrimaryActive,
  '--library-code-color-variable': token.value.colorErrorText,
  '--library-code-color-tag': token.value.colorPrimaryHover,
  '--library-form-color-text-label': token.value.colorTextLabel,
  '--library-modal-color-bg-base': token.value.colorBgContainer,
  '--library-modal-color-bg-spotlight': token.value.colorBgSpotlight,
  '--library-modal-color-bg-elevated': token.value.colorBgElevated,
  '--library-tabs-color-bg-container': token.value.colorBgContainer,
  '--library-tabs-color-text': token.value.colorText,
}))
</script>

<template>
  <div ref="root" class="library-theme" :style="themeStyles">
    <slot />
  </div>
</template>

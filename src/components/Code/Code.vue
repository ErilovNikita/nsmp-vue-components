<script setup lang="ts">
/* eslint-disable vue/no-v-html -- highlight.js escapes source before returning markup. */
import { computed, onUnmounted, ref } from 'vue'
import { theme as antTheme } from 'ant-design-vue'
import { highlightCode } from './highlighter'
import type { CodeProps } from './types'

defineOptions({ name: 'LibraryCode' })

const props = withDefaults(defineProps<CodeProps>(), {
  copyable: true,
  language: 'plaintext',
  lineNumbers: false,
  title: undefined,
  wrap: false,
})
const emit = defineEmits<{
  copied: [code: string]
  copyError: [error: unknown]
}>()

const { token } = antTheme.useToken()
const themeStyles = computed(() => ({
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
}))

const copied = ref(false)
let copiedTimer: ReturnType<typeof globalThis.setTimeout> | undefined

const highlightedCode = computed(() => highlightCode(props.code, props.language))
const lineNumberText = computed(() => Array.from(
  { length: props.code.split('\n').length },
  (_, index) => index + 1,
).join('\n'))

const copy = async () => {
  try {
    await globalThis.navigator.clipboard.writeText(props.code)
    copied.value = true
    emit('copied', props.code)
    if (copiedTimer !== undefined) globalThis.clearTimeout(copiedTimer)
    copiedTimer = globalThis.setTimeout(() => { copied.value = false }, 1600)
  }
  catch (error) {
    emit('copyError', error)
  }
}

onUnmounted(() => {
  if (copiedTimer !== undefined) globalThis.clearTimeout(copiedTimer)
})
</script>

<template>
  <section class="library-code" :style="themeStyles">
    <header
      v-if="title || copyable"
      class="library-code-header"
    >
      <span class="library-code-title">{{ title || language }}</span>
      <button
        v-if="copyable"
        type="button"
        class="library-code-copy"
        :aria-label="copied ? 'Код скопирован' : 'Копировать код'"
        @click="copy"
      >
        {{ copied ? 'Скопировано' : 'Копировать' }}
      </button>
    </header>
    <div class="library-code-body">
      <pre
        v-if="lineNumbers"
        aria-hidden="true"
        class="library-code-lines"
      >{{ lineNumberText }}</pre>
      <pre :class="['library-code-pre', wrap && 'library-code-pre-wrap']"><code
        class="hljs"
        v-html="highlightedCode"
      /></pre>
    </div>
  </section>
</template>

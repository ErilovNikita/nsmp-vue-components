<script setup lang="ts">
/* eslint-disable vue/no-v-html -- highlight.js escapes source before returning markup. */
import { computed, onUnmounted, ref } from 'vue'
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
  <section class="library-code">
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

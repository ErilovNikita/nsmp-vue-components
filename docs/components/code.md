<script setup lang="ts">
const example = `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
<\/script>

<template>
  <button @click="count++">{{ count }}</button>
</template>`
</script>

# Code

Блок исходного кода с подсветкой синтаксиса, номерами строк и копированием.

<div class="demo">
  <Code
    :code="example"
    language="vue"
    title="Counter.vue"
    line-numbers
  />
</div>

```vue
<script setup lang="ts">
import { Code } from '@minitwiks/nsmp-vue-components'

const example = `const message = 'Hello'`
</script>

<template>
  <Code
    :code="example"
    language="javascript"
    title="example.js"
    line-numbers
  />
</template>
```

## Props

| Prop | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `code` | `string` | обязательный | Исходный код |
| `language` | `CodeLanguage` | `'plaintext'` | Язык подсветки |
| `title` | `string` | — | Заголовок блока |
| `copyable` | `boolean` | `true` | Показывать кнопку копирования |
| `lineNumbers` | `boolean` | `false` | Показывать номера строк |
| `wrap` | `boolean` | `false` | Переносить длинные строки |

Поддерживаются `plaintext`, `javascript`, `typescript`, `json`, `html`, `vue`, `css` и `bash`. Событие `copied` отправляется после успешного копирования, `copyError` — при ошибке Clipboard API.

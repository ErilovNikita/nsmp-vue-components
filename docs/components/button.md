<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const save = () => {
  loading.value = true
  window.setTimeout(() => { loading.value = false }, 700)
}
</script>

# Button

Стилизованная кнопка поверх `Button` из Ant Design Vue.

::: info Основа компонента
Компонент построен на [Button из Ant Design Vue](https://antdv.com/components/button).
:::

<div class="demo demo-row">
  <Button type="primary" :loading="loading" @click="save">Сохранить</Button>
  <Button type="default">Отмена</Button>
  <Button type="text">Подробнее</Button>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@minitwiks/nsmp-vue-components'

const loading = ref(false)
const save = () => {
  loading.value = true
  window.setTimeout(() => { loading.value = false }, 700)
}
</script>

<template>
  <Button type="primary" :loading="loading" @click="save">Сохранить</Button>
  <Button type="default">Отмена</Button>
  <Button type="text">Подробнее</Button>
</template>
```

## Props

| Prop | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `type` | `'primary' \| 'default' \| 'text'` | `'default'` | Визуальный вариант |
| `icon` | `Component` | — | Vue-компонент иконки |

Также поддерживаются стандартные props и события `Button` из Ant Design Vue, кроме `danger`.

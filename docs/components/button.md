<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const save = () => {
  loading.value = true
  window.setTimeout(() => { loading.value = false }, 700)
}

const saveIcon = `
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 2h10l2 2v10H2V2zm2 1v4h7V3H4zm1 7v3h6v-3H5z" />
  </svg>
`
</script>

# Button

Стилизованная кнопка поверх `Button` из Ant Design Vue.

::: info Основа компонента
Компонент построен на [Button из Ant Design Vue](https://antdv.com/components/button).
:::

<div class="demo demo-row">
  <Button type="primary" :loading="loading" @click="save">Сохранить</Button>
  <Button type="text">Отмена</Button>
  <Button type="default">Подробнее</Button>
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
  <Button type="text">Отмена</Button>
  <Button type="default">Подробнее</Button>
</template>
```

## Props

| Prop | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `type` | `'primary' \| 'default' \| 'text'` | `'default'` | Визуальный вариант |
| `icon` | `Component \| string` | — | Vue-компонент иконки или строка с SVG-разметкой |
| `disabled` | `boolean` | `false` | Отключает кнопку и устанавливает прозрачность `50%` |

Также поддерживаются стандартные props и события `Button` из Ant Design Vue, кроме `danger`.

## Иконка из SVG-строки

В `icon` можно передать готовую SVG-разметку. Иконка выводится перед содержимым кнопки и получает стандартный размер `16 × 16 px`.

<div class="demo demo-row">
  <Button type="default" :icon="saveIcon">Сохранить</Button>
</div>

```vue
<script setup lang="ts">
import { Button } from '@minitwiks/nsmp-vue-components'

const saveIcon = `
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 2h10l2 2v10H2V2zm2 1v4h7V3H4zm1 7v3h6v-3H5z" />
  </svg>
`
</script>

<template>
  <Button type="default" :icon="saveIcon">
    Сохранить
  </Button>
</template>
```

::: warning Безопасность
SVG-строка вставляется в DOM как HTML. Передавайте только доверенную разметку и не используйте SVG, полученный напрямую от пользователя или внешнего источника.
:::

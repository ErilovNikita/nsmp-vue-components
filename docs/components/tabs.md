<script setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = [
  { key: 'overview', label: 'Обзор' },
  { key: 'history', label: 'История' },
  { key: 'settings', label: 'Настройки', disabled: true },
]
</script>

# Tabs

Типизированные вкладки с именованными слотами для содержимого.

::: info Основа компонента
Компонент построен на [Tabs из Ant Design Vue](https://antdv.com/components/tabs).
:::

<div class="demo">
  <Tabs v-model:active-key="active" :items="items">
    <template #overview>Общая информация об объекте.</template>
    <template #history>История изменений.</template>
  </Tabs>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from '@minitwiks/nsmp-vue-components'

const active = ref('overview')
const items = [
  { key: 'overview', label: 'Обзор' },
  { key: 'history', label: 'История' },
  { key: 'settings', label: 'Настройки', disabled: true },
]
</script>

<template>
  <Tabs v-model:active-key="active" :items="items">
    <template #overview>Общая информация об объекте.</template>
    <template #history>История изменений.</template>
  </Tabs>
</template>
```

## Основные props

| Prop | Тип | По умолчанию |
| --- | --- | --- |
| `items` | `TabItem[]` | обязательный |
| `activeKey` | `string \| number` | — |
| `defaultTab` | `string \| number` | `1` |
| `type` | Ant Tabs type | `'card'` |
| `tabPosition` | Ant Tabs position | `'top'` |

Методы `set(key)` и `home()` доступны через template ref. Компонент отправляет `change`, `tabClick` и `update:activeKey`.

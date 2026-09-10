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
    <template #overview>
      <p style="margin: 10px;">Общая информация об объекте.</p>
    </template>
    <template #history>
      <p style="margin: 10px;">История изменений.</p>
    </template>
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
    <template #overview>
      <p style="margin: 10px;">Общая информация об объекте.</p>
    </template>
    <template #history>
      <p style="margin: 10px;">История изменений.</p>
    </template>
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

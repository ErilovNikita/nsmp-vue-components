<script setup lang="ts">
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
  <Tabs :items="items">
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
import { Tabs } from '@minitwiks/nsmp-vue-components'

const items = [
  { key: 'overview', label: 'Обзор' },
  { key: 'history', label: 'История' },
  { key: 'settings', label: 'Настройки', disabled: true },
]
</script>

<template>
  <Tabs :items="items">
    <template #overview>
      <p style="margin: 10px;">Общая информация об объекте.</p>
    </template>
    <template #history>
      <p style="margin: 10px;">История изменений.</p>
    </template>
  </Tabs>
</template>
```

## Активная вкладка

Компонент сам хранит активную вкладку в реактивном состоянии. По умолчанию выбирается `items[0]?.key`, поэтому объявлять `ref` и передавать `v-model:active-key` не требуется. Если `items` изначально пустой, первая вкладка выбирается после появления элементов.

Чтобы начать с другой вкладки, передайте `default-tab`:

```vue
<Tabs :items="items" default-tab="history" />
```

Для управления из родительского компонента по-прежнему доступен `v-model:active-key`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('history')
</script>

<template>
  <Tabs v-model:active-key="activeTab" :items="items" />
</template>
```

Явный `activeKey` имеет приоритет над `defaultTab`. Метод `home()` возвращает к `defaultTab`, а если он не задан — к первой вкладке.

## Основные props

| Prop | Тип | По умолчанию |
| --- | --- | --- |
| `items` | `TabItem[]` | обязательный |
| `activeKey` | `string \| number` | Внутреннее реактивное состояние |
| `defaultTab` | `string \| number` | `items[0]?.key` |
| `type` | Ant Tabs type | `'card'` |
| `tabPosition` | Ant Tabs position | `'top'` |

Методы `set(key)` и `home()` доступны через template ref. Компонент отправляет `change`, `tabClick` и `update:activeKey`.

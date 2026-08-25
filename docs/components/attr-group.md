<script setup lang="ts">
const employee = { name: 'Никита', role: 'Разработчик', team: 'Platform' }
const fields: Array<[string, string]> = [['Имя', 'name'], ['Роль', 'role'], ['Команда', 'team']]
</script>

# AttrGroup

Раскрывающаяся группа атрибутов объекта.

::: info Основа компонента
Компонент построен на [Collapse из Ant Design Vue](https://antdv.com/components/collapse).
:::

<div class="demo">
  <AttrGroup title="Сотрудник" :items="fields" :values="employee" open />
</div>

```vue
<script setup lang="ts">
import { AttrGroup } from '@minitwiks/nsmp-vue-components'

const employee = { name: 'Никита', role: 'Разработчик', team: 'Platform' }
const fields: Array<[string, string]> = [
  ['Имя', 'name'],
  ['Роль', 'role'],
  ['Команда', 'team'],
]
</script>

<template>
  <AttrGroup title="Сотрудник" :items="fields" :values="employee" open />
</template>
```

## Props

| Prop | Тип | Описание |
| --- | --- | --- |
| `title` | `string` | Заголовок группы |
| `values` | `Record<string, unknown>` | Объект данных |
| `items` | `[label, fieldName][]` | Отображаемые поля |
| `open` | `boolean` | Начальное и управляемое состояние |
| `activeKey` | `number \| null` | Активная панель |

Методы `open()` и `close()` доступны через template ref. Слоты `start` и `end` добавляют содержимое до и после списка.

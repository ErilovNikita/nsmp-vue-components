<script setup lang="ts">
import { ref } from 'vue'

const columns = ref([
  { title: 'Имя', dataIndex: 'name', key: 'name', width: 160 },
  { title: 'Роль', dataIndex: 'role', key: 'role', width: 180 },
  { title: 'Команда', dataIndex: 'team', key: 'team', width: 140 },
])
const rows = [
  { key: 1, name: 'Анна', role: 'Аналитик', team: 'Core' },
  { key: 2, name: 'Никита', role: 'Разработчик', team: 'Platform' },
  { key: 3, name: 'Мария', role: 'Дизайнер', team: 'Product' },
]
const selected = ref<typeof rows>([])
</script>

# Table

Таблица с локальной пагинацией, выбором строк, изменением ширины и сохраняемым представлением колонок.

::: info Основа компонента
Компонент построен на [Table из Ant Design Vue](https://antdv.com/components/table).
:::

В демо можно перетаскивать границы заголовков для изменения ширины. Нажмите на шестерёнку над чекбоксом выбора строк, чтобы скрыть, вернуть или переставить столбцы. Нажатие «Сохранить» запишет настроенный вид в браузере, а «Сбросить вид» вернёт исходные столбцы.

<div class="demo">
  <Table
    v-model:columns="columns"
    v-model:selected-objects="selected"
    title="Команда"
    :data-source="rows"
    :pagination="false"
    :min-column-width="90"
    view-storage-key="docs-team-table-view"
  />
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@minitwiks/nsmp-vue-components'

const columns = ref([
  { title: 'Имя', dataIndex: 'name', key: 'name', width: 160 },
  { title: 'Роль', dataIndex: 'role', key: 'role', width: 180 },
  { title: 'Команда', dataIndex: 'team', key: 'team', width: 140 },
])

const rows = [
  { key: 1, name: 'Анна', role: 'Аналитик', team: 'Core' },
  { key: 2, name: 'Никита', role: 'Разработчик', team: 'Platform' },
  { key: 3, name: 'Мария', role: 'Дизайнер', team: 'Product' },
]

const selected = ref<typeof rows>([])
</script>

<template>
  <Table
    v-model:columns="columns"
    v-model:selected-objects="selected"
    title="Команда"
    :data-source="rows"
    :pagination="false"
    :min-column-width="90"
    view-storage-key="docs-team-table-view"
  />
</template>
```

## Изменение ширины столбцов

Ширину столбца можно изменить перетаскиванием его правой границы. Возможность включена по умолчанию и управляется prop `resizableColumns`. Ширина перераспределяется между текущим и следующим столбцами, поэтому отдельный маркер изменения размера не добавляется последнему столбцу.

Изменение ширины защищено значением `minColumnWidth`, которое по умолчанию равно `70` пикселям. Компонент ограничивает движение границы сразу с двух сторон: текущий и соседний столбцы не смогут стать уже допустимого минимума. Благодаря этому изменение ширины не ломает структуру таблицы и не схлопывает содержимое.

```vue
<Table
  :columns="columns"
  :data-source="rows"
  :min-column-width="90"
  resizable-columns
/>
```

Для отдельного столбца изменение ширины можно отключить с помощью `resizable: false`. После завершения перетаскивания компонент вызывает событие `columnResize` и обновляет `v-model:columns`.

## Сохраняемые виды отображения

Prop `viewStorageKey` включает настройку и сохранение вида таблицы. В окне настройки пользователь может:

- скрывать ненужные столбцы;
- возвращать скрытые столбцы;
- менять порядок столбцов перетаскиванием или кнопками со стрелками;
- сбрасывать вид к исходной конфигурации.

После нажатия «Сохранить» компонент записывает в `localStorage` выбранные столбцы, их правильный порядок и текущую ширину. При следующем открытии страницы вид восстанавливается автоматически. Для надёжного сопоставления сохранённых настроек каждому столбцу рекомендуется задавать стабильный уникальный `key`.

```vue
<Table
  v-model:columns="columns"
  :data-source="employees"
  view-storage-key="employees-table-view"
/>
```

Разным таблицам или независимым видам нужно передавать разные ключи. Если в коде позже появится новый столбец, которого не было в сохранённом состоянии, компонент сохранит существующий пользовательский порядок и добавит новый столбец после восстановленных.

## Основные props

| Prop | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `columns` | `TableColumn[]` | обязательный | Конфигурация колонок |
| `dataSource` | `Record[]` | `[]` | Строки таблицы |
| `pagination` | `false \| TablePaginationConfig` | 20 строк | Пагинация |
| `selectable` | `boolean` | `true` | Выбор строк |
| `resizableColumns` | `boolean` | `true` | Изменение ширины |
| `minColumnWidth` | `number` | `70` | Минимальная ширина |
| `viewStorageKey` | `string` | — | Сохранение порядка, видимости и ширины |
| `title` | `string \| null` | `null` | Заголовок |

Доступны слоты `start`, `bodyCell`, `headerCell`, `emptyText`, `expandedRowRender` и `summary`.

## События

| Событие | Аргументы | Описание |
| --- | --- | --- |
| `columnClick` | `key: Key` | Вызывается при нажатии на заголовок столбца. Передаёт `key`, `dataIndex` или индекс столбца |
| `columnResize` | `column: TableColumn`, `width: number`, `index: number` | Вызывается после завершения изменения ширины. Передаёт столбец, его новую ширину и индекс среди видимых столбцов |
| `update:columns` | `columns: TableColumn[]` | Передаёт обновлённую конфигурацию столбцов после изменения ширины, сохранения или сброса вида. Поддерживает `v-model:columns` |
| `update:selectedObjects` | `objects: TableRecord[]` | Передаёт выбранные строки после изменения выбора. Поддерживает `v-model:selected-objects` |

## Вложенные строки

Для древовидной таблицы добавьте массив `children` к родительской записи. Плоские наборы данных продолжают работать без изменений. Настройки раскрытия передаются через `expandable`.

```vue
<script setup lang="ts">
const rows = [
  {
    id: 'development',
    name: 'Разработка',
    children: [
      { id: 'frontend', name: 'Frontend' },
      {
        id: 'backend',
        name: 'Backend',
        children: [{ id: 'employee-1', name: 'Анна Смирнова' }],
      },
    ],
  },
]
</script>

<template>
  <Table
    :columns="columns"
    :data-source="rows"
    :expandable="{ defaultExpandAllRows: true, indentSize: 20 }"
    :pagination="false"
    row-key="id"
  />
</template>
```

Если данные используют другое поле, например `nodes`, укажите `children-column-name="nodes"`. Значение по умолчанию — `children`.

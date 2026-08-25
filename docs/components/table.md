<script setup lang="ts">
import { ref } from 'vue'

const columns = ref([
  { title: 'Имя', dataIndex: 'name', key: 'name', width: 180 },
  { title: 'Роль', dataIndex: 'role', key: 'role', width: 180 },
  { title: 'Команда', dataIndex: 'team', key: 'team', width: 160 },
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

<div class="demo">
  <Table v-model:columns="columns" v-model:selected-objects="selected" title="Команда" :columns="columns" :data-source="rows" :pagination="false" />
</div>

```vue
<Table
  v-model:columns="columns"
  v-model:selected-objects="selected"
  title="Сотрудники"
  :data-source="employees"
  view-storage-key="employees-table"
/>
```

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

События: `columnClick`, `columnResize`, `update:columns`, `update:selectedObjects`. Доступны слоты `start`, `bodyCell`, `headerCell`, `emptyText`, `expandedRowRender` и `summary`.

<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
  date: null,
  datetime: null,
  dateRange: null,
  datetimeRange: null,
})
</script>

# FormDate

Поле выбора даты на базе `FormField` и `DatePicker` из Ant Design Vue. Один prop `type` переключает одиночный выбор, диапазон и ввод времени.

<div class="demo">
  <Form :model="model">
    <FormDate v-model:value="model.date" label="Дата" type="date" />
    <FormDate v-model:value="model.datetime" label="Дата и время" type="datetime" />
    <FormDate v-model:value="model.dateRange" label="Период" type="date-range" />
    <FormDate
      v-model:value="model.datetimeRange"
      label="Период с временем"
      type="datetime-range"
    />
  </Form>
</div>

```vue
<FormDate v-model:value="model.date" type="date" />
<FormDate v-model:value="model.datetime" type="datetime" />
<FormDate v-model:value="model.dateRange" type="date-range" />
<FormDate v-model:value="model.datetimeRange" type="datetime-range" />
```

## Режимы

| `type` | Компонент | Время |
| --- | --- | --- |
| `date` | `DatePicker` | Нет |
| `datetime` | `DatePicker` | Да |
| `date-range` | `RangePicker` | Нет |
| `datetime-range` | `RangePicker` | Да |

Значение по умолчанию — `date`. В режиме диапазона `placeholder` принимает пару строк: `['Начало', 'Конец']`.

## Формат значения

По умолчанию Ant Design Vue возвращает объекты `Dayjs`. Чтобы хранить строки, передайте `valueFormat` соответствующему picker:

```vue
<FormDate
  v-model:value="model.date"
  type="date"
  :date-picker-props="{ valueFormat: 'YYYY-MM-DD' }"
/>

<FormDate
  v-model:value="model.period"
  type="datetime-range"
  :range-picker-props="{ valueFormat: 'YYYY-MM-DD HH:mm:ss' }"
/>
```

## Настройка и события

`formItemProps` и `alertProps` настраивают общую оболочку поля. `datePickerProps` применяется к одиночным режимам, `rangePickerProps` — к диапазонам. Выбранный `type` всегда имеет приоритет над вложенным `showTime`.

Компонент поддерживает `v-model:value`, события `update:value` и `change`, слоты `label`, `description`, `dateRender`, `renderExtraFooter`, `suffixIcon`, а также методы `focus()` и `blur()` через template ref.

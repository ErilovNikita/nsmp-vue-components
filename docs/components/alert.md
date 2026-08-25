<script setup lang="ts">
import { computed, ref } from 'vue'

const open = ref(true)
const type = ref<'success' | 'info' | 'warning' | 'error'>('info')
const typeOptions = [
  { label: 'Info', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
]
const messages = {
  info: 'Информационное сообщение',
  success: 'Операция выполнена успешно',
  warning: 'Обратите внимание на предупреждение',
  error: 'Во время выполнения произошла ошибка',
}
const message = computed(() => messages[type.value])
</script>

# Alert

Управляемое предупреждение с декларативным API и методами для template ref.

::: info Основа компонента
Компонент построен на [Alert из Ant Design Vue](https://antdv.com/components/alert).
:::

<div class="demo">
  <FormSelect
    v-model:value="type"
    label="Тип уведомления"
    :options="typeOptions"
    :select-props="{ id: 'alert-type', 'aria-label': 'Тип уведомления' }"
    style="margin-bottom: 20px;"
  />
  <Alert
    v-model:open="open"
    :closable="false"
    :type="type"
    :message="message"
  />
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const type = ref<'success' | 'info' | 'warning' | 'error'>('info')
</script>

<template>
  <select v-model="type">
    <option value="info">Info</option>
    <option value="success">Success</option>
    <option value="warning">Warning</option>
    <option value="error">Error</option>
  </select>

  <Alert open :closable="false" :type="type" message="Динамический Alert" />
</template>
```

## Props

| Prop | Тип | По умолчанию |
| --- | --- | --- |
| `open` | `boolean` | `false` |
| `message` | `string \| null` | `null` |
| `type` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `closable` | `boolean` | `true` |
| `showIcon` | `boolean` | `true` |

## Методы

`show()`, `hidden()`, `setMessage(message)`, `clear()` и `setType(type)` возвращают API компонента, поэтому вызовы можно объединять в цепочки.

## Слоты и события

Поддерживаются слоты `message`, `description`, `action`, `icon`, `closeIcon`, событие `close` и `update:open`.

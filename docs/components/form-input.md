<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ someTextWithDescription: '' })
</script>

# FormInput

Готовое поле формы, объединяющее `FormItem`, информационный `Alert` и `Input`. По умолчанию описание всегда открыто и использует тип `info`.

::: info Основа компонента
Компонент объединяет [Form](https://antdv.com/components/form), [Alert](https://antdv.com/components/alert) и [Input](https://antdv.com/components/input) из Ant Design Vue.
:::

<div class="demo">
  <Form :model="model">
    <FormInput
      v-model:value="model.someTextWithDescription"
      label="Текст с описанием"
      name="someTextWithDescription"
      description="Описание поля"
      placeholder="Пиши что хочешь"
      :rules="[{ required: true, message: 'Потому что потому' }]"
    />
  </Form>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormInput } from '@minitwiks/nsmp-vue-components'

const model = reactive({ someTextWithDescription: '' })
</script>

<template>
  <Form :model="model">
    <FormInput
      v-model:value="model.someTextWithDescription"
      label="Текст с описанием"
      name="someTextWithDescription"
      description="Описание поля"
      placeholder="Пиши что хочешь"
      :rules="[{ required: true, message: 'Потому что потому' }]"
    />
  </Form>
</template>
```

## Быстрые props

| Prop | Тип | Описание |
| --- | --- | --- |
| `value` | `string` | Значение Input для `v-model:value`. |
| `label` | `FormItemProps['label']` | Подпись поля. Для строкового значения в конце автоматически добавляется `:`. |
| `name` | `FormItemProps['name']` | Путь поля в модели формы. |
| `rules` | `FormItemProps['rules']` | Правила валидации. |
| `description` | `string \| null` | Текст информационного Alert. |
| `placeholder` | `string` | Placeholder поля ввода. |

## Полная настройка вложенных блоков

Для доступа ко всем параметрам Ant Design Vue используются три объекта:

| Prop | Управляет | Значение по умолчанию |
| --- | --- | --- |
| `formItemProps` | `FormItem` | `{}` |
| `alertProps` | `Alert` | `{ open: true, type: 'info' }` |
| `inputProps` | `Input` | `{}` |

Верхнеуровневые props имеют приоритет над соответствующими значениями во вложенных объектах.

```vue
<FormInput
  v-model:value="model.title"
  label="Заголовок"
  description="Будет виден пользователям"
  :form-item-props="{ extra: 'Не более 100 символов' }"
  :alert-props="{ showIcon: false, closable: false }"
  :input-props="{ allowClear: true, maxlength: 100 }"
/>
```

## Слоты и методы

Доступны слоты `label`, `description`, `prefix`, `suffix`, `addonBefore` и `addonAfter`. Через template ref можно вызвать методы `focus()` и `blur()` вложенного Input.

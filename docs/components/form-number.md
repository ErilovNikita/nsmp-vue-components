<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ age: 18 })
</script>

# FormNumber

Числовое поле формы, объединяющее `FormItem`, информационный `Alert` и `InputNumber`.

::: info Основа компонента
Компонент построен на [InputNumber](https://antdv.com/components/input-number) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

::: tip Привязка к модели формы
Если данный компонен расположен внутри [Form](/components/form) достаточно указать `name:`, отдельный `v-model` не требуется. 

Подробнее — [в документации Form](/components/form#model-binding-by-name).
:::

<div class="demo">
  <Form :model="model">
    <FormNumber
      label="Возраст"
      name="age"
      description="Допустимое значение — от 18 до 120"
      :min="18"
      :max="120"
      :rules="[{ required: true, message: 'Укажите возраст' }]"
    />
  </Form>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormNumber } from '@minitwiks/nsmp-vue-components'

const model = reactive({ age: 18 })
</script>

<template>
  <Form :model="model">
    <FormNumber
      label="Возраст"
      name="age"
      description="Допустимое значение — от 18 до 120"
      :min="18"
      :max="120"
      :rules="[{ required: true, message: 'Укажите возраст' }]"
    />
  </Form>
</template>
```

Быстрые props: `value`, `label`, `name`, `rules`, `description`, `placeholder`, `min`, `max` и `step`. Все остальные параметры доступны через `formItemProps`, `alertProps` и `inputNumberProps`. Через ref доступны `focus()` и `blur()`.

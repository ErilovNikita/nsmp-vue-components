<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ accepted: false })
</script>

# FormCheckbox

Чекбокс формы с информационным Alert. В отличие от остальных Form-компонентов, он не выводит отдельный заголовок над контролом.

::: info Основа компонента
Компонент построен на [Checkbox](https://antdv.com/components/checkbox) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

::: tip Привязка к модели формы
Если данный компонен расположен внутри [Form](/components/form) достаточно указать `name:`, отдельный `v-model` не требуется. 

Подробнее — [в документации Form](/components/form#model-binding-by-name).
:::

<div class="demo">
  <Form :model="model">
    <FormCheckbox
      label="Я принимаю условия"
      name="accepted"
      description="Подтвердите согласие перед продолжением"
    />
  </Form>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormCheckbox } from '@minitwiks/nsmp-vue-components'

const model = reactive({ accepted: false })
</script>

<template>
  <Form :model="model">
    <FormCheckbox
      label="Я принимаю условия"
      name="accepted"
      description="Подтвердите согласие перед продолжением"
    />
  </Form>
</template>
```

Prop `label` отображается справа от самого чекбокса и не создаёт отдельный заголовок над полем. Его содержимое можно переопределить default-слотом. Доступны быстрые props `checked`, `label`, `name`, `rules` и `description`, а полная настройка выполняется через `formItemProps`, `alertProps` и `checkboxProps`.

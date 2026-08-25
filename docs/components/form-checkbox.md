<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ accepted: false })
</script>

# FormCheckbox

Чекбокс формы с информационным Alert. В отличие от остальных Form-компонентов, он не выводит отдельный заголовок над контролом.

::: info Основа компонента
Компонент построен на [Checkbox](https://antdv.com/components/checkbox) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

<div class="demo">
  <Form :model="model">
    <FormCheckbox
      v-model:checked="model.accepted"
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
      v-model:checked="model.accepted"
      label="Я принимаю условия"
      name="accepted"
      description="Подтвердите согласие перед продолжением"
    />
  </Form>
</template>
```

Prop `label` отображается справа от самого чекбокса и не создаёт отдельный заголовок над полем. Его содержимое можно переопределить default-слотом. Доступны быстрые props `checked`, `label`, `name`, `rules` и `description`, а полная настройка выполняется через `formItemProps`, `alertProps` и `checkboxProps`.

<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ notifications: true })
</script>

# FormSwitch

Переключатель формы с информационным Alert. Повторяет поведение `FormCheckbox`, но использует визуальный контрол Switch.

::: info Основа компонента
Компонент построен на [Switch](https://antdv.com/components/switch) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

<div class="demo">
  <Form :model="model">
    <FormSwitch
      v-model:checked="model.notifications"
      label="Получать уведомления"
      name="notifications"
      description="Уведомления можно отключить в любой момент"
    />
  </Form>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormSwitch } from '@minitwiks/nsmp-vue-components'

const model = reactive({ notifications: true })
</script>

<template>
  <Form :model="model">
    <FormSwitch
      v-model:checked="model.notifications"
      label="Получать уведомления"
      name="notifications"
      description="Уведомления можно отключить в любой момент"
    />
  </Form>
</template>
```

Prop `label` отображается справа от переключателя и может быть переопределён default-слотом. Доступны быстрые props `checked`, `label`, `name`, `rules` и `description`, а полная настройка выполняется через `formItemProps`, `alertProps` и `switchProps`.

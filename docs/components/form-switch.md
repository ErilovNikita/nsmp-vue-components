<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ notifications: true })
</script>

# FormSwitch

Переключатель формы с информационным Alert. Повторяет поведение `FormCheckbox`, но использует визуальный контрол Switch.

::: info Основа компонента
Компонент построен на [Switch](https://antdv.com/components/switch) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

::: tip Привязка к модели формы
Если данный компонен расположен внутри [Form](/components/form) достаточно указать `name:`, отдельный `v-model` не требуется. 

Подробнее — [в документации Form](/components/form#model-binding-by-name).
:::

<div class="demo">
  <Form :model="model">
    <FormSwitch
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
      label="Получать уведомления"
      name="notifications"
      description="Уведомления можно отключить в любой момент"
    />
  </Form>
</template>
```

Prop `label` отображается справа от переключателя и может быть переопределён default-слотом. Доступны быстрые props `checked`, `label`, `name`, `rules` и `description`, а полная настройка выполняется через `formItemProps`, `alertProps` и `switchProps`.

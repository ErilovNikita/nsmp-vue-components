<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ volume: 35 })
</script>

# FormSlider

Ползунок формы, объединяющий `FormItem`, информационный `Alert` и `Slider`.

::: info Основа компонента
Компонент построен на [Slider](https://antdv.com/components/slider) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

::: tip Привязка к модели формы
Если данный компонен расположен внутри [Form](/components/form) достаточно указать `name:`, отдельный `v-model` не требуется. 

Подробнее — [в документации Form](/components/form#model-binding-by-name).
:::

<div class="demo">
  <Form :model="model">
    <FormSlider
      label="Громкость"
      name="volume"
      description="Выберите комфортный уровень"
      :min="0"
      :max="100"
      :step="5"
    />
  </Form>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormSlider } from '@minitwiks/nsmp-vue-components'

const model = reactive({ volume: 35 })
</script>

<template>
  <Form :model="model">
    <FormSlider
      label="Громкость"
      name="volume"
      description="Выберите комфортный уровень"
      :min="0"
      :max="100"
      :step="5"
    />
  </Form>
</template>
```

Быстрые props: `value`, `label`, `name`, `rules`, `description`, `min`, `max` и `step`. Все остальные настройки передаются через `formItemProps`, `alertProps` и `sliderProps`. Компонент отправляет `update:value`, `change` и `afterChange`.

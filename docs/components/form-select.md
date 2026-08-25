<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

const model = reactive<{
  selection: string | string[] | undefined
}>({ selection: undefined })
const demoView = ref<'select' | 'radio' | 'radio-button'>('select')
const demoRadioButtonStyle = ref<'outline' | 'solid'>('outline')
const demoMultiple = ref(false)
const viewOptions = [
  { label: 'Выпадающий список', value: 'select' },
  { label: 'Radio', value: 'radio' },
  { label: 'Radio Button', value: 'radio-button' },
]
const radioButtonStyleOptions = [
  { label: 'Outline', value: 'outline' },
  { label: 'Solid', value: 'solid' },
]
const cities = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Казань', value: 'kazan' },
]

watch(demoMultiple, multiple => {
  model.selection = multiple ? [] : undefined
})
</script>

# FormSelect

Поле выбора, объединяющее `FormItem`, информационный `Alert` и один из трёх вариантов отображения списка.

::: info Основа компонента
Компонент построен на [Select](https://antdv.com/components/select), [Radio](https://antdv.com/components/radio), [Checkbox](https://antdv.com/components/checkbox) и [Form](https://antdv.com/components/form) из Ant Design Vue.
:::

## Демо

Измените вид отображения и режим выбора — пример обновится сразу.

<div class="demo">
  <Form style="margin-bottom: 20px;">
    <FormSelect
      v-model:value="demoView"
      label="Вид отображения"
      :options="viewOptions"
      :select-props="{ id: 'select-view', 'aria-label': 'Вид отображения' }"
    />
    <FormSwitch
      v-model:checked="demoMultiple"
      label="Множественный выбор"
      :switch-props="{ id: 'select-multiple', 'aria-label': 'Множественный выбор' }"
    />
    <FormSelect
      v-if="demoView === 'radio-button'"
      v-model:value="demoRadioButtonStyle"
      label="Оформление выбранного элемента"
      :options="radioButtonStyleOptions"
      :select-props="{
        id: 'select-radio-button-style',
        'aria-label': 'Оформление Radio Button',
      }"
    />
  </Form>

  <Form :model="model">
    <FormSelect
      v-model:value="model.selection"
      label="Города"
      name="selection"
      description="Внешний вид и режим выбора управляются параметрами демо"
      placeholder="Выберите город или несколько городов"
      :options="cities"
      :view="demoView"
      :multiple="demoMultiple"
      :radio-button-style="demoRadioButtonStyle"
    />
  </Form>
</div>

```vue
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import {
  Form,
  FormSelect,
  FormSwitch,
} from '@minitwiks/nsmp-vue-components'

const model = reactive<{
  selection: string | string[] | undefined
}>({ selection: undefined })
const demoView = ref<'select' | 'radio' | 'radio-button'>('select')
const demoRadioButtonStyle = ref<'outline' | 'solid'>('outline')
const demoMultiple = ref(false)
const viewOptions = [
  { label: 'Выпадающий список', value: 'select' },
  { label: 'Radio', value: 'radio' },
  { label: 'Radio Button', value: 'radio-button' },
]
const radioButtonStyleOptions = [
  { label: 'Outline', value: 'outline' },
  { label: 'Solid', value: 'solid' },
]
const cities = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Казань', value: 'kazan' },
]

watch(demoMultiple, multiple => {
  model.selection = multiple ? [] : undefined
})
</script>

<template>
  <Form style="margin-bottom: 20px;">
    <FormSelect
      v-model:value="demoView"
      label="Вид отображения"
      :options="viewOptions"
      :select-props="{ id: 'select-view', 'aria-label': 'Вид отображения' }"
    />
    <FormSwitch
      v-model:checked="demoMultiple"
      label="Множественный выбор"
      :switch-props="{ id: 'select-multiple', 'aria-label': 'Множественный выбор' }"
    />
    <FormSelect
      v-if="demoView === 'radio-button'"
      v-model:value="demoRadioButtonStyle"
      label="Оформление выбранного элемента"
      :options="radioButtonStyleOptions"
      :select-props="{
        id: 'select-radio-button-style',
        'aria-label': 'Оформление Radio Button',
      }"
    />
  </Form>

  <Form :model="model">
    <FormSelect
      v-model:value="model.selection"
      label="Города"
      name="selection"
      description="Внешний вид и режим выбора управляются параметрами демо"
      placeholder="Выберите город или несколько городов"
      :options="cities"
      :view="demoView"
      :multiple="demoMultiple"
      :radio-button-style="demoRadioButtonStyle"
    />
  </Form>
</template>
```

## Вид отображения

Prop `view` определяет используемый контрол:

| Значение | Отображение | По умолчанию |
| --- | --- | --- |
| `select` | Выпадающий список Ant Design Vue Select | Да |
| `radio` | Список вариантов с круглыми индикаторами | Нет |
| `radio-button` | Группа кнопок в стиле `RadioGroup + RadioButton` | Нет |

```vue
<FormSelect
  v-model:value="model.city"
  view="radio-button"
  :options="cities"
/>
```

## Оформление Radio Button

В режиме `view="radio-button"` prop `radioButtonStyle` управляет оформлением выбранного элемента:

| Значение | Отображение | По умолчанию |
| --- | --- | --- |
| `outline` | Белый фон и выделенная обводка | Да |
| `solid` | Полностью закрашенный выбранный элемент | Нет |

```vue
<FormSelect
  v-model:value="model.city"
  view="radio-button"
  radio-button-style="solid"
  :options="cities"
/>
```

## Множественный выбор

Для всех трёх видов используется единый prop `multiple`:

```vue
<!-- Выпадающий список -->
<FormSelect
  v-model:value="model.cities"
  :options="cities"
  multiple
/>

<!-- Radio -->
<FormSelect
  v-model:value="model.cities"
  view="radio"
  :options="cities"
  multiple
/>

<!-- Radio Button -->
<FormSelect
  v-model:value="model.cities"
  view="radio-button"
  :options="cities"
  multiple
/>
```

При `multiple` значение модели должно быть массивом. В режиме обычного списка компонент включает `mode="multiple"`. Настоящие radio-кнопки допускают только один выбранный вариант, поэтому для множественных `radio` и `radio-button` представлений используются стилизованные чекбоксы с корректной checkbox-семантикой.

## Настройка

Быстрые props: `value`, `label`, `name`, `rules`, `description`, `placeholder`, `options`, `view`, `multiple` и `radioButtonStyle`. Для полной настройки используются `formItemProps`, `alertProps`, `selectProps`, `radioGroupProps` и `checkboxGroupProps`. Select-режим поддерживает слоты `option`, `tagRender`, `dropdownRender`, `notFoundContent` и методы `focus()` / `blur()`.

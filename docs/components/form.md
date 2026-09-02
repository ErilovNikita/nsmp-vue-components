<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = ref()
const model = reactive({ name: '', email: '' })
const rules = {
  name: [{ required: true, message: 'Введите имя' }],
  email: [{ required: true, type: 'email', message: 'Введите корректный email' }],
}
const submitted = ref(false)

const submit = async () => {
  await form.value?.validate()
  submitted.value = true
}
</script>

# Form

Типизированная обёртка над формой Ant Design Vue. Она сохраняет стандартную валидацию и публичные методы, применяя стили библиотеки NSMP.

По умолчанию форма использует вертикальную раскладку `layout="vertical"`. При необходимости можно явно передать `horizontal` или `inline`.

Между непосредственными дочерними Form-полями автоматически добавляется отступ `15px`. У последнего Form-поля внутри формы нижний отступ убирается.

Form-компоненты автоматически добавляют `:` в конец строкового `label`. Для `FormCheckbox` двоеточие не добавляется: его label расположен справа от самого чекбокса.

::: info Основа компонента
Компонент построен на [Form из Ant Design Vue](https://antdv.com/components/form).
:::

<div class="demo">
  <Form ref="form" :model="model" :rules="rules">
    <FormInput
      label="Имя"
      name="name"
      description="Укажите имя и фамилию"
      placeholder="Иван Иванов"
    />
    <FormInput
      label="Email"
      name="email"
      description="На этот адрес будут приходить уведомления"
      placeholder="name@example.com"
    />
    <Button style="margin-top: 20px;" type="primary" @click="submit">Проверить</Button>
  </Form>
  <p v-if="submitted">Форма успешно проверена.</p>
</div>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  Form,
  FormInput,
} from '@minitwiks/nsmp-vue-components'

const form = ref()
const model = reactive({ name: '', email: '' })
const rules = {
  name: [{ required: true, message: 'Введите имя' }],
  email: [{ required: true, type: 'email', message: 'Введите корректный email' }],
}
const submitted = ref(false)

const submit = async () => {
  await form.value?.validate()
  submitted.value = true
}
</script>

<template>
  <Form ref="form" :model="model" :rules="rules">
    <FormInput
      label="Имя"
      name="name"
      description="Укажите имя и фамилию"
      placeholder="Иван Иванов"
    />

    <FormInput
      label="Email"
      name="email"
      description="На этот адрес будут приходить уведомления"
      placeholder="name@example.com"
    />

    <Button style="margin-top: 20px;" type="primary" @click="submit">Проверить</Button>
  </Form>
  <p v-if="submitted">Форма успешно проверена.</p>
</template>
```

## Props и события

Компонент поддерживает все props и события `Form` из Ant Design Vue, включая `model`, `rules`, `layout`, `labelCol`, `wrapperCol`, `validateTrigger`, `scrollToFirstError`, `finish` и `finishFailed`.

### Привязка полей по `name` {#model-binding-by-name}

Дочерние Form-компоненты автоматически связываются с `model` по prop `name`, поэтому дублировать путь в `v-model` не требуется:

```vue
<Form :model="model">
  <FormInput name="name" />
  <FormNumber :name="['profile', 'age']" />
  <FormSwitch name="notifications" />
</Form>
```

При изменении поля соответствующее свойство `model` обновляется напрямую, а событие `update:value` или `update:checked` продолжает отправляться. Явный `v-model` можно использовать для поля вне `Form` или когда требуется отдельный источник значения.

## Методы

Через template ref доступны стандартные методы формы:

| Метод | Описание |
| --- | --- |
| `validate()` | Проверяет поля и возвращает их значения. |
| `validateFields()` | Проверяет выбранные или все поля. |
| `resetFields()` | Сбрасывает значения и состояние валидации. |
| `clearValidate()` | Очищает сообщения об ошибках. |
| `getFieldsValue()` | Возвращает текущие значения полей. |
| `scrollToField()` | Прокручивает страницу до выбранного поля. |

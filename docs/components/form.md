<script setup lang="ts">
import { FormItem as AntFormItem, Input as AntInput } from 'ant-design-vue'
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

::: info Основа компонента
Компонент построен на [Form из Ant Design Vue](https://antdv.com/components/form).
:::

<div class="demo">
  <Form ref="form" :model="model" :rules="rules">
    <AntFormItem label="Имя" name="name">
      <AntInput v-model:value="model.name" placeholder="Иван Иванов" />
    </AntFormItem>
    <AntFormItem label="Email" name="email">
      <AntInput v-model:value="model.email" placeholder="name@example.com" />
    </AntFormItem>
    <Button style="margin-top: 20px;" type="primary" @click="submit">Проверить</Button>
  </Form>
  <p v-if="submitted">Форма успешно проверена.</p>
</div>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormItem, Input } from 'ant-design-vue'
import { Button, Form } from '@minitwiks/nsmp-vue-components'

const form = ref<InstanceType<typeof Form>>()
const model = reactive({ name: '', email: '' })
const rules = {
  name: [{ required: true, message: 'Введите имя' }],
  email: [{ required: true, type: 'email', message: 'Введите корректный email' }],
}

const submit = async () => {
  const values = await form.value?.validate()
  console.log(values)
}
</script>

<template>
  <Form ref="form" :model="model" :rules="rules">
    <FormItem label="Имя" name="name">
      <Input v-model:value="model.name" />
    </FormItem>
    <FormItem label="Email" name="email">
      <Input v-model:value="model.email" />
    </FormItem>
    <Button style="margin-top: 20px;" type="primary" @click="submit">Проверить</Button>
  </Form>
</template>
```

## Props и события

Компонент поддерживает все props и события `Form` из Ant Design Vue, включая `model`, `rules`, `layout`, `labelCol`, `wrapperCol`, `validateTrigger`, `scrollToFirstError`, `finish` и `finishFailed`.

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

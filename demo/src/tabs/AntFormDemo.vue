<script setup lang="ts">
import {
  Alert, Button, Checkbox, Col, DatePicker, Form, FormItem, Input,
  InputNumber, Row, Select, Slider, Switch, TypographyTitle,
} from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { ref } from 'vue'
import { acceptanceRules, cities } from '../demoData'
import type { DemoFormModel } from '../types'

const props = defineProps<{ model: DemoFormModel; saved: boolean }>()
const emit = defineEmits<{
  requestReset: []
  'update:saved': [saved: boolean]
}>()
const model = props.model
const form = ref<FormInstance>()

const save = async () => {
  try {
    await form.value?.validate()
    emit('update:saved', true)
  } catch {
    emit('update:saved', false)
  }
}

defineExpose({ clearValidate: () => form.value?.clearValidate() })
</script>

<template>
  <Row :gutter="32">
    <Col :xs="24" :md="12" :lg="10">
      <Alert v-if="saved" closable message="Форма успешно сохранена" type="success" show-icon @close="emit('update:saved', false)" />
      <Form ref="form" :model="model" layout="vertical">
        <TypographyTitle :level="4">Данные пользователя</TypographyTitle>
        <FormItem label="Имя" name="name" :rules="[{ required: true, message: 'Введите имя' }]">
          <Alert message="Полное ФИО" type="info" show-icon />
          <Input v-model:value="model.name" placeholder="Введите имя" />
        </FormItem>
        <FormItem label="Возраст" name="age" :rules="[{ required: true, message: 'Обязательное поле. От 18 до 120 лет!' }]">
          <InputNumber v-model:value="model.age" :min="18" :max="120" />
        </FormItem>
        <FormItem label="Дата рождения" name="birthDate"><DatePicker v-model:value="model.birthDate" value-format="YYYY-MM-DD" /></FormItem>
        <FormItem label="Город" name="city"><Select v-model:value="model.city" placeholder="Выберите город" :options="cities" /></FormItem>
        <TypographyTitle :level="4">Дополнительная информация</TypographyTitle>
        <FormItem label="Рабочая нагрузка" name="workload"><Slider v-model:value="model.workload" :min="0" :max="100" :step="5" /></FormItem>
        <FormItem label="Получать уведомления" name="notifications"><Switch v-model:checked="model.notifications" /></FormItem>
        <FormItem name="accepted" :rules="acceptanceRules"><Checkbox v-model:checked="model.accepted">Я принимаю условия обработки данных</Checkbox></FormItem>
        <FormItem>
          <Button type="primary" @click="save">Сохранить</Button>
          <Button class="reset" @click="emit('requestReset')">Отменить</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>

<style scoped>.reset { margin-inline-start: 8px; }</style>

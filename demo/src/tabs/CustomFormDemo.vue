<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Alert,
  AttrGroup,
  Button,
  Caption,
  Code,
  Form,
  FormCheckbox,
  FormDate,
  FormInput,
  FormNumber,
  FormSelect,
  FormSlider,
  FormSwitch,
} from '../../../src'
import { acceptanceRules, cities } from '../demoData'
import type { DemoFormModel } from '../types'

const props = defineProps<{ model: DemoFormModel; saved: boolean }>()
const emit = defineEmits<{
  requestReset: []
  'update:saved': [saved: boolean]
}>()
const model = props.model
const form = ref()

const attrItems: Array<[string, string]> = [
  ['Имя', 'name'], ['Возраст', 'age'], ['Дата рождения', 'birthDate'],
  ['Город', 'city'], ['Нагрузка', 'workload'], ['Уведомления', 'notifications'],
  ['Условия приняты', 'accepted'],
]
const formValues = computed<Record<string, unknown>>(() => ({
  accepted: model.accepted ? 'Да' : 'Нет',
  age: model.age,
  birthDate: model.birthDate,
  city: cities.find(city => city.value === model.city)?.label ?? 'Не выбран',
  name: model.name || 'Не указано',
  notifications: model.notifications ? 'Включены' : 'Выключены',
  workload: `${model.workload}%`,
}))
const formCode = computed(() => JSON.stringify(model, null, 2))

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
  <a-row>
    <a-col :span="10">
      <Alert :open="saved" closable message="Форма успешно сохранена" type="success" @update:open="emit('update:saved', $event)" />
      <Form ref="form" :model="model">
        <Caption label="Данные пользователя">
          <FormInput v-model:value="model.name" label="Имя" description="Полное ФИО" name="name" placeholder="Введите имя" :rules="[{ required: true, message: 'Введите имя' }]" />
          <FormNumber v-model:value="model.age" label="Возраст" name="age" :min="18" :max="120" :rules="[{ required: true, message: 'Обязательное поле. От 18 до 120 лет!' }]" />
          <FormDate v-model:value="model.birthDate" label="Дата рождения" name="birthDate" :date-picker-props="{ valueFormat: 'YYYY-MM-DD' }" />
          <FormSelect v-model:value="model.city" label="Город" name="city" placeholder="Начните вводить город" :options="cities" searchable />
        </Caption>
        <Caption label="Дополнительная информация">
          <FormSlider v-model:value="model.workload" label="Рабочая нагрузка" name="workload" :min="0" :max="100" :step="5" />
          <FormSwitch v-model:checked="model.notifications" label="Получать уведомления" name="notifications" />
          <FormCheckbox v-model:checked="model.accepted" label="Я принимаю условия обработки данных" name="accepted" :rules="acceptanceRules" />
        </Caption>
        <div class="form-actions">
          <Button type="primary" @click="save">Сохранить</Button>
          <Button type="text" @click="emit('requestReset')">Отменить</Button>
        </div>
      </Form>
    </a-col>
    <a-col :span="8" :push="1">
      <AttrGroup title="Параметры формы" :items="attrItems" :values="formValues" open />
      <AttrGroup title="В виде JSON" :items="[]" :values="{}">
        <template #start><Code :code="formCode" language="json" title="Текущие значения" line-numbers /></template>
      </AttrGroup>
    </a-col>
  </a-row>
</template>

<style scoped>.form-actions { margin-top: 40px; }</style>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Alert, AttrGroup, Button, Caption, Code, ConfigProvider, Modal, Table, Tabs } from '../../src'
import { Form, FormCheckbox, FormDate, FormInput, FormNumber, FormSelect, FormSlider, FormSwitch } from '../../src'
import type { TableColumn } from '../../src'


interface DemoObject {
  category: string
  id: number
  name: string
  rating: number
  status: string
}

const initialForm = {
  accepted: false,
  age: 30,
  birthDate: '1996-05-18',
  city: 'moscow',
  name: 'Анна Смирнова',
  notifications: true,
  workload: 45,
}

const activeTab = ref('form')
const form = ref()
const model = reactive({ ...initialForm })
const saved = ref(false)
const resetConfirmationOpen = ref(false)
const tabs = [
  { key: 'form', label: 'Форма' },
  { key: 'objects', label: 'Список объектов' },
]
const cities = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Казань', value: 'kazan' },
]
const acceptanceRules = [{
  validator: (_rule: unknown, value: boolean) => value
    ? globalThis.Promise.resolve()
    : globalThis.Promise.reject(new Error('Примите условия')),
}]
const attrItems: Array<[string, string]> = [
  ['Имя', 'name'],
  ['Возраст', 'age'],
  ['Дата рождения', 'birthDate'],
  ['Город', 'city'],
  ['Нагрузка', 'workload'],
  ['Уведомления', 'notifications'],
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
    saved.value = true
  }
  catch {
    saved.value = false
  }
}

const reset = () => {
  Object.assign(model, initialForm)
  form.value?.clearValidate()
  saved.value = false
  resetConfirmationOpen.value = false
}

const columns = ref<TableColumn[]>([
  { title: 'ID', dataIndex: 'id', key: 'id', width: 90 },
  { title: 'Название', dataIndex: 'name', key: 'name', width: 220 },
  { title: 'Категория', dataIndex: 'category', key: 'category', width: 160 },
  { title: 'Статус', dataIndex: 'status', key: 'status', width: 140 },
  { title: 'Рейтинг', dataIndex: 'rating', key: 'rating' },
])
const selectedObjects = ref<DemoObject[]>([])

const createObjects = (seed: number): DemoObject[] => {
  let state = seed >>> 0
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
  const categories = ['Документ', 'Задача', 'Проект', 'Обращение']
  const statuses = ['Новый', 'В работе', 'Завершён']

  return Array.from({ length: 9 }, (_, index) => ({
    category: categories[Math.floor(random() * categories.length)],
    id: index + 1,
    name: `Объект ${String(index + 1).padStart(2, '0')}`,
    rating: Math.floor(random() * 100),
    status: statuses[Math.floor(random() * statuses.length)],
  }))
}

const objects = ref<DemoObject[]>(createObjects(2026))
const regenerateObjects = () => {
  objects.value = createObjects(Date.now())
  selectedObjects.value = []
}
</script>

<template>
  <ConfigProvider>
    <Modal v-model:open="resetConfirmationOpen" title="Отменить изменения?">
      <p>Значения формы будут возвращены к исходному состоянию.</p>

      <template #footer>
        <Button type="primary" @click="reset">Сбросить</Button>
        <Button type="text" @click="resetConfirmationOpen=false">Продолжить редактирование</Button>
      </template>
    </Modal>

    <Tabs v-model:active-key="activeTab" :items="tabs" >
      <template #form>
        <a-row>
          <a-col :span="10">
            <Alert
              :open="saved"
              closable
              message="Форма успешно сохранена"
              type="success"
              @update:open="saved = $event"
            />
            <Form ref="form" :model="model">

              <Caption label="Данные пользователя">
                <FormInput
                  v-model:value="model.name"
                  label="Имя"
                  description="Полное ФИО"
                  name="name"
                  placeholder="Введите имя"
                  :rules="[{ required: true, message: 'Введите имя' }]"
                />
                <FormNumber
                  v-model:value="model.age"
                  label="Возраст"
                  name="age"
                  :min="18"
                  :max="120"
                  :rules="[{ required: true, message: 'Обязательное поле. От 18 до 120 лет!' }]"
                />
                <FormDate
                  v-model:value="model.birthDate"
                  label="Дата рождения"
                  name="birthDate"
                  :date-picker-props="{ valueFormat: 'YYYY-MM-DD' }"
                />
                <FormSelect
                  v-model:value="model.city"
                  label="Город"
                  name="city"
                  placeholder="Выберите город"
                  :options="cities"
                />
              </Caption>

              <Caption label="Дополнительная информация">
                <FormSlider
                  v-model:value="model.workload"
                  label="Рабочая нагрузка"
                  name="workload"
                  :min="0"
                  :max="100"
                  :step="5"
                />
                <FormSwitch
                  v-model:checked="model.notifications"
                  label="Получать уведомления"
                  name="notifications"
                />
                <FormCheckbox
                  v-model:checked="model.accepted"
                  label="Я принимаю условия обработки данных"
                  name="accepted"
                  :rules="acceptanceRules"
                />
              </Caption>

              <div class="form-actions">
                <Button type="primary" @click="save">Сохранить</Button>
                <Button type="text" @click="resetConfirmationOpen = true">Отменить</Button>
              </div>
            </Form>
          </a-col>

          <a-col :span="8" :push="1">
            <AttrGroup title="Параметры формы" :items="attrItems" :values="formValues" open/>
            <AttrGroup title="В виде JSON" :items="[]" :values="{}">
              <template #start>
                <Code :code="formCode" language="json" title="Текущие значения" line-numbers/>
              </template>
            </AttrGroup>
          </a-col>
        </a-row>
      </template>

      <template #objects>
        <Table
          v-model:columns="columns"
          v-model:selected-objects="selectedObjects"
          :data-source="objects"
          :min-column-width="80"
          :pagination="{
            showSizeChanger: true
          }"
          row-key="id"
          title="Случайные объекты"
          view-storage-key="demo-objects-table"
        >
          <template #start>
            <Button type="default" @click="regenerateObjects">Сгенерировать заново</Button>
          </template>
        </Table>
        <p>Выбрано объектов: <strong>{{ selectedObjects.length }}</strong></p>
      </template>
    </Tabs>
  </ConfigProvider>
</template>

<style scoped>
  .form-actions {
    margin-top: 40px
  }
</style>
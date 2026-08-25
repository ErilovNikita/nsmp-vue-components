<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { Alert, AttrGroup, Button, Caption, ConfigProvider, Modal, Table, Tabs } from '../../src'
import { Form, FormCheckbox, FormInput, FormNumber, FormSelect, FormSlider, FormSwitch } from '../../src'
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
  ['Город', 'city'],
  ['Нагрузка', 'workload'],
  ['Уведомления', 'notifications'],
  ['Условия приняты', 'accepted'],
]
const formValues = computed<Record<string, unknown>>(() => ({
  accepted: model.accepted ? 'Да' : 'Нет',
  age: model.age,
  city: cities.find(city => city.value === model.city)?.label ?? 'Не выбран',
  name: model.name || 'Не указано',
  notifications: model.notifications ? 'Включены' : 'Выключены',
  workload: `${model.workload}%`,
}))

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

const columns = ref<TableColumn<DemoObject>[]>([
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

onMounted(() => globalThis.document.body.classList.add('library-demo-body'))
onUnmounted(() => globalThis.document.body.classList.remove('library-demo-body'))
</script>

<template>
  <ConfigProvider>
    <section class="library-demo">
      <Modal v-model:open="resetConfirmationOpen" title="Отменить изменения?">
        <template #form>
          <p class="library-demo-modal-text">
            Значения формы будут возвращены к исходному состоянию.
          </p>
        </template>
        <template #footer>
          <Button type="primary" @click="reset">Сбросить</Button>
          <Button type="text" @click="resetConfirmationOpen=false">Продолжить редактирование</Button>
        </template>
      </Modal>

      <Tabs v-model:active-key="activeTab" :items="tabs" >
        <template #form>
          <div class="library-demo-form-layout">
            <section class="library-demo-panel">
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

                <div class="library-demo-actions">
                  <Button type="primary" @click="save">Сохранить</Button>
                  <Button type="text" @click="resetConfirmationOpen = true">Отменить</Button>
                </div>
              </Form>
            </section>

            <aside class="library-demo-panel library-demo-values">
              <AttrGroup title="Параметры формы" :items="attrItems" :values="formValues" open/>
            </aside>
          </div>
        </template>

        <template #objects>
          <section class="library-demo-panel">
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
              view-storage-key="library-full-demo-objects-v2"
            >
              <template #start>
                <Button type="default" @click="regenerateObjects">Сгенерировать заново</Button>
              </template>
            </Table>
            <p class="library-demo-selection">
              Выбрано объектов: <strong>{{ selectedObjects.length }}</strong>
            </p>
          </section>
        </template>
      </Tabs>
    </section>
  </ConfigProvider>
</template>

<style scoped>
.library-demo {
  display: flex;
  max-width: 70%;
  max-height: none;
  padding: 0;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 0;
}

.library-demo :deep(.library-tabs) {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
}

.library-demo :deep(.ant-input),
.library-demo :deep(.ant-input-affix-wrapper),
.library-demo :deep(.ant-input-number),
.library-demo :deep(.ant-select-selector) {
  box-sizing: border-box;
  border: 1px solid #c0c0c0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.library-demo :deep(.ant-input:hover),
.library-demo :deep(.ant-input-affix-wrapper:hover),
.library-demo :deep(.ant-input-number:hover),
.library-demo :deep(.ant-select:hover .ant-select-selector) {
  border-color: #7f96b9 !important;
}

.library-demo :deep(.ant-input:focus),
.library-demo :deep(.ant-input-focused),
.library-demo :deep(.ant-input-affix-wrapper-focused),
.library-demo :deep(.ant-input-number-focused),
.library-demo :deep(.ant-select-focused .ant-select-selector) {
  border-color: #556e95 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.library-demo :deep(.ant-input-number-input) {
  border: 0 !important;
}

.library-demo :deep(.library-tabs > .ant-tabs-content-holder),
.library-demo :deep(.library-tabs > .ant-tabs-content-holder > .ant-tabs-content),
.library-demo :deep(.library-tabs > .ant-tabs-content-holder > .ant-tabs-content > .ant-tabs-tabpane) {
  height: 100%;
  min-height: 0;
}

.library-demo-form-layout {
  display: grid;
  height: 100%;
  min-height: 0;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
  background: #fff;
}

.library-demo-panel {
  min-width: 0;
  height: 100%;
  padding: 0px;
  background: #fff;
  color: #323232;
  overflow: auto;
}

.library-demo-values {
  margin-left: 70px;
}

.library-demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 50px;
}

.library-demo-selection {
  margin: 16px 0 0;
  color: #5f5f5f;
}

.library-demo-modal-text {
  margin: 0;
  color: #323232;
}

@media (max-width: 820px) {
  .library-demo {
    min-height: auto !important;
    padding: 0;
  }

  .library-demo :deep(.library-tabs),
  .library-demo :deep(.library-tabs > .ant-tabs-content-holder),
  .library-demo :deep(.library-tabs > .ant-tabs-content-holder > .ant-tabs-content),
  .library-demo :deep(.library-tabs > .ant-tabs-content-holder > .ant-tabs-content > .ant-tabs-tabpane),
  .library-demo-form-layout,
  .library-demo-panel {
    height: auto;
    overflow: visible;
  }

  .library-demo-form-layout {
    grid-template-columns: 1fr;
  }

  .library-demo-values {
    border-top: 1px solid #d9dce1;
    border-left: 0;
  }
}

@media (max-width: 520px) {
  .library-demo-panel {
    padding: 16px;
  }
}
</style>

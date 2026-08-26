<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button, ConfigProvider, Modal, Tabs } from '../../src'
import type { TableColumn } from '../../src'
import type { NsmpThemeProperties } from '../../src/utils'
import AntFormDemo from './tabs/AntFormDemo.vue'
import AntTableDemo from './tabs/AntTableDemo.vue'
import CustomFormDemo from './tabs/CustomFormDemo.vue'
import CustomTableDemo from './tabs/CustomTableDemo.vue'
import SettingsDemo from './tabs/SettingsDemo.vue'
import { createObjects, initialColumns, initialForm } from './demoData'
import type { DemoFormModel, DemoObject } from './types'

type FormDemoExpose = { clearValidate: () => void }

const activeTab = ref('form')
const customForm = ref<FormDemoExpose>()
const antForm = ref<FormDemoExpose>()
const model = reactive<DemoFormModel>({ ...initialForm })
const saved = ref(false)
const resetConfirmationOpen = ref(false)
const appliedTheme = ref<NsmpThemeProperties>()
const columns = ref<TableColumn[]>([...initialColumns])
const objects = ref<DemoObject[]>(createObjects(2026))
const selectedObjects = ref<DemoObject[]>([])

const tabs = [
  { key: 'form', label: 'Форма встроенных компонентов' },
  { key: 'ant-form', label: 'Форма компонентов Ant Design' },
  { key: 'objects', label: 'Встроенная таблица' },
  { key: 'ant-table', label: 'Таблица Ant Design' },
  { key: 'settings', label: 'Настройки' },
]

const reset = () => {
  Object.assign(model, initialForm)
  customForm.value?.clearValidate()
  antForm.value?.clearValidate()
  saved.value = false
  resetConfirmationOpen.value = false
}

const regenerateObjects = () => {
  objects.value = createObjects(Date.now())
  selectedObjects.value = []
}
</script>

<template>
  <ConfigProvider :nsmp-theme="appliedTheme">
    <Modal v-model:open="resetConfirmationOpen" title="Отменить изменения?">
      <p>Значения формы будут возвращены к исходному состоянию.</p>
      <template #footer>
        <Button type="primary" @click="reset">Сбросить</Button>
        <Button type="text" @click="resetConfirmationOpen = false">Продолжить редактирование</Button>
      </template>
    </Modal>

    <Tabs v-model:active-key="activeTab" :items="tabs">
      <template #form>
        <CustomFormDemo #form ref="customForm" v-model:saved="saved" :model="model" @request-reset="resetConfirmationOpen = true" />
      </template>
      <template #ant-form>
        <AntFormDemo ref="antForm" v-model:saved="saved" :model="model" @request-reset="resetConfirmationOpen = true" />
      </template>
      <template #objects>
        <CustomTableDemo v-model:columns="columns" v-model:selected-objects="selectedObjects" :objects="objects" @regenerate="regenerateObjects" />
      </template>
      <template #ant-table>
        <AntTableDemo v-model:selected-objects="selectedObjects" :columns="columns" :objects="objects" @regenerate="regenerateObjects" />
      </template>
      <template #settings>
        <SettingsDemo @apply="appliedTheme = $event" />
      </template>
    </Tabs>
  </ConfigProvider>
</template>

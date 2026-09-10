<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ConfigProvider, Tabs } from '../../src'
import type { TableColumn } from '../../src'
import type { NsmpThemeProperties } from '../../src/utils'
import AntCancelModal from './components/AntCancelModal.vue'
import CustomCancelModal from './components/CustomCancelModal.vue'
import AntFormDemo from './tabs/AntFormDemo.vue'
import AntTableDemo from './tabs/AntTableDemo.vue'
import CustomFormDemo from './tabs/CustomFormDemo.vue'
import CustomTableDemo from './tabs/CustomTableDemo.vue'
import SettingsDemo from './tabs/SettingsDemo.vue'
import { createObjects, initialColumns, initialForm } from './demoData'
import type { DemoFormModel, DemoObject } from './types'

type FormDemoExpose = { clearValidate: () => void }

const customForm = ref<FormDemoExpose>()
const antForm = ref<FormDemoExpose>()
const model = reactive<DemoFormModel>({ ...initialForm })
const saved = ref(false)
const customResetConfirmationOpen = ref(false)
const antResetConfirmationOpen = ref(false)
const appliedTheme = ref<NsmpThemeProperties>()
const columns = ref<TableColumn[]>([...initialColumns])
const objects = ref<DemoObject[]>(createObjects(2026))
const selectedObjects = ref<DemoObject[]>([])
const compact = ref(false)

const generalTabs = [
  { key: 'forms', label: 'Формы' },
  { key: 'tables', label: 'Таблицы' },
  { key: 'settings', label: 'Настройки' },
]
const generalActiveTab = ref('forms')

const formTabs = [
  { key: 'form', label: 'Форма встроенных компонентов' },
  { key: 'ant-form', label: 'Форма компонентов Ant Design' },
]
const formActiveTab = ref(formTabs[0].key)

const tableTabs = [
  { key: 'objects', label: 'Встроенная таблица' },
  { key: 'ant-table', label: 'Таблица Ant Design' },
]
const tableActiveTab = ref(tableTabs[0].key)

const reset = () => {
  Object.assign(model, initialForm)
  customForm.value?.clearValidate()
  antForm.value?.clearValidate()
  saved.value = false
  customResetConfirmationOpen.value = false
  antResetConfirmationOpen.value = false
}

const regenerateObjects = () => {
  objects.value = createObjects(Date.now())
  selectedObjects.value = []
}

const applySettings = (theme: NsmpThemeProperties | undefined, compactMode: boolean) => {
  if (theme) appliedTheme.value = theme
  compact.value = compactMode
}
</script>

<template>
  <ConfigProvider :nsmp-theme="appliedTheme" :compact="compact">
    <CustomCancelModal
      v-model:open="customResetConfirmationOpen"
      @confirm="reset"
    />
    <AntCancelModal
      v-model:open="antResetConfirmationOpen"
      @confirm="reset"
    />

    <Tabs v-model:active-key="generalActiveTab" :items="generalTabs">
      <template #forms>
        <Tabs v-model:active-key="formActiveTab" :items="formTabs">
          <template #form>
            <div class="section">
              <CustomFormDemo
                ref="customForm"
                v-model:saved="saved"
                :model="model"
                @request-reset="customResetConfirmationOpen = true"
              />
            </div>
          </template>
          <template #ant-form>
            <div class="section">
              <AntFormDemo ref="antForm" v-model:saved="saved" :model="model" @request-reset="antResetConfirmationOpen = true" />
            </div>
          </template>
        </Tabs>
      </template>
      <template #tables>
         <Tabs v-model:active-key="tableActiveTab" :items="tableTabs">
          <template #objects>
            <div class="section">
              <CustomTableDemo v-model:columns="columns" v-model:selected-objects="selectedObjects" :objects="objects" @regenerate="regenerateObjects" />
              </div>
          </template>
          <template #ant-table>
            <div class="section">
              <AntTableDemo v-model:selected-objects="selectedObjects" :columns="columns" :objects="objects" @regenerate="regenerateObjects" />
            </div>
          </template>
         </Tabs>
      </template>
      <template #settings >
        <div class="section">
          <SettingsDemo @apply="applySettings" />
        </div>
      </template>
    </Tabs>
  </ConfigProvider>
</template>

<style scoped>
  div.section {
    padding: 15px;
  }
</style>
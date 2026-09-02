<script setup lang="ts">
import { computed } from 'vue'
import { Button, Table } from '../../../src'
import type { TableColumn } from '../../../src'
import type { DemoObject } from '../types'
import LockIcon from '../assets/Lock.svg?raw'
import RefreshIcon from '../assets/Refresh.svg?raw'

const props = defineProps<{ columns: TableColumn[]; objects: DemoObject[]; selectedObjects: DemoObject[] }>()
const emit = defineEmits<{
  regenerate: []
  'update:columns': [columns: TableColumn[]]
  'update:selectedObjects': [objects: DemoObject[]]
}>()
const columnsModel = computed({ get: () => props.columns, set: value => emit('update:columns', value) })
const selection = computed({ get: () => props.selectedObjects, set: value => emit('update:selectedObjects', value) })

const departmentColumns: TableColumn[] = [
  { title: 'Подразделение', dataIndex: 'name', key: 'name', width: 260 },
  { title: 'Руководитель', dataIndex: 'manager', key: 'manager', width: 220 },
  { title: 'Бюджет', dataIndex: 'budget', key: 'budget' },
]
const employeeColumns: TableColumn[] = [
  { title: 'Сотрудник', dataIndex: 'fullName', key: 'fullName', width: 240 },
  { title: 'Должность', dataIndex: 'position', key: 'position', width: 220 },
  { title: 'Загрузка', dataIndex: 'workload', key: 'workload' },
]
const taskColumns: TableColumn[] = [
  { title: 'Задача', dataIndex: 'title', key: 'title', width: 280 },
  { title: 'Приоритет', dataIndex: 'priority', key: 'priority', width: 140 },
  { title: 'Срок', dataIndex: 'deadline', key: 'deadline' },
]
const fileColumns: TableColumn[] = [
  { title: 'Название файла', dataIndex: 'name', key: 'name', width: 280 },
  { title: 'Формат', dataIndex: 'format', key: 'format', width: 120 },
  { title: 'Размер', dataIndex: 'size', key: 'size' },
  { title: 'Действия', key: 'actions', width: 260 },
]
const departments = [
  {
    id: 'development',
    name: 'Разработка',
    manager: 'Иван Петров',
    budget: '12 000 000 ₽',
    employees: [
      {
        id: 'employee-1',
        fullName: 'Анна Смирнова',
        position: 'Frontend-разработчик',
        workload: '80%',
        tasks: [
          {
            id: 'task-1',
            title: 'Обновить интерфейс профиля',
            priority: 'Высокий',
            deadline: '12 сентября',
            files: [
              { id: 'file-1', name: 'profile-layout.fig', format: 'FIG', size: '2,4 МБ' },
              { id: 'file-2', name: 'requirements.pdf', format: 'PDF', size: '840 КБ' },
            ],
          },
          {
            id: 'task-2',
            title: 'Добавить адаптивную вёрстку',
            priority: 'Средний',
            deadline: '18 сентября',
            files: [
              { id: 'file-3', name: 'breakpoints.xlsx', format: 'XLSX', size: '96 КБ' },
            ],
          },
        ],
      },
      {
        id: 'employee-2',
        fullName: 'Никита Орлов',
        position: 'Backend-разработчик',
        workload: '100%',
        tasks: [
          {
            id: 'task-3',
            title: 'Оптимизировать API отчётов',
            priority: 'Высокий',
            deadline: '10 сентября',
            files: [
              { id: 'file-4', name: 'api-profile.json', format: 'JSON', size: '38 КБ' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'design',
    name: 'Дизайн',
    manager: 'Мария Волкова',
    budget: '4 500 000 ₽',
    employees: [
      {
        id: 'employee-3',
        fullName: 'Ольга Соколова',
        position: 'Продуктовый дизайнер',
        workload: '60%',
        tasks: [
          {
            id: 'task-4',
            title: 'Подготовить прототип аналитики',
            priority: 'Средний',
            deadline: '20 сентября',
            files: [
              { id: 'file-5', name: 'analytics-prototype.fig', format: 'FIG', size: '5,1 МБ' },
            ],
          },
        ],
      },
    ],
  },
]

const getEmployees = (record: Record<string, unknown>) => record.employees as Array<Record<string, unknown>>
const getTasks = (record: Record<string, unknown>) => record.tasks as Array<Record<string, unknown>>
const getFiles = (record: Record<string, unknown>) => record.files as Array<Record<string, unknown>>
</script>

<template>
  <Table 
    title="Случайные объекты" 
    view-storage-key="demo-objects-table"
    v-model:columns="columnsModel" 
    v-model:selected-objects="selection" 
    :data-source="objects" 
    :min-column-width="80" 
    :pagination="{ showSizeChanger: true }" 
    row-key="id" 
  >
    <template #start>
      <Button type="default" :icon="RefreshIcon" @click="emit('regenerate')">Сгенерировать заново</Button>
      <Button type="default" :icon="LockIcon" @click="emit('regenerate')" disabled>Выключенная кнопка</Button>
    </template>
  </Table>

  <p style="margin-bottom: 40px;">Выбрано объектов: <strong>{{ selectedObjects.length }}</strong></p>

  <Table
    row-key="id"
    title="Пример вложенной структуры"
    view-storage-key="demo-multiple-objects-table"
    :columns="departmentColumns"
    :data-source="departments"
    :expandable="{
      defaultExpandAllRows: true,
      rowExpandable: record => getEmployees(record).length > 0,
    }"
    :pagination="false"
    :selectable="false"
  >
    <template #expandedRowRender="{ record }">
      <Table
        row-key="id"
        :columns="employeeColumns"
        :data-source="getEmployees(record)"
        :expandable="{
          defaultExpandAllRows: true,
          rowExpandable: employee => getTasks(employee).length > 0,
        }"
        :pagination="false"
        :resizable-columns="false"
        :selectable="false"
        size="small"
      >
        <template #expandedRowRender="{ record: employee }">
          <Table
            row-key="id"
            :columns="taskColumns"
            :data-source="getTasks(employee)"
            :expandable="{
              columnWidth: 120,
              rowExpandable: task => getFiles(task).length > 0,
            }"
            :pagination="false"
            :resizable-columns="false"
            :selectable="false"
            size="small"
          >
            <template #expandedRowRender="{ record: task }">
              <Table
                row-key="id"
                :columns="fileColumns"
                :data-source="getFiles(task)"
                :pagination="false"
                :resizable-columns="false"
                :selectable="false"
                size="small"
              >
                <template #bodyCell="{ column }">
                  <div v-if="column.key === 'actions'" class="file-actions">
                    <Button type="default">Открыть</Button>
                    <Button type="default">Скачать</Button>
                    <Button type="default">Удалить</Button>
                  </div>
                </template>
              </Table>
            </template>
          </Table>
        </template>
      </Table>
    </template>
  </Table>
</template>

<style scoped>
.file-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
</style>

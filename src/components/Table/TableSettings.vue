<script setup lang="ts">
import {
  Button as AntButton,
  Select as AntSelect,
} from 'ant-design-vue'
import { computed, ref, shallowRef, watch } from 'vue'
import Modal from '../Modal/Modal.vue'
import type { TableColumn } from './types'

defineOptions({ name: 'LibraryTableSettings' })

const props = defineProps<{
  columns: TableColumn[]
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  reset: []
  save: [columns: TableColumn[]]
}>()

const draftColumns = shallowRef<TableColumn[]>([])
const selectedColumnKey = ref<string | number>()
const draggedIndex = ref<number | null>(null)

const columnKey = (column: TableColumn, index: number): string | number => {
  if (column.key !== undefined) {
    return column.key
  }

  if (typeof column.dataIndex === 'string' || typeof column.dataIndex === 'number') {
    return column.dataIndex
  }

  return column.dataIndex?.join('.') ?? index
}

const columnTitle = (column: TableColumn, index: number): string => {
  if (typeof column.title === 'string' || typeof column.title === 'number') {
    return String(column.title)
  }

  return String(columnKey(column, index))
}

watch(
  () => [props.open, props.columns] as const,
  ([open, columns]) => {
    if (open) {
      draftColumns.value = columns.map(column => ({ ...column }))
      selectedColumnKey.value = undefined
    }
  },
  { immediate: true },
)

const availableColumns = computed(() =>
  draftColumns.value.filter(column => column.hidden),
)

const selectOptions = computed<Array<{
  label: string
  value: string | number
}>>(() => availableColumns.value.map((column, index) => ({
  label: columnTitle(column, index),
  value: columnKey(column, index),
})))

const visibleColumns = computed(() =>
  draftColumns.value.filter(column => !column.hidden),
)

const showSelectedColumn = () => {
  if (selectedColumnKey.value === undefined) {
    return
  }

  draftColumns.value = draftColumns.value.map((column, index) =>
    columnKey(column, index) === selectedColumnKey.value
      ? { ...column, hidden: false }
      : column,
  )
  selectedColumnKey.value = undefined
}

const updateVisibleOrder = (columns: TableColumn[]) => {
  const visibleQueue = [...columns]
  draftColumns.value = draftColumns.value.map(column =>
    column.hidden ? column : visibleQueue.shift() ?? column,
  )
}

const moveColumn = (index: number, offset: number) => {
  const nextIndex = index + offset
  if (nextIndex < 0 || nextIndex >= visibleColumns.value.length) {
    return
  }

  const reordered = [...visibleColumns.value]
  const [column] = reordered.splice(index, 1)
  reordered.splice(nextIndex, 0, column)
  updateVisibleOrder(reordered)
}

const hideColumn = (column: TableColumn) => {
  if (visibleColumns.value.length <= 1) {
    return
  }

  draftColumns.value = draftColumns.value.map(item =>
    item === column ? { ...item, hidden: true } : item,
  )
}

const handleDrop = (targetIndex: number) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) {
    draggedIndex.value = null
    return
  }

  const reordered = [...visibleColumns.value]
  const [column] = reordered.splice(draggedIndex.value, 1)
  reordered.splice(targetIndex, 0, column)
  updateVisibleOrder(reordered)
  draggedIndex.value = null
}

const save = () => {
  if (visibleColumns.value.length === 0) {
    return
  }

  emit('save', draftColumns.value.map(column => ({ ...column })))
}
</script>

<template>
  <Modal
    :open="open"
    title="Настройка полей"
    :width="920"
    wrap-class-name="library-table-settings-modal"
    @update:open="value => !value && emit('close')"
  >
    <div class="table-settings">
      <p class="table-settings-hint">
        Чтобы добавить колонку, выберите название и нажмите «+»
      </p>

      <div class="table-settings-add">
        <AntSelect
          v-model:value="selectedColumnKey"
          :disabled="selectOptions.length === 0"
          :options="selectOptions"
          placeholder="Нет элементов"
        />
        <AntButton
          type="text"
          :disabled="selectedColumnKey === undefined"
          aria-label="Добавить колонку"
          @click="showSelectedColumn"
        >
          +
        </AntButton>
      </div>

      <table class="table-settings-order">
        <tbody>
          <tr
            v-for="(column, index) in visibleColumns"
            :key="columnKey(column, index)"
            draggable="true"
            @dragstart="draggedIndex = index"
            @dragover.prevent
            @drop="handleDrop(index)"
          >
            <td
              class="table-settings-drag"
              title="Перетащить"
            >
              ⋮⋮
            </td>
            <td>{{ columnTitle(column, index) }}</td>
            <td class="table-settings-controls">
              <button
                type="button"
                :disabled="index === 0"
                aria-label="Поднять колонку"
                @click="moveColumn(index, -1)"
              >
                ↑
              </button>
              <button
                type="button"
                :disabled="index === visibleColumns.length - 1"
                aria-label="Опустить колонку"
                @click="moveColumn(index, 1)"
              >
                ↓
              </button>
              <button
                type="button"
                :disabled="visibleColumns.length === 1"
                aria-label="Скрыть колонку"
                :title="visibleColumns.length === 1
                  ? 'Нельзя скрыть последний столбец'
                  : 'Скрыть столбец'"
                @click="hideColumn(column)"
              >
                ×
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <AntButton
        type="primary"
        @click="save"
      >
        Сохранить
      </AntButton>
      <AntButton
        type="text"
        @click="emit('close')"
      >
        Отмена
      </AntButton>
      <AntButton
        type="text"
        @click="emit('reset')"
      >
        Сбросить вид
      </AntButton>
    </template>
  </Modal>
</template>

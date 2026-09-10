import { computed, ref, shallowRef, watch } from 'vue'
import { readLocalStorage, removeLocalStorage, writeLocalStorage } from '../../../utils'
import {
  applyTableViewState,
  createTableViewState,
  getTableColumnViewKey,
  type TableViewState,
} from '../models'
import type { TableColumn, TableProps } from '../types'

export const useTableView = (
  props: Readonly<TableProps>,
  onColumnsUpdate: (columns: TableColumn[]) => void,
) => {
  const initialColumns = props.columns.map(column => ({ ...column }))
  const readSavedView = (): TableViewState | null => props.viewStorageKey
    ? readLocalStorage<TableViewState>(props.viewStorageKey)
    : null
  const restoreColumns = () => applyTableViewState(props.columns, readSavedView())
  const currentColumns = shallowRef<TableColumn[]>(restoreColumns())
  const settingsOpen = ref(false)
  const visibleColumns = computed(() =>
    currentColumns.value.filter(column => !column.hidden),
  )

  watch(
    () => [props.columns, props.viewStorageKey] as const,
    () => {
      currentColumns.value = restoreColumns()
    },
  )

  const cloneColumns = (columns: TableColumn[]) =>
    columns.map(column => ({ ...column }))

  const persist = (columns: TableColumn[]) => {
    if (props.viewStorageKey) {
      writeLocalStorage(props.viewStorageKey, createTableViewState(columns))
    }
  }

  const update = (columns: TableColumn[], shouldPersist = true) => {
    currentColumns.value = cloneColumns(columns)
    if (shouldPersist) {
      persist(currentColumns.value)
    }
    onColumnsUpdate(cloneColumns(currentColumns.value))
  }

  const save = (columns: TableColumn[]) => {
    update(columns)
    settingsOpen.value = false
  }

  const reset = () => {
    if (props.viewStorageKey) {
      removeLocalStorage(props.viewStorageKey)
    }
    update(initialColumns, false)
    settingsOpen.value = false
  }

  const setColumns = (columns: TableColumn[]) => {
    const selectedKeys = new Set(columns.map(getTableColumnViewKey))
    const omittedColumns = props.columns.filter(
      (column, index) => !selectedKeys.has(getTableColumnViewKey(column, index)),
    )
    update([
      ...columns,
      ...omittedColumns.map(column => ({ ...column, hidden: true })),
    ])
  }

  return {
    currentColumns,
    persist,
    reset,
    save,
    setColumns,
    settingsOpen,
    visibleColumns,
  }
}

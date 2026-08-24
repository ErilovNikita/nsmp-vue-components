import { computed, ref, shallowRef, watch } from 'vue'
import { readLocalStorage, removeLocalStorage, writeLocalStorage } from '../../../utils'
import {
  applyTableViewState,
  createTableViewState,
  type TableViewState,
} from '../models'
import type { TableColumn, TableProps } from '../types'

export const useTableView = (
  props: Readonly<TableProps>,
  onColumnsUpdate: (columns: TableColumn[]) => void,
) => {
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
    update(props.columns, false)
    settingsOpen.value = false
  }

  return {
    currentColumns,
    persist,
    reset,
    save,
    settingsOpen,
    visibleColumns,
  }
}

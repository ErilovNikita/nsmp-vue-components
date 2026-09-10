<script setup lang="ts">
import {
  Table as AntTable,
  TypographyTitle as AntTypographyTitle,
} from 'ant-design-vue'
import type { TableProps as AntTableProps } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import { computed, ref, useAttrs } from 'vue'
import TableSettings from './TableSettings.vue'
import Alert from '../Alert/Alert.vue'
import TableViewSelect from '../TableViewSelect/TableViewSelect.vue'
import { useResizableColumns } from './composables/useResizableColumns'
import { useTablePagination } from './composables/useTablePagination'
import { useTableSelection } from './composables/useTableSelection'
import { useTableSettingsGear } from './composables/useTableSettingsGear'
import { useTableView } from './composables/useTableView'
import type { TableColumn, TableProps, TableRecord } from './types'

defineOptions({
  name: 'LibraryTable',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TableProps>(), {
  bordered: false,
  childrenColumnName: 'children',
  dataSource: () => [],
  loading: false,
  minColumnWidth: 70,
  pagination: () => ({
    pageSize: 20,
    showSizeChanger: true,
  }),
  rowKey: 'key',
  resizableColumns: true,
  selectable: true,
  selectedObjects: () => [],
  showHeader: true,
  showTitle: true,
  showViewSelect: false,
  tableLayout: 'fixed',
  title: null,
})

const emit = defineEmits<{
  columnClick: [key: Key]
  columnResize: [column: TableColumn, width: number, index: number]
  'update:columns': [columns: TableColumn[]]
  'update:selectedObjects': [objects: TableRecord[]]
}>()

const attrs = useAttrs()
const tableView = useTableView(props, columns => emit('update:columns', columns))
const rowSelection = useTableSelection(props, records => emit('update:selectedObjects', records)).rowSelection
const pagination = useTablePagination(props)
const { displayColumns } = useResizableColumns({
  columns: tableView.currentColumns,
  minWidth: () => props.minColumnWidth,
  onColumnClick: key => emit('columnClick', key),
  onResize: (column, width, index) => {
    emit('update:columns', tableView.currentColumns.value.map(item => ({ ...item })))
    emit('columnResize', column, width, index)
  },
  persist: tableView.persist,
  resizable: () => props.resizableColumns,
  visibleColumns: tableView.visibleColumns,
})
const settingsGear = useTableSettingsGear(
  () => Boolean(props.viewStorageKey),
  tableView.settingsOpen,
  () => props.selectable
    ? 'th.ant-table-selection-column'
    : 'th.ant-table-cell:first-child',
  () => props.selectable ? 'center' : 'left',
)
const tableScroll = computed(() => {
  if (props.scroll === undefined) return { x: 'max-content' }
  if (typeof props.scroll !== 'object' || props.scroll === null || props.scroll.x !== undefined) {
    return props.scroll
  }
  return { ...props.scroll, x: 'max-content' }
})
const viewOptions = computed(() => [
  { label: '[выберите вид]', value: '' },
  ...(props.views?.map((view, index) => ({
  label: view.title,
  value: String(index),
})) ?? []),
])
const selectedViewValue = ref<string>('')
const resetView = () => {
  selectedViewValue.value = ''
  tableView.reset()
}
const selectedView = computed<string | undefined>({
  get: () => selectedViewValue.value,
  set: value => {
    selectedViewValue.value = value ?? ''
    if (value === undefined || value === '') {
      resetView()
      return
    }
    const view = props.views?.[Number(value)]
    if (view) tableView.setColumns(view.columns)
  },
})

const tableColumns = computed(() => {
  const columns = displayColumns.value
  if (!props.selectable || columns.some(column => column.width === undefined)) {
    return columns
  }

  // Leave a data column flexible so surplus table width does not stretch selection.
  // Only change rendering: keep configured widths in settings and saved views.
  return columns.map((column, index) => index === columns.length - 1
    ? { ...column, width: undefined }
    : column)
})

const tableBindings = computed(() => {
  return {
    bordered: props.bordered,
    childrenColumnName: props.childrenColumnName,
    dataSource: props.dataSource,
    expandable: props.expandable,
    loading: props.loading,
    locale: props.locale,
    rowKey: props.rowKey,
    scroll: tableScroll.value,
    showHeader: props.showHeader,
    size: props.size,
    tableLayout: props.tableLayout,
    ...attrs,
    columns: tableColumns.value,
    pagination: pagination.value,
    rowSelection: rowSelection.value,
  } as AntTableProps
})
</script>

<template>
  <div
    :class="[
      'library-table',
      viewStorageKey && 'library-table-view-settings-enabled',
      !viewStorageKey && 'library-table-view-settings-disabled',
      viewStorageKey && !selectable && 'library-table-view-settings-without-selection',
    ]"
    @click.capture="settingsGear.onClick"
    @pointerleave="settingsGear.onPointerLeave"
    @pointermove="settingsGear.onPointerMove"
  >
    <AntTypographyTitle
      v-if="title && showTitle"
      :level="4"
      class="library-table-title"
    >
      {{ title }}
    </AntTypographyTitle>

    <div v-if="$slots.start" class="btn-toolkit">
      <TableViewSelect
        v-if="showViewSelect"
        v-model:value="selectedView"
        :options="viewOptions"
        placeholder="[выберите вид]"
      />
      <slot name="start" />
    </div>

    <div v-else-if="showViewSelect" class="btn-toolkit">
      <TableViewSelect
        v-model:value="selectedView"
        :options="viewOptions"
        placeholder="[выберите вид]"
      />
    </div>

    <div v-if="$slots.selectedObjectsActions && rowSelection?.selectedRowKeys && rowSelection.selectedRowKeys?.length > 0">
      <Alert open :closable="false">
        <template #icon></template>
        <template #description>
          <div style="margin-left: -10px;" class="btn-toolkit btn-toolkit-selected-action">
            <p class="selected-label">Отмечен {{ rowSelection.selectedRowKeys.length }} объект: </p>
            <slot name="selectedObjectsActions" />
          </div>
        </template>
      </Alert>
    </div>

    <AntTable v-bind="tableBindings">
      <template v-if="$slots.bodyCell" #bodyCell="slotProps">
        <slot name="bodyCell" v-bind="slotProps"/>
      </template>

      <template v-if="$slots.headerCell" #headerCell="slotProps">
        <slot name="headerCell" v-bind="slotProps"/>
      </template>

      <template v-if="$slots.emptyText" #emptyText>
        <slot name="emptyText" />
      </template>

      <template v-if="$slots.expandColumnTitle" #expandColumnTitle>
        <slot name="expandColumnTitle" />
      </template>

      <template v-if="$slots.expandedRowRender" #expandedRowRender="slotProps">
        <slot name="expandedRowRender" v-bind="slotProps"/>
      </template>

      <template v-if="$slots.summary" #summary>
        <slot name="summary" />
      </template>
    </AntTable>

    <TableSettings
      v-if="viewStorageKey"
      :columns="tableView.currentColumns.value"
      :open="tableView.settingsOpen.value"
      @close="tableView.settingsOpen.value = false"
      @reset="resetView"
      @save="tableView.save"
    />
  </div>
</template>

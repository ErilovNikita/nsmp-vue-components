<script setup lang="ts">
import {
  Table as AntTable,
  TypographyTitle as AntTypographyTitle,
} from 'ant-design-vue'
import type { TableProps as AntTableProps } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import { computed, useAttrs } from 'vue'
import TableSettings from './TableSettings.vue'
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
)

const tableBindings = computed(() => {
  return {
    bordered: props.bordered,
    dataSource: props.dataSource,
    loading: props.loading,
    locale: props.locale,
    rowKey: props.rowKey,
    scroll: props.scroll,
    showHeader: props.showHeader,
    size: props.size,
    tableLayout: props.tableLayout,
    ...attrs,
    columns: displayColumns.value,
    pagination: pagination.value,
    rowSelection: rowSelection.value,
  } as AntTableProps
})
</script>

<template>
  <div
    :class="['library-table', viewStorageKey && 'library-table-view-settings-enabled']"
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
      <slot name="start" />
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
      @reset="tableView.reset"
      @save="tableView.save"
    />
  </div>
</template>

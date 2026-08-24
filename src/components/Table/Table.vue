<script setup lang="ts">
import {
  Table as AntTable,
  TypographyTitle as AntTypographyTitle,
} from 'ant-design-vue'
import type { TableProps as AntTableProps } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import type { TablePaginationConfig } from 'ant-design-vue/es/table'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { computed, h, ref, shallowRef, useAttrs, watch } from 'vue'
import { readLocalStorage, removeLocalStorage, writeLocalStorage } from '../../utils'
import TableSettings from './TableSettings.vue'
import {
  applyTableViewState,
  createTableViewState,
  type TableViewState,
} from './models'
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
const readSavedView = (): TableViewState | null => props.viewStorageKey
  ? readLocalStorage<TableViewState>(props.viewStorageKey)
  : null

const currentColumns = shallowRef<TableColumn[]>(
  applyTableViewState(props.columns, readSavedView()),
)
const currentSelectedObjects = ref<TableRecord[]>([...props.selectedObjects])
const settingsOpen = ref(false)
let resizedColumnIndex: number | null = null

const visibleColumns = computed(() =>
  currentColumns.value.filter(column => !column.hidden),
)

watch(
  () => [props.columns, props.viewStorageKey] as const,
  ([columns]) => {
    currentColumns.value = applyTableViewState(columns, readSavedView())
  },
)

watch(() => props.selectedObjects, selectedObjects => {
  currentSelectedObjects.value = [...selectedObjects]
})

const getRowKey = (record: TableRecord): Key => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(record)
  }

  return record[props.rowKey] as Key
}

const selectedRowKeys = computed(() =>
  currentSelectedObjects.value.map(getRowKey),
)

const handleSelectionChange: NonNullable<
  TableRowSelection<TableRecord>['onChange']
> = (keys, rows) => {
  currentSelectedObjects.value = [...rows]
  emit('update:selectedObjects', [...rows])
  props.rowSelection?.onChange?.(keys, rows)
}

const effectiveRowSelection = computed<TableRowSelection<TableRecord> | undefined>(
  () => {
    if (!props.selectable) {
      return undefined
    }

    return {
      ...props.rowSelection,
      selectedRowKeys: props.rowSelection?.selectedRowKeys ?? selectedRowKeys.value,
      onChange: handleSelectionChange,
    }
  },
)

const defaultPaginationItemRender: NonNullable<
  TablePaginationConfig['itemRender']
> = ({ type, originalElement }) => {
  if (type === 'next') {
    return h('span', { class: 'library-table-pagination-link' }, 'Следующая >')
  }

  if (type === 'prev') {
    return h('span', { class: 'library-table-pagination-link' }, '< Предыдущая')
  }

  return originalElement
}

const effectivePagination = computed<TablePaginationConfig | false>(() => {
  if (props.pagination === false) {
    return false
  }

  return {
    position: ['bottomLeft'],
    size: 'small',
    pageSize: 20,
    showSizeChanger: true,
    showTotal: total => h(
      'span',
      { class: 'library-table-pagination-total' },
      [
        'Объектов в списке: ',
        h('strong', String(total)),
      ],
    ),
    buildOptionText: ({ value }) => String(value),
    itemRender: defaultPaginationItemRender,
    ...props.pagination,
  }
})

const startColumnResize = (
  event: globalThis.PointerEvent,
  columnIndex: number,
) => {
  const header = event.currentTarget as globalThis.HTMLElement
  const nextHeader = header.nextElementSibling as globalThis.HTMLElement | null

  if (!nextHeader || columnIndex >= visibleColumns.value.length - 1) {
    return
  }

  const bounds = header.getBoundingClientRect()
  const nextBounds = nextHeader.getBoundingClientRect()

  if (event.clientX < bounds.right - 10) {
    return
  }

  const view = header.ownerDocument.defaultView
  if (!view) {
    return
  }

  event.preventDefault()
  event.stopPropagation()

  const startX = event.clientX
  const startWidth = bounds.width
  const startNextWidth = nextBounds.width

  const handleMove = (moveEvent: globalThis.PointerEvent) => {
    const requestedDelta = Math.round(moveEvent.clientX - startX)
    const delta = Math.min(
      Math.max(requestedDelta, props.minColumnWidth - startWidth),
      startNextWidth - props.minColumnWidth,
    )
    const width = startWidth + delta
    const nextWidth = startNextWidth - delta

    if (delta !== 0) {
      resizedColumnIndex = columnIndex
    }

    const resizedColumn = visibleColumns.value[columnIndex]
    const nextColumn = visibleColumns.value[columnIndex + 1]

    currentColumns.value = currentColumns.value.map(column =>
      column === resizedColumn
        ? { ...column, width }
        : column === nextColumn
          ? { ...column, width: nextWidth }
          : column,
    )
  }

  const handleEnd = () => {
    view.removeEventListener('pointermove', handleMove)
    view.removeEventListener('pointerup', handleEnd)

    const column = visibleColumns.value[columnIndex]
    const width = Number(column.width)
    const columns = currentColumns.value.map(item => ({ ...item }))

    persistColumnView(columns)
    emit('update:columns', columns)
    emit('columnResize', column, width, columnIndex)

    view.setTimeout(() => {
      if (resizedColumnIndex === columnIndex) {
        resizedColumnIndex = null
      }
    }, 0)
  }

  view.addEventListener('pointermove', handleMove)
  view.addEventListener('pointerup', handleEnd)
}

const displayColumns = computed<TableColumn[]>(() => visibleColumns.value.map((column, index) => {
  const originalHeaderCell = column.customHeaderCell
  const isResizable = props.resizableColumns
    && column.resizable !== false
    && index < visibleColumns.value.length - 1

  return {
    ...column,
    customHeaderCell: (currentColumn: TableColumn) => {
      const originalProps = originalHeaderCell?.(currentColumn) ?? {}

      return {
        ...originalProps,
        class: [
          originalProps.class,
          isResizable && 'library-table-resizable-column',
        ],
        onClick: (event: globalThis.MouseEvent) => {
          originalProps.onClick?.(event as globalThis.PointerEvent)

          if (resizedColumnIndex === index) {
            resizedColumnIndex = null
            return
          }

          const dataIndex = typeof column.dataIndex === 'string'
            || typeof column.dataIndex === 'number'
            ? column.dataIndex
            : column.dataIndex?.join('.')
          emit('columnClick', column.key ?? dataIndex ?? index)
        },
        ...(isResizable
          ? {
              onPointerdown: (event: globalThis.PointerEvent) => {
                originalProps.onPointerdown?.(event)
                startColumnResize(event, index)
              },
            }
          : {}),
      }
    },
  } as TableColumn
}))

const getGearHeader = (
  event: globalThis.MouseEvent,
): globalThis.HTMLElement | null => {
  if (!props.viewStorageKey) {
    return null
  }

  const target = event.target
  if (!(target instanceof globalThis.Element)) {
    return null
  }

  const selectionHeader = target.closest(
    'th.ant-table-selection-column',
  ) as globalThis.HTMLElement | null

  if (!selectionHeader) {
    return null
  }

  const bounds = selectionHeader.getBoundingClientRect()
  const isGearClick = event.clientY >= bounds.top
    && event.clientY <= bounds.top + 26
    && Math.abs(event.clientX - (bounds.left + bounds.width / 2)) <= 12

  return isGearClick ? selectionHeader : null
}

const handleTableClick = (event: globalThis.MouseEvent) => {
  if (getGearHeader(event)) {
    event.preventDefault()
    event.stopPropagation()
    settingsOpen.value = true
  }
}

const persistColumnView = (columns: TableColumn[]) => {
  if (props.viewStorageKey) {
    writeLocalStorage(props.viewStorageKey, createTableViewState(columns))
  }
}

const saveColumnSettings = (columns: TableColumn[]) => {
  currentColumns.value = columns.map(column => ({ ...column }))
  persistColumnView(currentColumns.value)
  settingsOpen.value = false
  emit('update:columns', columns.map(column => ({ ...column })))
}

const resetColumnSettings = () => {
  if (props.viewStorageKey) {
    removeLocalStorage(props.viewStorageKey)
  }

  currentColumns.value = props.columns.map(column => ({ ...column }))
  settingsOpen.value = false
  emit('update:columns', currentColumns.value.map(column => ({ ...column })))
}

const handleTablePointerMove = (event: globalThis.MouseEvent) => {
  const container = event.currentTarget as globalThis.HTMLElement
  const gearHeader = getGearHeader(event)

  container
    .querySelectorAll('th.library-table-gear-hover')
    .forEach(header => header.classList.remove('library-table-gear-hover'))

  gearHeader?.classList.add('library-table-gear-hover')
}

const handleTablePointerLeave = (event: globalThis.MouseEvent) => {
  const container = event.currentTarget as globalThis.HTMLElement

  container
    .querySelectorAll('th.library-table-gear-hover')
    .forEach(header => header.classList.remove('library-table-gear-hover'))
}

const tableBindings = computed(() => {
  const tableProps: Partial<TableProps> = { ...props }
  delete tableProps.columns
  delete tableProps.minColumnWidth
  delete tableProps.pagination
  delete tableProps.resizableColumns
  delete tableProps.rowSelection
  delete tableProps.selectable
  delete tableProps.selectedObjects
  delete tableProps.showTitle
  delete tableProps.title
  delete tableProps.viewStorageKey

  return {
    ...tableProps,
    ...attrs,
    columns: displayColumns.value,
    pagination: effectivePagination.value,
    rowSelection: effectiveRowSelection.value,
  } as AntTableProps
})
</script>

<template>
  <div
    :class="[
      'library-table',
      viewStorageKey && 'library-table-view-settings-enabled',
    ]"
    @click.capture="handleTableClick"
    @pointerleave="handleTablePointerLeave"
    @pointermove="handleTablePointerMove"
  >
    <AntTypographyTitle
      v-if="title && showTitle"
      :level="4"
      class="library-table-title"
    >
      {{ title }}
    </AntTypographyTitle>

    <div
      v-if="$slots.start"
      class="btn-toolkit"
    >
      <slot name="start" />
    </div>

    <AntTable v-bind="tableBindings">
      <template
        v-if="$slots.bodyCell"
        #bodyCell="slotProps"
      >
        <slot
          name="bodyCell"
          v-bind="slotProps"
        />
      </template>

      <template
        v-if="$slots.headerCell"
        #headerCell="slotProps"
      >
        <slot
          name="headerCell"
          v-bind="slotProps"
        />
      </template>

      <template
        v-if="$slots.emptyText"
        #emptyText
      >
        <slot name="emptyText" />
      </template>

      <template
        v-if="$slots.expandedRowRender"
        #expandedRowRender="slotProps"
      >
        <slot
          name="expandedRowRender"
          v-bind="slotProps"
        />
      </template>

      <template
        v-if="$slots.summary"
        #summary
      >
        <slot name="summary" />
      </template>
    </AntTable>

    <TableSettings
      v-if="viewStorageKey"
      :columns="currentColumns"
      :open="settingsOpen"
      @close="settingsOpen = false"
      @reset="resetColumnSettings"
      @save="saveColumnSettings"
    />
  </div>
</template>

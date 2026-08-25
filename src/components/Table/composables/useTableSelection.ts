import type { Key } from 'ant-design-vue/es/_util/type'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { computed, ref, watch } from 'vue'
import type { TableProps, TableRecord } from '../types'

const selectionColumnWidth = 48

export const useTableSelection = (
  props: Readonly<TableProps>,
  onUpdate: (records: TableRecord[]) => void,
) => {
  const selectedObjects = ref<TableRecord[]>([...(props.selectedObjects ?? [])])

  watch(() => props.selectedObjects, records => {
    selectedObjects.value = [...(records ?? [])]
  })

  const getRowKey = (record: TableRecord): Key => typeof props.rowKey === 'function'
    ? props.rowKey(record)
    : record[props.rowKey ?? 'key'] as Key

  const selectedRowKeys = computed(() => selectedObjects.value.map(getRowKey))
  const rowSelection = computed<TableRowSelection<TableRecord> | undefined>(() => {
    if (!props.selectable) {
      return undefined
    }

    return {
      ...props.rowSelection,
      columnWidth: selectionColumnWidth,
      selectedRowKeys: props.rowSelection?.selectedRowKeys ?? selectedRowKeys.value,
      onChange: (keys, rows) => {
        selectedObjects.value = [...rows]
        onUpdate([...rows])
        props.rowSelection?.onChange?.(keys, rows)
      },
    }
  })

  return { rowSelection }
}

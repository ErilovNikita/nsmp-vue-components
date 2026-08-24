import type { Key } from 'ant-design-vue/es/_util/type'
import { computed, type ComputedRef, type ShallowRef } from 'vue'
import type { TableColumn } from '../types'

interface Options {
  columns: ShallowRef<TableColumn[]>
  minWidth: () => number
  onColumnClick: (key: Key) => void
  onResize: (column: TableColumn, width: number, index: number) => void
  persist: (columns: TableColumn[]) => void
  resizable: () => boolean
  visibleColumns: ComputedRef<TableColumn[]>
}

export const useResizableColumns = (options: Options) => {
  let resizedIndex: number | null = null

  const startResize = (event: globalThis.PointerEvent, index: number) => {
    const header = event.currentTarget as globalThis.HTMLElement
    const nextHeader = header.nextElementSibling as globalThis.HTMLElement | null
    if (!nextHeader || index >= options.visibleColumns.value.length - 1) return

    const bounds = header.getBoundingClientRect()
    const nextBounds = nextHeader.getBoundingClientRect()
    if (event.clientX < bounds.right - 10) return

    const view = header.ownerDocument.defaultView
    if (!view) return

    event.preventDefault()
    event.stopPropagation()
    const startX = event.clientX

    const handleMove = (moveEvent: globalThis.PointerEvent) => {
      const requestedDelta = Math.round(moveEvent.clientX - startX)
      const delta = Math.min(
        Math.max(requestedDelta, options.minWidth() - bounds.width),
        nextBounds.width - options.minWidth(),
      )
      if (delta !== 0) resizedIndex = index

      const column = options.visibleColumns.value[index]
      const nextColumn = options.visibleColumns.value[index + 1]
      options.columns.value = options.columns.value.map(item => item === column
        ? { ...item, width: bounds.width + delta }
        : item === nextColumn
          ? { ...item, width: nextBounds.width - delta }
          : item)
    }

    const handleEnd = () => {
      view.removeEventListener('pointermove', handleMove)
      view.removeEventListener('pointerup', handleEnd)
      const column = options.visibleColumns.value[index]
      const columns = options.columns.value.map(item => ({ ...item }))
      options.persist(columns)
      options.onResize(column, Number(column.width), index)
      view.setTimeout(() => {
        if (resizedIndex === index) resizedIndex = null
      })
    }

    view.addEventListener('pointermove', handleMove)
    view.addEventListener('pointerup', handleEnd)
  }

  const displayColumns = computed<TableColumn[]>(() =>
    options.visibleColumns.value.map((column, index) => {
      const originalHeaderCell = column.customHeaderCell
      const canResize = options.resizable()
        && column.resizable !== false
        && index < options.visibleColumns.value.length - 1

      return {
        ...column,
        customHeaderCell: (currentColumn: TableColumn) => {
          const originalProps = originalHeaderCell?.(currentColumn) ?? {}
          return {
            ...originalProps,
            class: [originalProps.class, canResize && 'library-table-resizable-column'],
            onClick: (event: globalThis.MouseEvent) => {
              originalProps.onClick?.(event as globalThis.PointerEvent)
              if (resizedIndex === index) {
                resizedIndex = null
                return
              }
              const dataIndex = typeof column.dataIndex === 'string'
                || typeof column.dataIndex === 'number'
                ? column.dataIndex
                : column.dataIndex?.join('.')
              options.onColumnClick(column.key ?? dataIndex ?? index)
            },
            ...(canResize ? {
              onPointerdown: (event: globalThis.PointerEvent) => {
                originalProps.onPointerdown?.(event)
                startResize(event, index)
              },
            } : {}),
          }
        },
      } as TableColumn
    }),
  )

  return { displayColumns }
}

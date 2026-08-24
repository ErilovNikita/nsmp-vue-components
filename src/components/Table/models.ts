import type { TableColumn } from './types'

export type TableColumnViewKey = string | number

export interface TableColumnViewState {
  hidden: boolean
  key: TableColumnViewKey
  width?: string | number
}

export interface TableViewState {
  columns: TableColumnViewState[]
  version: 1
}

export const getTableColumnViewKey = (
  column: TableColumn,
  index: number,
): TableColumnViewKey => {
  if (column.key !== undefined) {
    return column.key
  }

  if (typeof column.dataIndex === 'string' || typeof column.dataIndex === 'number') {
    return column.dataIndex
  }

  return column.dataIndex?.join('.') ?? index
}

export const createTableViewState = (columns: TableColumn[]): TableViewState => ({
  columns: columns.map((column, index) => ({
    hidden: column.hidden === true,
    key: getTableColumnViewKey(column, index),
    ...(column.width === undefined ? {} : { width: column.width }),
  })),
  version: 1,
})

export const applyTableViewState = (
  columns: TableColumn[],
  state: TableViewState | null,
): TableColumn[] => {
  if (!state || state.version !== 1 || !Array.isArray(state.columns)) {
    return columns.map(column => ({ ...column }))
  }

  const sourceColumns = columns.map((column, index) => ({
    column,
    key: getTableColumnViewKey(column, index),
  }))
  const sourceByKey = new Map(sourceColumns.map(item => [item.key, item.column]))
  const restoredKeys = new Set<TableColumnViewKey>()
  const restoredColumns: TableColumn[] = []

  state.columns.forEach(savedColumn => {
    const source = sourceByKey.get(savedColumn.key)
    if (!source) {
      return
    }

    restoredKeys.add(savedColumn.key)
    restoredColumns.push({
      ...source,
      hidden: savedColumn.hidden,
      ...(savedColumn.width === undefined ? {} : { width: savedColumn.width }),
    })
  })

  sourceColumns.forEach(({ column, key }) => {
    if (!restoredKeys.has(key)) {
      restoredColumns.push({ ...column })
    }
  })

  return restoredColumns
}

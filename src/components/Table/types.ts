import type { SpinProps } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import type { TablePaginationConfig, TableProps as AntTableProps } from 'ant-design-vue/es/table'
import type { ColumnType, ExpandableConfig, TableRowSelection } from 'ant-design-vue/es/table/interface'
export type TableRecord = Record<string, unknown>
export type TableColumn<RecordType = TableRecord> = ColumnType<RecordType> & {
  hidden?: boolean
  resizable?: boolean
}

export interface TableProps<RecordType = TableRecord> {
  bordered?: boolean
  /** Record property that contains nested rows. */
  childrenColumnName?: string
  columns: TableColumn<RecordType>[]
  dataSource?: RecordType[]
  /** Expansion behavior for tree rows and expanded row content. */
  expandable?: ExpandableConfig<RecordType>
  loading?: boolean | SpinProps
  locale?: AntTableProps<RecordType>['locale']
  pagination?: false | TablePaginationConfig
  minColumnWidth?: number
  resizableColumns?: boolean
  rowKey?: string | ((record: RecordType) => Key)
  rowSelection?: TableRowSelection<RecordType>
  scroll?: AntTableProps<RecordType>['scroll']
  selectable?: boolean
  selectedObjects?: RecordType[]
  showHeader?: boolean
  showTitle?: boolean
  size?: AntTableProps<RecordType>['size']
  tableLayout?: AntTableProps<RecordType>['tableLayout']
  title?: string | null
  /** LocalStorage key used to persist column order, visibility, and width. */
  viewStorageKey?: string
}

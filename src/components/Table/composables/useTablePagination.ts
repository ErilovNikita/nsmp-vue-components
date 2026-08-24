import type { TablePaginationConfig } from 'ant-design-vue/es/table'
import { computed, h } from 'vue'
import type { TableProps } from '../types'

const itemRender: NonNullable<TablePaginationConfig['itemRender']> = ({
  originalElement,
  type,
}) => {
  if (type === 'next') {
    return h('span', { class: 'library-table-pagination-link' }, 'Следующая >')
  }
  if (type === 'prev') {
    return h('span', { class: 'library-table-pagination-link' }, '< Предыдущая')
  }
  return originalElement
}

export const useTablePagination = (props: Readonly<TableProps>) => computed<
  TablePaginationConfig | false
>(() => props.pagination === false ? false : {
  position: ['bottomLeft'],
  size: 'small',
  pageSize: 20,
  showSizeChanger: true,
  showTotal: total => h('span', { class: 'library-table-pagination-total' }, [
    'Объектов в списке: ',
    h('strong', String(total)),
  ]),
  buildOptionText: ({ value }) => String(value),
  itemRender,
  ...props.pagination,
})

import { mount } from '@vue/test-utils'
import { Table as AntTable } from 'ant-design-vue'
import { describe, expect, it, vi } from 'vitest'
import { Table } from '@/components'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
]

const resizeColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
]

const dataSource = [
  { key: 1, name: 'Alice' },
  { key: 2, name: 'Bob' },
]

const tableStub = {
  name: 'AntTable',
  props: [
    'columns',
    'dataSource',
    'loading',
    'pagination',
    'rowSelection',
    'tableLayout',
  ],
  emits: ['change'],
  template: `
    <section class="table">
      <button class="change" @click="$emit('change', { current: 2 })">Change</button>
      <div
        v-if="columns[0].customHeaderCell"
        class="resizer"
        @click="columns[0].customHeaderCell(columns[0]).onClick($event)"
        @pointerdown="columns[0].customHeaderCell(columns[0]).onPointerdown($event)"
      />
      <div class="next-header" />
      <slot name="bodyCell" :text="'Cell'" />
      <slot name="emptyText" />
    </section>
  `,
}

describe('Table', () => {
  it('renders a title, actions, and the provided table data', () => {
    const wrapper = mount(Table, {
      props: {
        columns,
        dataSource,
        title: 'Employees',
      },
      slots: { start: '<button class="add">Add</button>' },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.find('.library-table-title').text()).toBe('Employees')
    expect(wrapper.find('.add').text()).toBe('Add')
    expect(wrapper.findComponent(AntTable).props()).toMatchObject({
      columns,
      dataSource,
      loading: false,
    })
    expect(wrapper.findComponent(AntTable).props('pagination')).toMatchObject({
      pageSize: 20,
      position: ['bottomLeft'],
      size: 'small',
      showSizeChanger: true,
    })
    expect(wrapper.findComponent(AntTable).props('tableLayout')).toBe('fixed')
    expect(wrapper.findComponent(AntTable).props('rowSelection')).toBeDefined()
  })

  it('emits complete selected objects when rows are checked', () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource },
      global: { stubs: { ATable: tableStub } },
    })

    const rowSelection = wrapper.findComponent(AntTable).props('rowSelection')
    expect(rowSelection).toBeDefined()
    rowSelection?.onChange?.([2], [dataSource[1]])

    expect(wrapper.emitted('update:selectedObjects')).toEqual([
      [[{ key: 2, name: 'Bob' }]],
    ])
  })

  it('allows row selection to be disabled', () => {
    const wrapper = mount(Table, {
      props: { columns: resizeColumns, dataSource, selectable: false },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.findComponent(AntTable).props('rowSelection')).toBeUndefined()
  })

  it('resizes a column by dragging its header separator', async () => {
    const wrapper = mount(Table, {
      props: { columns: resizeColumns, dataSource, selectable: false },
      global: { stubs: { ATable: tableStub } },
    })
    const header = wrapper.find('.resizer')

    vi.spyOn(header.element, 'getBoundingClientRect').mockReturnValue({
      bottom: 30,
      height: 30,
      left: 0,
      right: 100,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })
    vi.spyOn(
      wrapper.find('.next-header').element,
      'getBoundingClientRect',
    ).mockReturnValue({
      bottom: 30,
      height: 30,
      left: 100,
      right: 300,
      top: 0,
      width: 200,
      x: 100,
      y: 0,
      toJSON: () => ({}),
    })

    await header.trigger('pointerdown', { clientX: 100 })
    globalThis.window.dispatchEvent(
      new globalThis.MouseEvent('pointermove', { clientX: 150 }),
    )
    globalThis.window.dispatchEvent(new globalThis.MouseEvent('pointerup'))
    await wrapper.vm.$nextTick()

    const updates = wrapper.emitted('update:columns') as Array<[
      Array<{ width?: number }>,
    ]>

    expect(updates[0]?.[0]?.[0]).toMatchObject({
      width: 150,
    })
    expect(updates[0]?.[0]?.[1]).toMatchObject({
      width: 150,
    })
  })

  it('does not resize a column below 70 pixels by default', async () => {
    const wrapper = mount(Table, {
      props: { columns: resizeColumns, dataSource, selectable: false },
      global: { stubs: { ATable: tableStub } },
    })
    const header = wrapper.find('.resizer')

    vi.spyOn(header.element, 'getBoundingClientRect').mockReturnValue({
      bottom: 30,
      height: 30,
      left: 0,
      right: 100,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })
    vi.spyOn(
      wrapper.find('.next-header').element,
      'getBoundingClientRect',
    ).mockReturnValue({
      bottom: 30,
      height: 30,
      left: 100,
      right: 200,
      top: 0,
      width: 100,
      x: 100,
      y: 0,
      toJSON: () => ({}),
    })

    await header.trigger('pointerdown', { clientX: 100 })
    globalThis.window.dispatchEvent(
      new globalThis.MouseEvent('pointermove', { clientX: 0 }),
    )
    globalThis.window.dispatchEvent(new globalThis.MouseEvent('pointerup'))
    await wrapper.vm.$nextTick()

    const updates = wrapper.emitted('update:columns') as Array<[
      Array<{ width?: number }>,
    ]>

    expect(updates[0]?.[0]?.[0]?.width).toBe(70)
    expect(updates[0]?.[0]?.[1]?.width).toBe(130)
  })

  it('does not add a resize handle to the outer edge of the last column', () => {
    const wrapper = mount(Table, {
      props: { columns: resizeColumns, dataSource, selectable: false },
      global: { stubs: { ATable: tableStub } },
    })

    const renderedColumns = wrapper.findComponent(AntTable).props('columns')
    expect(renderedColumns?.[0].customHeaderCell).toBeTypeOf('function')
    const lastHeaderProps = renderedColumns?.[1].customHeaderCell?.(
      renderedColumns[1],
    )
    expect(lastHeaderProps?.class).not.toContain('library-table-resizable-column')
    expect(lastHeaderProps?.onPointerdown).toBeUndefined()
  })

  it('emits the column key when its header is clicked', async () => {
    const wrapper = mount(Table, {
      props: { columns: resizeColumns, dataSource, selectable: false },
      global: { stubs: { ATable: tableStub } },
    })

    await wrapper.find('.resizer').trigger('click')

    expect(wrapper.emitted('columnClick')).toEqual([['name']])
  })

  it('passes visual table options and events without loading data itself', async () => {
    const onChange = vi.fn()
    const rowSelection = { selectedRowKeys: [1] }
    const wrapper = mount(Table, {
      attrs: { onChange },
      props: {
        columns,
        dataSource,
        loading: true,
        pagination: false,
        rowSelection,
        showTitle: false,
        title: 'Hidden title',
      },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.find('.library-table-title').exists()).toBe(false)
    expect(wrapper.findComponent(AntTable).props()).toMatchObject({
      loading: true,
      pagination: false,
      rowSelection,
    })
    await wrapper.find('.change').trigger('click')
    expect(onChange).toHaveBeenCalledWith({ current: 2 })
  })

  it('forwards table presentation slots', () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource },
      slots: {
        bodyCell: '<template #default="{ text }"><b class="cell">{{ text }}</b></template>',
        emptyText: '<span class="empty">Nothing found</span>',
      },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.find('.cell').text()).toBe('Cell')
    expect(wrapper.find('.empty').text()).toBe('Nothing found')
  })
})

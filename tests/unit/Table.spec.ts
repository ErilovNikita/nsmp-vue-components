import { mount } from '@vue/test-utils'
import { Table as AntTable } from 'ant-design-vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Table, TableViewSelect } from '@/components'
import { writeLocalStorage } from '@/utils'

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
    'childrenColumnName',
    'columns',
    'dataSource',
    'expandable',
    'loading',
    'pagination',
    'rowSelection',
    'scroll',
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
      <slot name="expandColumnTitle" />
    </section>
  `,
}

describe('Table', () => {
  beforeEach(() => globalThis.localStorage.clear())

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
    expect(wrapper.findComponent(AntTable).props('rowSelection')).toMatchObject({
      columnWidth: 48,
    })
    expect(wrapper.findComponent(AntTable).props('childrenColumnName')).toBe('children')
  })

  it('keeps wide columns horizontally scrollable by default', () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.findComponent(AntTable).props('scroll')).toEqual({ x: 'max-content' })
  })

  it('renders a view selector and applies the selected view columns', async () => {
    const views = [
      { title: 'Summary', columns },
      { title: 'Details', columns: resizeColumns },
    ]
    const wrapper = mount(Table, {
      props: { columns, dataSource, showViewSelect: true, views },
      global: { stubs: { ATable: tableStub } },
    })

    const viewSelect = wrapper.findComponent(TableViewSelect)
    expect(viewSelect.exists()).toBe(true)
    expect(viewSelect.props('placeholder')).toBe('[выберите вид]')
    expect(viewSelect.props('options')).toEqual([
      { label: '[выберите вид]', value: '' },
      { label: 'Summary', value: '0' },
      { label: 'Details', value: '1' },
    ])

    viewSelect.vm.$emit('update:value', '1')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:columns')).toEqual([[resizeColumns]])
    expect(viewSelect.props('options')).toContainEqual({ label: '[выберите вид]', value: '' })
    viewSelect.vm.$emit('update:value', '')
    await wrapper.vm.$nextTick()
    expect(viewSelect.props('value')).toBe('')
    expect(wrapper.emitted('update:columns')).toEqual([[resizeColumns], [columns]])
  })

  it.each(['selector', 'settings'])('resets initial columns through %s after two-way updates', async source => {
    const initialColumns = [
      { ...resizeColumns[0], width: 120 },
      { ...resizeColumns[1], width: 200 },
    ]
    const wrapper = mount(Table, {
      props: {
        columns: initialColumns,
        dataSource,
        showViewSelect: true,
        viewStorageKey: 'reset-view',
        views: [{ title: 'Compact', columns: [{ ...initialColumns[1], width: 80 }] }],
      },
      global: { stubs: { ATable: tableStub } },
    })
    const select = wrapper.findComponent(TableViewSelect)
    select.vm.$emit('update:value', '0')
    await wrapper.vm.$nextTick()
    await wrapper.setProps({
      columns: wrapper.emitted('update:columns')!.at(-1)![0] as typeof initialColumns,
    })
    expect(globalThis.localStorage.getItem('reset-view')).not.toBeNull()
    if (source === 'selector') {
      select.vm.$emit('update:value', '')
    } else {
      wrapper.findComponent({ name: 'LibraryTableSettings' }).vm.$emit('reset')
    }
    await wrapper.vm.$nextTick()
    expect(select.props('value')).toBe('')
    expect(globalThis.localStorage.getItem('reset-view')).toBeNull()
    expect(wrapper.emitted('update:columns')!.at(-1)![0]).toEqual(initialColumns)
    expect(wrapper.findComponent({ name: 'LibraryTableSettings' }).props('columns')).toEqual(initialColumns)
  })

  it('keeps omitted view fields available for manual addition with two-way columns', async () => {
    const wrapper = mount(Table, {
      props: {
        columns: resizeColumns,
        dataSource,
        showViewSelect: true,
        viewStorageKey: 'compact-view',
        views: [{ title: 'Compact', columns }],
      },
      global: { stubs: { ATable: tableStub } },
    })
    wrapper.findComponent(TableViewSelect).vm.$emit('update:value', '0')
    await wrapper.vm.$nextTick()
    const updated = wrapper.emitted('update:columns')!.at(-1)![0] as typeof resizeColumns
    await wrapper.setProps({ columns: updated })
    const settings = wrapper.findComponent({ name: 'LibraryTableSettings' })
    expect(settings.props('columns')).toEqual([
      { ...columns[0], hidden: false }, { ...resizeColumns[1], hidden: true },
    ])
    expect(wrapper.findComponent(AntTable).props('columns')).toHaveLength(1)
    settings.vm.$emit('save', updated.map(column => ({ ...column, hidden: false })))
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(AntTable).props('columns')).toHaveLength(2)
    expect(resizeColumns[1]).not.toHaveProperty('hidden')
  })

  it('preserves a configured horizontal scroll width', () => {
    const scroll = { x: 1200, y: 400 }
    const wrapper = mount(Table, {
      props: { columns, dataSource, scroll },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.findComponent(AntTable).props('scroll')).toEqual(scroll)
  })

  it('adds horizontal scrolling when only another scroll option is configured', () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource, scroll: { y: 400 } },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.findComponent(AntTable).props('scroll')).toEqual({
      x: 'max-content',
      y: 400,
    })
  })

  it('passes nested row configuration to Ant Table', () => {
    const nestedRows = [{
      key: 1,
      name: 'Parent',
      nodes: [{ key: 2, name: 'Child' }],
    }]
    const expandable = { defaultExpandAllRows: true, indentSize: 24 }
    const wrapper = mount(Table, {
      props: {
        childrenColumnName: 'nodes',
        columns,
        dataSource: nestedRows,
        expandable,
      },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.findComponent(AntTable).props()).toMatchObject({
      childrenColumnName: 'nodes',
      dataSource: nestedRows,
      expandable,
    })
  })

  it('keeps the selection column at a fixed width', () => {
    const wrapper = mount(Table, {
      props: {
        columns,
        dataSource,
        rowSelection: { columnWidth: 120 },
      },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.findComponent(AntTable).props('rowSelection')).toMatchObject({
      columnWidth: 48,
    })
  })

  it('leaves data space flexible when a compact view contains one fixed-width column', async () => {
    const sizedColumns = resizeColumns.map(column => ({ ...column, width: 120 }))
    const wrapper = mount(Table, {
      props: {
        columns: sizedColumns,
        dataSource,
        showViewSelect: true,
        viewStorageKey: 'selection-width',
        views: [{ title: 'Compact', columns: sizedColumns.slice(0, 1) }],
      },
      global: { stubs: { ATable: tableStub } },
    })
    const table = wrapper.findComponent(AntTable)
    expect(table.props('columns')?.map(column => column.width))
      .toEqual([120, undefined])

    wrapper.findComponent(TableViewSelect).vm.$emit('update:value', '0')
    await wrapper.vm.$nextTick()
    expect(table.props('columns')).toHaveLength(1)
    expect(table.props('columns')?.[0].width).toBeUndefined()
    expect(table.props('rowSelection')?.columnWidth).toBe(48)
    expect(wrapper.findComponent({ name: 'LibraryTableSettings' }).props('columns')[0].width)
      .toBe(120)
    expect(JSON.parse(globalThis.localStorage.getItem('selection-width')!).columns[0].width)
      .toBe(120)
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

  it('opens column settings when the gear is clicked', async () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource, viewStorageKey: 'employees-view' },
      slots: {
        start: `
          <table>
            <thead>
              <tr>
                <th class="ant-table-selection-column">
                  <span class="gear-target" />
                </th>
              </tr>
            </thead>
          </table>
        `,
      },
      global: { stubs: { ATable: tableStub } },
    })
    const header = wrapper.find('th.ant-table-selection-column')

    vi.spyOn(header.element, 'getBoundingClientRect').mockReturnValue({
      bottom: 50,
      height: 50,
      left: 0,
      right: 40,
      top: 0,
      width: 40,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    await wrapper.find('.gear-target').trigger('click', {
      clientX: 20,
      clientY: 10,
    })

    expect(wrapper.findComponent({ name: 'LibraryTableSettings' }).props('open')).toBe(true)

    await wrapper.find('.gear-target').trigger('pointermove', {
      clientX: 20,
      clientY: 10,
    })
    expect(header.classes()).toContain('library-table-gear-hover')

    await wrapper.find('.library-table').trigger('pointerleave')
    expect(header.classes()).not.toContain('library-table-gear-hover')

  })

  it('keeps column settings available when row selection is disabled', async () => {
    const wrapper = mount(Table, {
      props: {
        columns,
        dataSource,
        selectable: false,
        viewStorageKey: 'employees-view',
      },
      slots: {
        start: `
          <table>
            <thead class="ant-table-thead">
              <tr>
                <th class="ant-table-cell"><span class="gear-target" /></th>
              </tr>
            </thead>
          </table>
        `,
      },
      global: { stubs: { ATable: tableStub } },
    })
    const header = wrapper.find('th.ant-table-cell')

    vi.spyOn(header.element, 'getBoundingClientRect').mockReturnValue({
      bottom: 50,
      height: 50,
      left: 0,
      right: 160,
      top: 0,
      width: 160,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    expect(wrapper.classes()).toContain('library-table-view-settings-without-selection')
    expect(wrapper.findComponent(AntTable).props('rowSelection')).toBeUndefined()

    await wrapper.find('.gear-target').trigger('click', {
      clientX: 16,
      clientY: 10,
    })

    expect(wrapper.findComponent({ name: 'LibraryTableSettings' }).props('open')).toBe(true)
  })

  it('does not render view settings without a storage key', () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.classes()).not.toContain('library-table-view-settings-enabled')
    expect(wrapper.findComponent({ name: 'LibraryTableSettings' }).exists()).toBe(false)
  })

  it('does not open parent settings from a nested table header', async () => {
    const wrapper = mount(Table, {
      props: { columns, dataSource, viewStorageKey: 'employees-view' },
      slots: {
        start: `
          <div class="library-table library-table-view-settings-disabled">
            <table>
              <thead><tr><th class="ant-table-cell nested-header">Nested</th></tr></thead>
            </table>
          </div>
        `,
      },
      global: { stubs: { ATable: tableStub } },
    })

    await wrapper.find('.nested-header').trigger('click', {
      clientX: 16,
      clientY: 10,
    })

    expect(wrapper.findComponent({ name: 'LibraryTableSettings' }).props('open')).toBe(false)
  })

  it('restores, saves, and resets a view using the configured storage key', async () => {
    writeLocalStorage('employees-view', {
      version: 1,
      columns: [
        { key: 'age', hidden: false, width: 180 },
        { key: 'name', hidden: true, width: 100 },
      ],
    })
    const wrapper = mount(Table, {
      props: {
        columns: resizeColumns,
        dataSource,
        viewStorageKey: 'employees-view',
      },
      global: { stubs: { ATable: tableStub } },
    })
    const settings = wrapper.findComponent({ name: 'LibraryTableSettings' })

    expect(settings.props('columns').map((column: { key: string }) => column.key)).toEqual([
      'age',
      'name',
    ])
    expect(settings.props('columns')[0]).toMatchObject({ width: 180 })
    expect(settings.props('columns')[1]).toMatchObject({ hidden: true })

    settings.vm.$emit('save', resizeColumns.map(column => ({ ...column })))
    await wrapper.vm.$nextTick()
    expect(JSON.parse(globalThis.localStorage.getItem('employees-view') ?? '{}'))
      .toMatchObject({ version: 1 })

    settings.vm.$emit('reset')
    await wrapper.vm.$nextTick()
    expect(globalThis.localStorage.getItem('employees-view')).toBeNull()
    expect(wrapper.emitted('update:columns')?.at(-1)?.[0]).toEqual(resizeColumns)
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
        expandColumnTitle: '<span class="expand-title">Files</span>',
      },
      global: { stubs: { ATable: tableStub } },
    })

    expect(wrapper.find('.cell').text()).toBe('Cell')
    expect(wrapper.find('.empty').text()).toBe('Nothing found')
    expect(wrapper.find('.expand-title').text()).toBe('Files')
  })
})

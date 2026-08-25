import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TableSettings from '@/components/Table/TableSettings.vue'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Department', dataIndex: 'department', key: 'department' },
]

const stubs = {
  LibraryModal: {
    name: 'LibraryModal',
    props: ['open', 'title'],
    template: `
      <section v-if="open">
        <h2>{{ title }}</h2>
        <slot />
        <footer><slot name="footer" /></footer>
      </section>
    `,
  },
  ASelect: {
    name: 'ASelect',
    props: ['disabled', 'options'],
    template: '<div class="select">{{ options.map(option => option.label).join(", ") }}</div>',
  },
  AButton: {
    name: 'AButton',
    template: '<button><slot /></button>',
  },
}

describe('TableSettings', () => {
  it('shows every existing field and its current order', () => {
    const wrapper = mount(TableSettings, {
      props: { columns, open: true },
      global: { stubs },
    })

    expect(wrapper.findComponent({ name: 'LibraryModal' }).props('title')).toBe(
      'Настройка полей',
    )
    expect(wrapper.findComponent({ name: 'ASelect' }).props()).toMatchObject({
      disabled: true,
      options: [],
    })
    expect(wrapper.findAll('.table-settings-order tbody tr').map(
      row => row.findAll('td')[1].text(),
    )).toEqual(['Name', 'Age', 'Department'])
  })

  it('changes column order with arrows and drag and drop', async () => {
    const wrapper = mount(TableSettings, {
      props: { columns, open: true },
      global: { stubs },
    })

    await wrapper.findAll('[aria-label="Опустить колонку"]')[0].trigger('click')
    expect(wrapper.findAll('.table-settings-order tbody tr')[0].text()).toContain('Age')

    const rows = wrapper.findAll('.table-settings-order tbody tr')
    await rows[0].trigger('dragstart')
    await rows[2].trigger('drop')

    expect(wrapper.findAll('.table-settings-order tbody tr')[2].text()).toContain('Age')
  })

  it('hides a field and saves updated columns', async () => {
    const wrapper = mount(TableSettings, {
      props: { columns, open: true },
      global: { stubs },
    })

    await wrapper.findAll('[aria-label="Скрыть колонку"]')[1].trigger('click')
    expect(wrapper.findComponent({ name: 'ASelect' }).props()).toMatchObject({
      disabled: false,
      options: [{ label: 'Age', value: 'age' }],
    })
    const saveButton = wrapper.findAllComponents({ name: 'AButton' }).find(
      button => button.text() === 'Сохранить',
    )
    await saveButton?.trigger('click')

    const savedColumns = wrapper.emitted('save')?.[0]?.[0] as Array<{
      key: string
      hidden?: boolean
    }>
    expect(savedColumns.find(column => column.key === 'age')?.hidden).toBe(true)
  })

  it('does not allow the last visible column to be hidden', async () => {
    const wrapper = mount(TableSettings, {
      props: { columns, open: true },
      global: { stubs },
    })

    await wrapper.findAll('[aria-label="Скрыть колонку"]')[0].trigger('click')
    await wrapper.findAll('[aria-label="Скрыть колонку"]')[0].trigger('click')

    const lastHideButton = wrapper.find('[aria-label="Скрыть колонку"]')
    expect(lastHideButton.attributes('disabled')).toBeDefined()
    expect(lastHideButton.attributes('title')).toBe('Нельзя скрыть последний столбец')

    await lastHideButton.trigger('click')
    expect(wrapper.findAll('.table-settings-order tbody tr')).toHaveLength(1)
  })

  it('emits reset when the reset view button is clicked', async () => {
    const wrapper = mount(TableSettings, {
      props: { columns, open: true },
      global: { stubs },
    })
    const resetButton = wrapper.findAllComponents({ name: 'AButton' }).find(
      button => button.text() === 'Сбросить вид',
    )

    await resetButton?.trigger('click')

    expect(wrapper.emitted('reset')).toHaveLength(1)
  })
})

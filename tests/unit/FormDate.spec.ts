import { mount } from '@vue/test-utils'
import { DatePicker as AntDatePicker, FormItem as AntFormItem } from 'ant-design-vue'
import dayjs from 'dayjs'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Alert, FormDate } from '@/components'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation(query => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  })
})

describe('FormDate', () => {
  it('renders a date picker by default inside FormField', () => {
    const wrapper = mount(FormDate, {
      props: {
        description: 'Выберите дату',
        label: 'Дата',
        placeholder: 'ДД.ММ.ГГГГ',
      },
    })

    expect(wrapper.findComponent(AntFormItem).props('label')).toBe('Дата:')
    expect(wrapper.findComponent(Alert).props('message')).toBe('Выберите дату')
    expect(wrapper.findComponent(AntDatePicker).props()).toMatchObject({
      placeholder: 'ДД.ММ.ГГГГ',
      showTime: false,
    })
    expect(wrapper.findComponent(AntDatePicker.RangePicker).exists()).toBe(false)
  })

  it('enables time for datetime mode', () => {
    const wrapper = mount(FormDate, { props: { type: 'datetime' } })

    expect(wrapper.findComponent(AntDatePicker).props('showTime')).toBe(true)
  })

  it.each([
    ['date-range', false],
    ['datetime-range', true],
  ] as const)('renders %s mode', (type, showTime) => {
    const wrapper = mount(FormDate, {
      props: {
        placeholder: ['Начало', 'Конец'],
        type,
      },
    })
    const range = wrapper.findComponent(AntDatePicker.RangePicker)

    expect(wrapper.findComponent(AntDatePicker).exists()).toBe(false)
    expect(range.props()).toMatchObject({
      placeholder: ['Начало', 'Конец'],
      showTime,
    })
  })

  it('forwards picker props while the selected type controls time', () => {
    const wrapper = mount(FormDate, {
      props: {
        datePickerProps: { allowClear: false, showTime: false },
        type: 'datetime',
      },
    })

    expect(wrapper.findComponent(AntDatePicker).props()).toMatchObject({
      allowClear: false,
      showTime: true,
    })
  })

  it('emits single and range values for v-model:value', async () => {
    const single = mount(FormDate)
    const date = dayjs('2026-08-26')

    single.findComponent(AntDatePicker).vm.$emit('update:value', date)
    await single.vm.$nextTick()
    expect(single.emitted('update:value')).toEqual([[date]])

    const range = mount(FormDate, { props: { type: 'date-range' } })
    const value = [dayjs('2026-08-26'), dayjs('2026-08-27')]

    range.findComponent(AntDatePicker.RangePicker).vm.$emit('update:value', value)
    await range.vm.$nextTick()
    expect(range.emitted('update:value')).toEqual([[value]])
  })
})

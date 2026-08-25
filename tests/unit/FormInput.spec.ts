import { mount } from '@vue/test-utils'
import { FormItem as AntFormItem, Input as AntInput } from 'ant-design-vue'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Alert, FormInput } from '@/components'

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

describe('FormInput', () => {
  it('renders an info alert and input inside a form item', () => {
    const wrapper = mount(FormInput, {
      props: {
        description: 'Описание поля',
        label: 'Поле',
        name: 'field',
        placeholder: 'Введите значение',
      },
    })

    expect(wrapper.findComponent(AntFormItem).props('label')).toBe('Поле')
    expect(wrapper.findComponent(Alert).props()).toMatchObject({
      message: 'Описание поля',
      open: true,
      type: 'info',
    })
    expect(wrapper.findComponent(AntInput).props('placeholder')).toBe('Введите значение')
  })

  it('supports v-model:value', async () => {
    const wrapper = mount(FormInput, { props: { value: '' } })

    await wrapper.find('input').setValue('Новый текст')

    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['Новый текст'])
  })

  it('allows nested component props to be customized', () => {
    const wrapper = mount(FormInput, {
      props: {
        alertProps: { closable: false, type: 'warning' },
        formItemProps: { extra: 'Подсказка' },
        inputProps: { allowClear: true, maxlength: 20 },
      },
    })

    expect(wrapper.findComponent(Alert).props('type')).toBe('warning')
    expect(wrapper.findComponent(AntFormItem).props('extra')).toBe('Подсказка')
    expect(wrapper.findComponent(AntInput).props()).toMatchObject({
      allowClear: true,
      maxlength: 20,
    })
  })
})

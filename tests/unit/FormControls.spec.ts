import { mount } from '@vue/test-utils'
import {
  Checkbox as AntCheckbox,
  CheckboxGroup as AntCheckboxGroup,
  InputNumber as AntInputNumber,
  RadioGroup as AntRadioGroup,
  Select as AntSelect,
  Slider as AntSlider,
  Switch as AntSwitch,
} from 'ant-design-vue'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import {
  Alert,
  FormCheckbox,
  FormNumber,
  FormSelect,
  FormSlider,
  FormSwitch,
} from '@/components'

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

describe('form controls', () => {
  it('renders FormNumber with an info alert and numeric constraints', () => {
    const wrapper = mount(FormNumber, {
      props: { description: 'Возраст', min: 0, max: 120, step: 1 },
    })

    expect(wrapper.findComponent(Alert).props()).toMatchObject({ open: true, type: 'info' })
    expect(wrapper.findComponent(AntInputNumber).props()).toMatchObject({
      min: 0,
      max: 120,
      step: 1,
    })
  })

  it('renders FormCheckbox without a top label', () => {
    const wrapper = mount(FormCheckbox, {
      props: { description: 'Подтвердите выбор', label: 'Согласен' },
    })

    expect(wrapper.find('.ant-form-item-label').exists()).toBe(false)
    expect(wrapper.findComponent(AntCheckbox).text()).toBe('Согласен')
  })

  it('renders FormSwitch without a top label and forwards switch props', async () => {
    const wrapper = mount(FormSwitch, {
      props: {
        checked: true,
        label: 'Уведомления',
        switchProps: { disabled: true },
      },
    })
    const control = wrapper.findComponent(AntSwitch)

    expect(wrapper.find('.ant-form-item-label').exists()).toBe(false)
    expect(wrapper.find('.library-form-switch-label').text()).toBe('Уведомления')
    expect(control.props()).toMatchObject({ checked: true, disabled: true })

    control.vm.$emit('update:checked', false)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:checked')).toEqual([[false]])
  })

  it('forwards options to FormSelect', () => {
    const options = [{ label: 'Москва', value: 'moscow' }]
    const wrapper = mount(FormSelect, { props: { options } })

    expect(wrapper.findComponent(AntSelect).props('options')).toEqual(options)
  })

  it('enables option label search in FormSelect', () => {
    const options = [{ label: 'Москва', value: 'moscow' }]
    const wrapper = mount(FormSelect, {
      props: { options, searchable: true },
    })

    expect(wrapper.findComponent(AntSelect).props()).toMatchObject({
      optionFilterProp: 'label',
      showSearch: true,
    })
  })

  it('renders a radio group in radio view', () => {
    const options = [{ label: 'Москва', value: 'moscow' }]
    const wrapper = mount(FormSelect, {
      props: { options, value: 'moscow', view: 'radio' },
    })

    expect(wrapper.findComponent(AntSelect).exists()).toBe(false)
    expect(wrapper.findComponent(AntRadioGroup).props('options')).toEqual(options)
  })

  it('uses a radio-styled checkbox group for multiple radio view', () => {
    const options = [{ label: 'Москва', value: 'moscow' }]
    const wrapper = mount(FormSelect, {
      props: { multiple: true, options, value: ['moscow'], view: 'radio' },
    })

    expect(wrapper.findComponent(AntRadioGroup).exists()).toBe(false)
    expect(wrapper.findComponent(AntCheckboxGroup).props('value')).toEqual(['moscow'])
  })

  it('renders radio buttons in radio-button view', () => {
    const options = [{ label: 'Москва', value: 'moscow' }]
    const wrapper = mount(FormSelect, {
      props: { options, value: 'moscow', view: 'radio-button' },
    })

    expect(wrapper.findComponent(AntRadioGroup).props()).toMatchObject({
      buttonStyle: 'outline',
      optionType: 'button',
      options,
    })
  })

  it('supports solid radio-button style in single and multiple modes', () => {
    const options = [{ label: 'Москва', value: 'moscow' }]
    const single = mount(FormSelect, {
      props: { options, radioButtonStyle: 'solid', value: 'moscow', view: 'radio-button' },
    })
    const multiple = mount(FormSelect, {
      props: {
        multiple: true,
        options,
        radioButtonStyle: 'solid',
        value: ['moscow'],
        view: 'radio-button',
      },
    })

    expect(single.findComponent(AntRadioGroup).props('buttonStyle')).toBe('solid')
    expect(single.findComponent(AntRadioGroup).classes())
      .toContain('library-form-select-radio-button-solid')
    expect(multiple.findComponent(AntCheckboxGroup).classes())
      .toContain('library-form-select-radio-button-solid')
  })

  it('forwards range settings to FormSlider', () => {
    const wrapper = mount(FormSlider, {
      props: { min: 10, max: 50, step: 5 },
    })

    expect(wrapper.findComponent(AntSlider).props()).toMatchObject({
      min: 10,
      max: 50,
      step: 5,
    })
  })
})

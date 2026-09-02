import { mount } from '@vue/test-utils'
import {
  Checkbox as AntCheckbox,
  DatePicker as AntDatePicker,
  Input as AntInput,
  InputNumber as AntInputNumber,
  Select as AntSelect,
  Slider as AntSlider,
  Switch as AntSwitch,
} from 'ant-design-vue'
import dayjs from 'dayjs'
import { reactive } from 'vue'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import {
  Form,
  FormCheckbox,
  FormDate,
  FormInput,
  FormNumber,
  FormSelect,
  FormSlider,
  FormSwitch,
} from '@/components'

beforeAll(() => {
  Object.defineProperty(globalThis.window, 'matchMedia', {
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

describe('Form model binding by name', () => {
  it('reads and updates form values without explicit v-model bindings', async () => {
    const model = reactive({
      accepted: false,
      birthDate: null as ReturnType<typeof dayjs> | null,
      city: 'moscow',
      name: 'Анна',
      notifications: false,
      profile: { age: 25 },
      workload: 40,
    })
    const wrapper = mount({
      components: {
        Form,
        FormCheckbox,
        FormDate,
        FormInput,
        FormNumber,
        FormSelect,
        FormSlider,
        FormSwitch,
      },
      setup: () => ({ model }),
      template: `
        <Form :model="model">
          <FormInput name="name" />
          <FormNumber :name="['profile', 'age']" />
          <FormDate name="birthDate" />
          <FormSelect name="city" :options="[]" />
          <FormSlider name="workload" />
          <FormSwitch name="notifications" />
          <FormCheckbox name="accepted" />
        </Form>
      `,
    })

    expect(wrapper.findComponent(AntInput).props('value')).toBe('Анна')
    expect(wrapper.findComponent(AntInputNumber).props('value')).toBe(25)
    expect(wrapper.findComponent(AntSelect).props('value')).toBe('moscow')
    expect(wrapper.findComponent(AntSlider).props('value')).toBe(40)
    expect(wrapper.findComponent(AntSwitch).props('checked')).toBe(false)
    expect(wrapper.findComponent(AntCheckbox).props('checked')).toBe(false)

    const date = dayjs('2026-09-02')
    wrapper.findComponent(AntInput).vm.$emit('update:value', 'Мария')
    wrapper.findComponent(AntInputNumber).vm.$emit('update:value', 30)
    wrapper.findComponent(AntDatePicker).vm.$emit('update:value', date)
    wrapper.findComponent(AntSelect).vm.$emit('update:value', 'kazan')
    wrapper.findComponent(AntSlider).vm.$emit('update:value', 60)
    wrapper.findComponent(AntSwitch).vm.$emit('update:checked', true)
    wrapper.findComponent(AntCheckbox).vm.$emit('update:checked', true)
    await wrapper.vm.$nextTick()

    expect(model).toMatchObject({
      accepted: true,
      birthDate: date,
      city: 'kazan',
      name: 'Мария',
      notifications: true,
      profile: { age: 30 },
      workload: 60,
    })
  })
})

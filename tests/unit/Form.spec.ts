import { mount } from '@vue/test-utils'
import { Form as AntForm } from 'ant-design-vue'
import { describe, expect, it } from 'vitest'
import { Form } from '@/components'

describe('Form', () => {
  it('renders content inside the Ant Design form', () => {
    const wrapper = mount(Form, {
      slots: { default: '<input name="title" />' },
    })

    expect(wrapper.find('form.ant-form.library-form').exists()).toBe(true)
    expect(wrapper.find('input[name="title"]').exists()).toBe(true)
  })

  it('uses a vertical layout by default and forwards form props', () => {
    const model = { title: 'Draft' }
    const wrapper = mount(Form, {
      props: { model },
    })

    const antForm = wrapper.findComponent(AntForm)
    expect(antForm.props('layout')).toBe('vertical')
    expect(antForm.props('model')).toEqual(model)
  })

  it('exposes the Ant Design form methods', () => {
    const wrapper = mount(Form)

    expect(wrapper.vm.resetFields).toBeTypeOf('function')
    expect(wrapper.vm.clearValidate).toBeTypeOf('function')
    expect(wrapper.vm.validate).toBeTypeOf('function')
    expect(wrapper.vm.validateFields).toBeTypeOf('function')
    expect(wrapper.vm.getFieldsValue).toBeTypeOf('function')
    expect(wrapper.vm.scrollToField).toBeTypeOf('function')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { AttrGroup } from '@/components'

const stubs = {
  ACollapse: {
    props: ['activeKey'],
    emits: ['update:activeKey'],
    template: '<section class="collapse"><slot /></section>',
  },
  ACollapsePanel: {
    props: ['header'],
    template: '<article><h2>{{ header }}</h2><slot /></article>',
  },
  AForm: { template: '<div class="form"><slot /></div>' },
  AFormItem: {
    props: ['label'],
    template: '<div class="form-item"><label>{{ label }}</label><slot /></div>',
  },
  ATypographyText: { template: '<span><slot /></span>' },
}

describe('AttrGroup', () => {
  it('renders configured attributes and surrounding slots', () => {
    const wrapper = mount(AttrGroup, {
      props: {
        title: 'Employee',
        items: [['Name', 'name'], ['Age', 'age']],
        values: { name: 'Nikita', age: 30 },
      },
      slots: {
        start: '<div class="start">Start</div>',
        end: '<div class="end">End</div>',
      },
      global: { stubs },
    })

    expect(wrapper.find('h2').text()).toBe('Employee')
    expect(wrapper.findAll('.form-item').map(item => item.text())).toEqual([
      'NameNikita',
      'Age30',
    ])
    expect(wrapper.find('.start').exists()).toBe(true)
    expect(wrapper.find('.end').exists()).toBe(true)
  })

  it('implements the controller open and close methods', async () => {
    const wrapper = mount(AttrGroup, {
      props: { title: 'Employee', values: {} },
      global: { stubs },
    })

    expect(wrapper.vm.show).toBe(false)
    expect(wrapper.vm.activeKey).toBeNull()

    const api = wrapper.vm.open()
    await wrapper.vm.$nextTick()

    expect(api.close()).toBe(api)
    expect(wrapper.emitted('update:activeKey')).toEqual([[1], [null]])
    expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
  })

  it('opens immediately through the open prop', () => {
    const wrapper = mount(AttrGroup, {
      props: { open: true, title: 'Employee', values: {} },
      global: { stubs },
    })

    expect(wrapper.vm.show).toBe(true)
    expect(wrapper.vm.activeKey).toBe(1)
  })
})

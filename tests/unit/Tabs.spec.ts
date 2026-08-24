import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Tabs } from '@/components'

const items = [
  { key: 1, label: 'Форма', slot: 'form' },
  { key: 2, label: 'Список', slot: 'list' },
]

const stubs = {
  ATabs: {
    name: 'ATabs',
    props: ['activeKey'],
    emits: ['change', 'tabClick'],
    template: `
      <section class="tabs" :data-active-key="activeKey">
        <button class="change" @click="$emit('change', '2')">Change</button>
        <slot />
        <slot name="tabBarExtraContent" />
      </section>
    `,
  },
  ATabPane: {
    name: 'ATabPane',
    props: ['tab'],
    template: '<article><h2>{{ tab }}</h2><slot /></article>',
  },
}

describe('Tabs', () => {
  it('renders tab content and changes the active tab', async () => {
    const wrapper = mount(Tabs, {
      props: { items },
      slots: {
        form: '<p>Form content</p>',
        list: '<p>List content</p>',
      },
      global: { stubs },
    })

    expect(wrapper.text()).toContain('Form content')
    expect(wrapper.text()).toContain('List content')
    expect(wrapper.find('.tabs').attributes('data-active-key')).toBe('1')

    await wrapper.find('.change').trigger('click')

    expect(wrapper.emitted('update:activeKey')).toEqual([[2]])
    expect(wrapper.emitted('change')).toEqual([[2]])
    expect(wrapper.find('.tabs').attributes('data-active-key')).toBe('2')
  })

  it('provides set and home methods from the old controller', async () => {
    const wrapper = mount(Tabs, {
      props: { defaultTab: 2, items },
      global: { stubs },
    })

    wrapper.vm.set(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tabs').attributes('data-active-key')).toBe('1')

    wrapper.vm.home()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tabs').attributes('data-active-key')).toBe('2')
  })

  it('supports v-model updates from the parent', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: 1, items },
      global: { stubs },
    })

    await wrapper.setProps({ activeKey: 2 })

    expect(wrapper.find('.tabs').attributes('data-active-key')).toBe('2')
  })
})

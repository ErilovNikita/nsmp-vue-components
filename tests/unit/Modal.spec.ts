import { mount } from '@vue/test-utils'
import { Modal as AntModal } from 'ant-design-vue'
import { afterEach, describe, expect, it } from 'vitest'
import { NsmpModal } from '@/components'

afterEach(() => {
  globalThis.document.body.innerHTML = ''
})

describe('NsmpModal', () => {
  it('passes the open state and Ant Design props to the modal', () => {
    const wrapper = mount(NsmpModal, {
      props: {
        open: true,
        title: 'Edit employee',
        width: 720,
      },
      global: {
        stubs: {
          AModal: {
            name: 'AntModal',
            props: ['open', 'title', 'width'],
            template: '<section><slot /><slot name="footer" /></section>',
          },
        },
      },
    })

    const modal = wrapper.findComponent(AntModal)

    expect(modal.props()).toMatchObject({
      open: true,
      title: 'Edit employee',
      width: 720,
    })
  })

  it('renders the legacy content slots and a custom footer', () => {
    const wrapper = mount(NsmpModal, {
      slots: {
        alert: '<div class="alert">Warning</div>',
        form: '<form>Fields</form>',
        footer: '<button>Save</button>',
      },
      global: {
        stubs: {
          AModal: {
            name: 'AntModal',
            template: '<section><slot /><footer><slot name="footer" /></footer></section>',
          },
        },
      },
    })

    expect(wrapper.find('.alert').text()).toBe('Warning')
    expect(wrapper.find('form').text()).toBe('Fields')
    expect(wrapper.find('footer').text()).toBe('Save')
  })

  it('renders the Ant Design mask, close button, and default footer', async () => {
    const wrapper = mount(NsmpModal, {
      attachTo: globalThis.document.body,
      props: {
        title: 'Confirmation',
      },
      slots: { default: 'Modal content' },
    })

    wrapper.vm.show()
    await wrapper.vm.$nextTick()

    expect(globalThis.document.body.querySelector('.ant-modal-mask')).not.toBeNull()
    expect(globalThis.document.body.querySelector('.ant-modal-close')).not.toBeNull()
    expect(globalThis.document.body.querySelector('.ant-modal-footer')).not.toBeNull()

    wrapper.unmount()
  })

  it('allows the default mask and close button to be disabled explicitly', () => {
    const wrapper = mount(NsmpModal, {
      props: {
        closable: false,
        mask: false,
      },
      global: {
        stubs: {
          AModal: {
            name: 'AntModal',
            props: ['closable', 'mask'],
            template: '<section />',
          },
        },
      },
    })

    expect(wrapper.findComponent(AntModal).props()).toMatchObject({
      closable: false,
      mask: false,
    })
  })

  it('supports the default content slot', () => {
    const wrapper = mount(NsmpModal, {
      slots: { default: '<p class="content">Content</p>' },
      global: {
        stubs: {
          AModal: {
            name: 'AntModal',
            template: '<section><slot /></section>',
          },
        },
      },
    })

    expect(wrapper.find('.content').text()).toBe('Content')
  })

  it('forwards open state changes for v-model:open', async () => {
    const wrapper = mount(NsmpModal, {
      global: {
        stubs: {
          AModal: {
            name: 'AntModal',
            emits: ['update:open'],
            template: '<button @click="$emit(\'update:open\', false)">Close</button>',
          },
        },
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })

  it('opens and closes through the exposed component methods', async () => {
    const wrapper = mount(NsmpModal, {
      props: { title: 'Create employee' },
      global: {
        stubs: {
          AModal: {
            name: 'AntModal',
            props: ['open', 'title'],
            template: '<section />',
          },
        },
      },
    })

    expect(wrapper.findComponent(AntModal).props()).toMatchObject({
      open: false,
      title: 'Create employee',
    })

    const modalApi = wrapper.vm.show()
    expect(modalApi.hidden()).toBe(modalApi)
    expect(modalApi.show()).toBe(modalApi)
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AntModal).props('open')).toBe(true)

    wrapper.vm.hidden()
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AntModal).props('open')).toBe(false)
    expect(wrapper.emitted('update:open')).toEqual([
      [true],
      [false],
      [true],
      [false],
    ])
  })
})

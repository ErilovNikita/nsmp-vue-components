import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { Code } from '@/components'

describe('Code', () => {
  it('highlights code safely and renders line numbers', () => {
    const wrapper = mount(Code, {
      props: {
        code: 'const value = "<script>"\nreturn value',
        language: 'javascript',
        lineNumbers: true,
      },
    })

    expect(wrapper.find('.hljs-keyword').text()).toBe('const')
    expect(wrapper.find('.library-code-lines').text()).toBe('1\n2')
    expect(wrapper.find('script').exists()).toBe(false)
  })

  it('copies the original code', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    const wrapper = mount(Code, { props: { code: 'const value = 1' } })

    await wrapper.find('.library-code-copy').trigger('click')

    expect(writeText).toHaveBeenCalledWith('const value = 1')
    expect(wrapper.emitted('copied')).toEqual([['const value = 1']])
  })
})

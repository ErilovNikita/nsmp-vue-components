import { afterEach, describe, expect, it, vi } from 'vitest'
import { measureColumnContentWidth } from '@/components/Table/composables/measureColumnContentWidth'

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('measureColumnContentWidth', () => {
  it('measures the widest header or body cell across split tables and removes measurement copies', () => {
    document.body.innerHTML = `<div class="ant-table-wrapper">
      <table><thead><tr><th>Название</th><th>Категория</th></tr></thead></table>
      <table><tbody><tr><td>Объект</td><td>Документ</td></tr>
        <tr><td colspan="2">Expanded</td></tr></tbody></table>
    </div>`
    const widths: Record<string, number> = { Название: 95, Категория: 100, Объект: 90, Документ: 120, Expanded: 500 }
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return { width: widths[this.textContent ?? ''] ?? 0 } as DOMRect
    })
    const headers = document.querySelectorAll('th')
    expect(measureColumnContentWidth(headers[1]!)).toBe(120)
    expect(measureColumnContentWidth(headers[0]!)).toBe(95)
    expect(document.querySelectorAll('table')).toHaveLength(2)
  })
})

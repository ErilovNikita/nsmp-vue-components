import { describe, expect, it } from 'vitest'
import { parseNsmpTheme } from '@/data'

describe('parseNsmpTheme', () => {
  it('parses an NSMP theme declaration into a typed object', () => {
    const theme = parseNsmpTheme(`
      var themeProperties = {
        "buttonHeight": "24px",
        "buttonFontWeight": "bold",
        "contentShadow": "0 4px 6px rgba(129, 146, 161, 0.2)"
      };
    `)

    expect(theme).toEqual({
      buttonHeight: '24px',
      buttonFontWeight: 'bold',
      contentShadow: '0 4px 6px rgba(129, 146, 161, 0.2)',
    })
  })

  it('rejects missing declarations and non-string values', () => {
    expect(() => parseNsmpTheme('{}')).toThrow('themeProperties')
    expect(() => parseNsmpTheme('const themeProperties = { "inputHeight": 32 }'))
      .toThrow('inputHeight')
  })
})
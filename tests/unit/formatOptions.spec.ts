import { describe, expect, it } from 'vitest'
import { formatOptions } from '@/data'

describe('formatOptions', () => {
  it('maps domain records to Ant Design option data', () => {
    expect(formatOptions([{ id: 1, name: 'Ready' }], {
      label: (item) => item.name,
      value: (item) => item.id,
    })).toEqual([{ label: 'Ready', value: 1 }])
  })
})

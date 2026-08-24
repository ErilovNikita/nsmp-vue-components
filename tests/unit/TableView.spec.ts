import { beforeEach, describe, expect, it } from 'vitest'
import {
  applyTableViewState,
  createTableViewState,
} from '@/components/Table/models'
import {
  readLocalStorage,
  removeLocalStorage,
  writeLocalStorage,
} from '@/utils'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
  { title: 'Age', dataIndex: 'age', key: 'age' },
]

describe('table view persistence', () => {
  beforeEach(() => globalThis.localStorage.clear())

  it('stores and removes typed local storage values', () => {
    expect(writeLocalStorage('table-view', { visible: true })).toBe(true)
    expect(readLocalStorage('table-view')).toEqual({ visible: true })
    expect(removeLocalStorage('table-view')).toBe(true)
    expect(readLocalStorage('table-view')).toBeNull()
  })

  it('restores column order, visibility, and width onto current definitions', () => {
    const state = createTableViewState([
      { ...columns[1], width: 180 },
      { ...columns[0], hidden: true },
    ])
    const restored = applyTableViewState(columns, state)

    expect(restored.map(column => column.key)).toEqual(['age', 'name'])
    expect(restored[0]).toMatchObject({ title: 'Age', width: 180 })
    expect(restored[1]).toMatchObject({ hidden: true, title: 'Name' })
  })

  it('keeps newly added columns that are absent from the saved view', () => {
    const state = createTableViewState([columns[0]])
    const restored = applyTableViewState(columns, state)

    expect(restored.map(column => column.key)).toEqual(['name', 'age'])
  })
})

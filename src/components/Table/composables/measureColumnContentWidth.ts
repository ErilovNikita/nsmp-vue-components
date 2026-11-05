/** Measure natural cell widths without changing the visible table's layout. */
export const measureColumnContentWidth = (header: HTMLElement): number => {
  const table = header.closest('table')
  const view = header.ownerDocument.defaultView
  if (!table || !view) return 0

  const columnIndex = Array.from(header.parentElement?.children ?? []).indexOf(header)
  const wrapper = table.closest('.ant-table-wrapper')
  // With a fixed header Ant Table renders the body in a separate table.
  const tables = wrapper
    ? Array.from(wrapper.querySelectorAll('table')).filter(item =>
      item.closest('.ant-table-wrapper') === wrapper)
    : [table]
  let width = 0

  for (const source of tables) {
    const clone = source.cloneNode(true) as HTMLTableElement
    clone.setAttribute('aria-hidden', 'true')
    clone.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;table-layout:auto;width:max-content;min-width:0;max-width:none;'
    for (const child of Array.from(clone.children)) {
      if (child.tagName === 'COLGROUP') child.remove()
    }
    for (const row of Array.from(clone.rows)) {
      for (const cell of Array.from(row.cells)) {
        cell.style.width = 'auto'
        cell.style.minWidth = '0'
        cell.style.maxWidth = 'none'
        cell.style.whiteSpace = 'nowrap'
      }
    }
    source.parentElement?.appendChild(clone)
    try {
      for (const row of Array.from(clone.rows)) {
        // Expanded rows and merged cells do not define a single column's width.
        if (Array.from(row.cells).some(cell => cell.colSpan !== 1)) continue
        const cell = row.cells[columnIndex]
        if (cell) width = Math.max(width, cell.getBoundingClientRect().width)
      }
    } finally {
      clone.remove()
    }
  }
  return Math.ceil(width)
}

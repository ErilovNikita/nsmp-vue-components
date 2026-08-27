import type { Ref } from 'vue'

const hoverClass = 'library-table-gear-hover'

export const useTableSettingsGear = (
  enabled: () => boolean,
  settingsOpen: Ref<boolean>,
  headerSelector: () => string = () => 'th.ant-table-selection-column',
  align: () => 'center' | 'left' = () => 'center',
) => {
  const findGear = (event: globalThis.MouseEvent): globalThis.HTMLElement | null => {
    if (!enabled() || !(event.target instanceof globalThis.Element)) return null
    if (event.target.closest('.library-table') !== event.currentTarget) return null
    const header = event.target.closest(headerSelector()) as globalThis.HTMLElement | null
    if (!header) return null

    const bounds = header.getBoundingClientRect()
    const gearCenterX = align() === 'left'
      ? bounds.left + 16
      : bounds.left + bounds.width / 2
    const isGear = event.clientY >= bounds.top
      && event.clientY <= bounds.top + 26
      && Math.abs(event.clientX - gearCenterX) <= 12
    return isGear ? header : null
  }

  const clearHover = (container: globalThis.HTMLElement) => container
    .querySelectorAll(`th.${hoverClass}`)
    .forEach(header => header.classList.remove(hoverClass))

  return {
    onClick: (event: globalThis.MouseEvent) => {
      if (!findGear(event)) return
      event.preventDefault()
      event.stopPropagation()
      settingsOpen.value = true
    },
    onPointerLeave: (event: globalThis.MouseEvent) => {
      clearHover(event.currentTarget as globalThis.HTMLElement)
    },
    onPointerMove: (event: globalThis.MouseEvent) => {
      clearHover(event.currentTarget as globalThis.HTMLElement)
      findGear(event)?.classList.add(hoverClass)
    },
  }
}

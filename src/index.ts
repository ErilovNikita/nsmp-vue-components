import type { App } from 'vue'
import { Alert, AttrGroup, Button, ConfigProvider, Modal, Table, Tabs } from './components'

export * from './components'
export * from './composables'
export * from './data'
export * from './tokens'
export * from './types'
// Kept in the root entry for backward compatibility.
export * from './utils/localStorage'
import './styles/index.css'

export const NsmpVueComponents = {
  install(app: App) {
    const components = { Alert, AttrGroup, Button, ConfigProvider, Modal, Table, Tabs }

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

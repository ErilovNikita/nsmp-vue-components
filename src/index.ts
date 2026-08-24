import type { App } from 'vue'
import { Alert, AttrGroup, Button, ConfigProvider, Modal, Table } from './components'

export * from './components'
export * from './composables'
export * from './data'
export * from './tokens'
export * from './types'
import './styles/index.css'

export const NsmpVueComponents = {
  install(app: App) {
    const components = { Alert, AttrGroup, Button, ConfigProvider, Modal, Table }

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

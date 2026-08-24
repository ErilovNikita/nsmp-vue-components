import type { App } from 'vue'
import { NsmpButton, NsmpConfigProvider } from './components'

export * from './components'
export * from './composables'
export * from './data'
export * from './tokens'
export * from './types'
import './styles/index.css'

export const NsmpVueComponents = {
  install(app: App) {
    app.component('NsmpButton', NsmpButton)
    app.component('NsmpConfigProvider', NsmpConfigProvider)
  },
}

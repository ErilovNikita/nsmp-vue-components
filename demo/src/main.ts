import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import '../../src/styles/index.css'
import './style.css'

createApp(App)
  .use(Antd)
  .mount('#app')

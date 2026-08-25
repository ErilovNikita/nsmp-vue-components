# nsmp-vue-components

[![Tests](https://github.com/ErilovNikita/nsmp-vue-components/actions/workflows/tests.yml/badge.svg?branch=dev)](https://github.com/ErilovNikita/nsmp-vue-components/actions/workflows/tests.yml) [![npm version](https://img.shields.io/npm/v/%40minitwiks%2Fnsmp-vue-components.svg)](https://www.npmjs.com/package/@minitwiks/nsmp-vue-components) [![npm downloads](https://img.shields.io/npm/dm/%40minitwiks%2Fnsmp-vue-components.svg)](https://www.npmjs.com/package/@minitwiks/nsmp-vue-components) [![License: MIT](https://img.shields.io/github/license/ErilovNikita/nsmp-vue-components.svg)](LICENSE)

Библиотека Vue 3-компонентов для встроенных приложений NSMP, построенная на базе [Ant Design Vue](https://github.com/vueComponent/ant-design-vue).

- [Документация](https://erilovnikita.github.io/nsmp-vue-components/)
- [Демо](https://erilovnikita.github.io/nsmp-vue-components/demo/)

## Установка
```bash
npm install @minitwiks/nsmp-vue-components ant-design-vue
```

## Подключение
```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { NsmpVueComponents } from '@minitwiks/nsmp-vue-components'

import '@minitwiks/nsmp-vue-components/style.css'

createApp(App)
  .use(Antd)
  .use(NsmpVueComponents)
  .mount('#app')
```

Описание компонентов, API и интерактивные примеры находятся в [документации](https://erilovnikita.github.io/nsmp-vue-components/).

## Лицензия
[MIT](LICENSE)

# nsmp-vue-components

Стилизованные Vue-компоненты для встроенных приложений NSMP. Библиотека базируется на [`ant-design-vue`](https://github.com/vueComponent/ant-design-vue), сохраняя её проверенные временем базовые элементы и дополняя их токенами в стилистике NSMP, настройками по умолчанию и вспомогательными инструментами для работы с данными.

## Установка

```bash
npm install @minitwiks/nsmp-vue-components ant-design-vue
```

## Использование
```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { NsmpVueComponents } from '@minitwiks/nsmp-vue-components'

import 'ant-design-vue/dist/reset.css'
import '@minitwiks/nsmp-vue-components/style.css'

createApp(App)
  .use(Antd)
  .use(NsmpVueComponents)
  .mount('#app')
```

## Использование готового NSMP ThemeProvider
`NsmpConfigProvider` — это стилизованная обертка над компонентом `ConfigProvider` из библиотеки Ant Design Vue. По умолчанию он использует тему `naumen`, поэтому приложению больше не нужно импортировать и подключать тему вручную:

```vue
<script setup lang="ts">
import { NsmpConfigProvider } from '@minitwiks/nsmp-vue-components'
</script>

<template>
  <NsmpConfigProvider>
    <AppContent />
  </NsmpConfigProvider>
</template>
```

Провайдер так же принимает стандартные свойства конфигурации Ant Design Vue и поддерживает локальную переопределяемую тему:

```vue
<NsmpConfigProvider :theme="customTheme">
  <AppContent />
</NsmpConfigProvider>
```

Тема по умолчанию также доступна под именем `naumen` в пакете `@minitwiks/nsmp-vue-components`.

Для использования механизма tree-shaking импортируйте компоненты напрямую:

```vue
<script setup lang="ts">
import { NsmpButton } from '@minitwiks/nsmp-vue-components'
</script>

<template>
  <NsmpButton variant="primary">Cancel</NsmpButton>
</template>
```
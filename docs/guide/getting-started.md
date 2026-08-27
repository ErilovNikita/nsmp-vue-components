# Начало работы

## Требования

- Vue `3.4` или новее;
- Ant Design Vue `4.2.6` или новее.

## Установка

```bash
npm install @minitwiks/nsmp-vue-components ant-design-vue
```

## Подключение всей библиотеки

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { NsmpVueComponents } from '@minitwiks/nsmp-vue-components'
import '@minitwiks/nsmp-vue-components/style.css'

const app = createApp(App)
app.use(Antd)
app.use(NsmpVueComponents)
app.mount('#app')
```

## Отдельные импорты

::: warning Важно
Не забудьте обернуть корневой компонент приложения в [`ConfigProvider`](/components/config-provider), чтобы применить тему NSMP ко всем вложенным компонентам. Получение и подключение темы описаны в руководстве [«Темизация»](/guide/theming).
:::

Для tree-shaking импортируйте только нужные компоненты:

```vue
<script setup lang="ts">
import { Button, ConfigProvider } from '@minitwiks/nsmp-vue-components'
import '@minitwiks/nsmp-vue-components/style.css'
</script>

<template>
  <ConfigProvider>
    <Button type="primary">Сохранить</Button>
  </ConfigProvider>
</template>
```
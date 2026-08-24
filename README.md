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

import '@minitwiks/nsmp-vue-components/style.css'

createApp(App)
  .use(Antd)
  .use(NsmpVueComponents)
  .mount('#app')
```

## Использование готового NSMP ThemeProvider
`ConfigProvider` — это стилизованная обертка над одноимённым компонентом из библиотеки Ant Design Vue. По умолчанию он использует тему `naumen`, поэтому приложению больше не нужно импортировать и подключать тему вручную:

```vue
<script setup lang="ts">
import { ConfigProvider } from '@minitwiks/nsmp-vue-components'
</script>

<template>
  <ConfigProvider>
    <AppContent />
  </ConfigProvider>
</template>
```

Провайдер так же принимает стандартные свойства конфигурации Ant Design Vue и поддерживает локальную переопределяемую тему:

```vue
<ConfigProvider :theme="customTheme">
  <AppContent />
</ConfigProvider>
```

Тема по умолчанию также доступна под именем `naumen` в пакете `@minitwiks/nsmp-vue-components`.

Для использования механизма tree-shaking импортируйте компоненты напрямую:

```vue
<script setup lang="ts">
import { Button } from '@minitwiks/nsmp-vue-components'
</script>

<template>
  <Button type="primary">Cancel</Button>
</template>
```

### Modal

`Modal` сохраняет зоны `alert`, `form` и `footer` из старого шаблона. Методы
`show()` и `hidden()` теперь находятся непосредственно в компоненте и доступны
через template ref. Также поддерживается стандартный биндинг `v-model:open` и
все свойства `Modal` из Ant Design Vue.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@minitwiks/nsmp-vue-components'

const modal = ref<InstanceType<typeof Modal>>()
</script>

<template>
  <button @click="modal?.show()">Открыть</button>

  <Modal ref="modal" title="Редактировать сотрудника">
    <template #alert>Предупреждение</template>
    <template #form>Содержимое формы</template>
    <template #footer>
      <button @click="modal?.hidden()">Закрыть</button>
    </template>
  </Modal>
</template>
```

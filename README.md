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
  <NsmpButton type="primary">Cancel</NsmpButton>
</template>
```

### Modal

`NsmpModal` сохраняет зоны `alert`, `form` и `footer` из старого шаблона. Методы
`show()` и `hidden()` теперь находятся непосредственно в компоненте и доступны
через template ref. Также поддерживается стандартный биндинг `v-model:open` и
все свойства `Modal` из Ant Design Vue.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NsmpModal } from '@minitwiks/nsmp-vue-components'

const modal = ref<InstanceType<typeof NsmpModal>>()
</script>

<template>
  <button @click="modal?.show()">Открыть</button>

  <NsmpModal ref="modal" title="Редактировать сотрудника">
    <template #alert>Предупреждение</template>
    <template #form>Содержимое формы</template>
    <template #footer>
      <button @click="modal?.hidden()">Закрыть</button>
    </template>
  </NsmpModal>
</template>
```

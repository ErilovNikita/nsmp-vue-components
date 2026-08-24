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

### Alert

`Alert` переносит поведение старого `AlertController` внутрь компонента. Методы
`show()`, `hidden()`, `setMessage()`, `clear()` и `setType()` доступны через
template ref и поддерживают цепочки вызовов.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@minitwiks/nsmp-vue-components'

const alert = ref<InstanceType<typeof Alert>>()

const notify = () => {
  alert.value?.setType('success').setMessage('Данные сохранены')
}
</script>

<template>
  <button @click="notify">Показать уведомление</button>

  <Alert ref="alert">
    <template #action>
      <button @click="alert?.hidden()">Закрыть</button>
    </template>
  </Alert>
</template>
```

Компонент также поддерживает декларативное управление через `v-model:open`,
props `message`, `type`, `closable`, `showIcon` и остальные свойства Alert из
Ant Design Vue.

### AttrGroup

`AttrGroup` выводит значения объекта в раскрывающейся группе. Методы старого
контроллера `open()` и `close()` встроены в компонент и доступны через template
ref. Состояния `show` и `activeKey` также доступны через экземпляр компонента.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AttrGroup } from '@minitwiks/nsmp-vue-components'

const group = ref<InstanceType<typeof AttrGroup>>()
const employee = { name: 'Nikita', age: 30 }
const items: Array<[string, string]> = [
  ['Имя', 'name'],
  ['Возраст', 'age'],
]
</script>

<template>
  <button @click="group?.open()">Развернуть</button>
  <button @click="group?.close()">Свернуть</button>

  <AttrGroup
    ref="group"
    title="Основные данные"
    :items="items"
    :values="employee"
  />
</template>
```

Для первоначально раскрытой группы можно передать prop `open`. Слоты `start` и
`end` добавляют произвольное содержимое до и после автоматически сформированных
строк.

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

# nsmp-vue-components

[![Tests](https://github.com/ErilovNikita/nsmp-vue-components/actions/workflows/tests.yml/badge.svg?branch=dev)](https://github.com/ErilovNikita/nsmp-vue-components/actions/workflows/tests.yml) [![npm version](https://img.shields.io/npm/v/%40minitwiks%2Fnsmp-vue-components.svg)](https://www.npmjs.com/package/@minitwiks/nsmp-vue-components) [![npm downloads](https://img.shields.io/npm/dm/%40minitwiks%2Fnsmp-vue-components.svg)](https://www.npmjs.com/package/@minitwiks/nsmp-vue-components) [![License: MIT](https://img.shields.io/github/license/ErilovNikita/nsmp-vue-components.svg)](LICENSE)

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

### Notification

Для разовых уведомлений используйте `openNotification`. По умолчанию уведомление
появляется справа сверху, закрывается через 4,5 секунды и показывает кнопку
закрытия.

```ts
import { h } from 'vue'
import { Button } from '@minitwiks/nsmp-vue-components'
import { openNotification } from '@minitwiks/nsmp-vue-components/utils'

const notice = openNotification({
  title: 'Данные сохранены',
  description: 'Изменения успешно применены',
  type: 'success',
  placement: 'topRight',
  duration: 8,
  autoClose: true,
  closable: true,
  expandedByDefault: false,
  action: () => h(Button, { onClick: () => notice.close() }, () => 'Закрыть'),
})
```

По умолчанию виден только заголовок. Левая кнопка со стрелкой раскрывает описание
и дополнительные действия. Чтобы сразу показать полное содержимое, передайте
`expandedByDefault: true`.

Параметр `type` задаёт цвет рамки и левой панели: `success` — зелёный,
`error` — красный, `warning` — жёлтый, `info` — синий. Если тип не указан,
используется `info`.

`action` принимает текст, VNode или render-функцию, поэтому в дополнительной
области можно разместить одну или несколько кнопок либо любой Vue-компонент.
Если указать `autoClose: false`, уведомление останется открытым независимо от
`duration`. Метод возвращает `key` и `close()`. Для внешнего управления также
экспортируются `closeNotification(key)` и `destroyNotifications()`.

#### HTML-разметка в описании

Для создания разметки используйте Vue-функцию `h`. Такой вариант не требует
`v-html` и подходит для ссылок, форматированного текста и обработчиков событий:

```ts
import { h } from 'vue'
import { openNotification } from '@minitwiks/nsmp-vue-components/utils'

openNotification({
  title: 'Назначен новый исполнитель',
  description: () => h('div', [
    h('strong', 'Исполнитель: '),
    h('span', 'Иван Иванов'),
    h('br'),
    h('a', { href: '/tasks/123' }, 'Открыть задачу'),
  ]),
})
```

Если разметка уже получена в виде HTML-строки, её можно передать через
`innerHTML`:

```ts
openNotification({
  title: 'Информация о задаче',
  description: () => h('div', {
    innerHTML: '<strong>Статус:</strong> ожидает выполнения',
  }),
})
```

Используйте `innerHTML` только для доверенной или предварительно очищенной
разметки. Непроверенный пользовательский HTML может привести к XSS-уязвимости.

#### Vue-компонент в описании

Готовый компонент передаётся через render-функцию. Ему можно передавать props и
подписываться на события обычным способом:

```ts
import { h } from 'vue'
import TaskNotificationDetails from './TaskNotificationDetails.vue'
import { openNotification } from '@minitwiks/nsmp-vue-components/utils'

openNotification({
  title: 'Задача изменена',
  description: () => h(TaskNotificationDetails, {
    taskId: 123,
    onOpen: () => console.log('Задача открыта'),
  }),
  expandedByDefault: true,
})
```

Дополнительно доступны `key` (повторный ключ обновляет уведомление), `icon`,
`class`, `style`, `onClick`, `onClose` и `getContainer`.

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

### Table

`Table` — визуальная обёртка над таблицей Ant Design Vue. Компонент не
загружает данные, не обращается к API и не хранит кэш: готовые строки и колонки
передаются через props.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@minitwiks/nsmp-vue-components'

const columns = [
  { title: 'Имя', dataIndex: 'name', key: 'name' },
  { title: 'Возраст', dataIndex: 'age', key: 'age' },
]

const employees = [
  { key: 1, name: 'Nikita', age: 30 },
  { key: 2, name: 'Anna', age: 27 },
]

const selectedEmployees = ref<typeof employees>([])
</script>

<template>
  <Table
    v-model:selected-objects="selectedEmployees"
    title="Сотрудники"
    :columns="columns"
    :data-source="employees"
  >
    <template #start>
      <Button type="primary">Добавить</Button>
    </template>
  </Table>
</template>
```

По умолчанию используется локальная пагинация по 20 строк с выбором размера
страницы. Её можно настроить через `pagination` или отключить с помощью
`:pagination="false"`. Компонент также принимает `loading`, `rowSelection`,
`rowKey`, `scroll`, `size`, `bordered` и другие визуальные параметры таблицы.

Стандартный footer пагинации содержит номера страниц, общее количество объектов
и выбор количества строк на странице. Кнопки «< Предыдущая» и «Следующая >»
отображаются только тогда, когда переход в соответствующую сторону доступен.
Любые функции и подписи можно переопределить через объект `pagination`.

Checkbox выбора отображается в каждой строке по умолчанию. Массив
`selectedEmployees` содержит полные выбранные объекты со всеми их атрибутами.
Выбор строк можно отключить через `:selectable="false"`.

Ширину колонок можно менять перетягиванием разделителя в заголовке. Обновлённые
значения `width` доступны через `v-model:columns`:

```vue
<Table
  v-model:columns="columns"
  :data-source="employees"
/>
```

Минимальная ширина по умолчанию составляет `70px` и настраивается через
`minColumnWidth`. Изменение ширины можно отключить для всей таблицы с помощью
`:resizable-columns="false"` или для конкретной колонки через
`resizable: false` в её конфигурации.

Таблица использует фиксированную раскладку колонок. Текст, который не помещается
в заданную ширину, обрезается многоточием и не выходит за границы ячейки.
Разделитель изменяет ширину двух соседних колонок: одна расширяется, другая
сужается на такое же значение. Поэтому общая ширина таблицы не выходит за
границы контейнера, а последняя колонка не может стать уже минимальной ширины.
Внешняя правая граница последней колонки не перетаскивается.

Клик по заголовку колонки отправляет событие `columnClick` с ключом колонки:

```vue
<Table
  :columns="columns"
  :data-source="employees"
  @column-click="columnKey => console.log(columnKey)"
/>
```

В качестве значения используется `column.key`, затем `dataIndex`, а если оба
поля не заданы — числовой индекс колонки.

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

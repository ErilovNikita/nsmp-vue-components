<script setup lang="ts">
import { ref } from 'vue'
import { openNotification } from '../../src/utils'

const type = ref<'success' | 'info' | 'warning' | 'error'>('info')
const typeOptions = [
  { label: 'Info', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
]

const notify = () => openNotification({
  title: `Уведомление: ${type.value}`,
  description: 'Это уведомление использует выбранный тип оформления.',
  type: type.value,
  expandedByDefault: false,
})
</script>

# Уведомления

`openNotification` создаёт уведомление в стиле NSMP и возвращает контроллер для ручного закрытия.

::: tip Связанный компонент
Для сообщения, которое должно оставаться частью разметки страницы, используйте компонент [`Alert`](/components/alert). `openNotification` подходит для всплывающих уведомлений поверх интерфейса.
:::

<div class="demo">
  <FormSelect
    v-model:value="type"
    label="Тип уведомления"
    :options="typeOptions"
    :select-props="{ id: 'notification-type', 'aria-label': 'Тип уведомления' }"
    style="margin-bottom: 20px;"
  />
  <Button type="primary" @click="notify">Показать уведомление</Button>
</div>

```ts
import { openNotification } from '@minitwiks/nsmp-vue-components/utils'

const type = 'success'

const notice = openNotification({
  title: 'Изменения сохранены',
  description: 'Новая версия данных успешно опубликована.',
  type,
  expandedByDefault: true,
})

notice.close()
```

## Параметры

| Параметр | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `title` | `NotificationContent` | Обязательный | Заголовок уведомления. Принимает текст, VNode или render-функцию. |
| `description` | `NotificationContent` | — | Основное содержимое уведомления. Отображается в раскрытой области. |
| `action` | `NotificationContent` | — | Дополнительное содержимое под описанием, например одна или несколько кнопок. |
| `type` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | Цветовая схема уведомления. |
| `placement` | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` | Положение уведомления относительно окна браузера. |
| `duration` | `number` | `4.5` | Время до автоматического закрытия в секундах. Используется, только если `autoClose` включён. |
| `autoClose` | `boolean` | `true` | Автоматически закрывать уведомление после `duration`. Если передать `false`, уведомление останется открытым. |
| `closable` | `boolean` | `true` | Показывать кнопку ручного закрытия. Не влияет на автоматическое закрытие. |
| `expandedByDefault` | `boolean` | `false` | Сразу показывать `description` и `action`. Если значение `false`, содержимое раскрывается кнопкой со стрелкой. |
| `key` | `string` | Генерируется автоматически | Стабильный идентификатор уведомления. Повторное использование ключа обновляет уже открытое уведомление. |
| `icon` | `NotificationContent` | — | Пользовательская иконка рядом с заголовком. |
| `class` | `string` | — | Дополнительный CSS-класс корневого элемента уведомления. |
| `style` | `CSSProperties` | — | Инлайновые стили корневого элемента уведомления. |
| `onClick` | `() => void` | — | Обработчик клика по уведомлению. |
| `onClose` | `() => void` | — | Вызывается после закрытия уведомления любым способом. |
| `getContainer` | `() => HTMLElement` | `document.body` | Возвращает DOM-контейнер, в котором будет создано уведомление. |

`NotificationContent` соответствует содержимому Ant Design Vue и позволяет передавать строку, VNode либо функцию, возвращающую содержимое.

## Возвращаемое значение

`openNotification()` возвращает объект `NotificationController`:

| Поле | Тип | Описание |
| --- | --- | --- |
| `key` | `string` | Фактический ключ созданного или обновлённого уведомления. |
| `close` | `() => void` | Закрывает это уведомление. |

```ts
const notification = openNotification({ title: 'Готово' })

console.log(notification.key)
notification.close()
```

## Глобальное управление

Для глобального управления экспортируются `closeNotification(key)` и `destroyNotifications()`.

```ts
import {
  closeNotification,
  destroyNotifications,
} from '@minitwiks/nsmp-vue-components/utils'

closeNotification('notification-key')
destroyNotifications()
```

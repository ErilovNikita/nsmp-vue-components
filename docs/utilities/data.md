# Данные и тема

## formatOptions

Преобразует произвольный массив в опции для Select-подобных компонентов.

```ts
import { formatOptions } from '@minitwiks/nsmp-vue-components'

const options = formatOptions(users, {
  label: user => user.name,
  value: user => user.id,
  disabled: user => !user.active,
})
```

## parseNsmpTheme

Извлекает JSON-объект `themeProperties` из скрипта темы NSMP и проверяет, что все значения являются строками.

```ts
import { parseNsmpTheme } from '@minitwiks/nsmp-vue-components/utils'

const theme = parseNsmpTheme(`
  const themeProperties = {
    "accentColor": "#0063b0",
    "inputRadius": "2px"
  }
`)
```

Функция выбрасывает понятную ошибку, если декларация отсутствует, объект не закрыт, JSON некорректен или содержит нестроковые значения.

::: tip Использование с темами
Как получить тему текущего пользователя, загрузить её из NSMP и передать результат `parseNsmpTheme()` в `ConfigProvider`, описано в руководстве [«Темизация»](/guide/theming).
:::

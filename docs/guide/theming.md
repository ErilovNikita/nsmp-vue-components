# Темизация

`ConfigProvider` применяет встроенную тему `blue` по умолчанию. Можно передать стандартный объект `theme` Ant Design Vue или исходные свойства темы NSMP через `nsmpTheme`.

::: info Откуда берётся `nsmpTheme`
Тему не нужно дублировать в коде приложения. Её можно загрузить непосредственно из того инстанса NSMP, внутри которого работает приложение:

```text
GET /sd/jspresource?id=common&method=theme&theme=<THEME_NAME>
```

Вместо `<THEME NAME>` передаётся имя требуемой темы. Ручка является публичной частью NSMP, но не анонимной: запрос должен выполняться с авторизацией пользователя в целевом инстансе.

NSMP возвращает исходный текст темы с объявлением `themeProperties`. Метод `parseNsmpTheme()` извлекает этот объект, проверяет его структуру и возвращает готовый `nsmpTheme`. Затем `ConfigProvider` преобразует свойства NSMP в токены Ant Design Vue и применяет их ко всем вложенным компонентам.

Полный список доступных переменных приведён в [документации по ключам темы NSMP](https://www.naumen.ru/docs/sd/nsmp/Content/setting_user/interface_theme_template.htm?Highlight=темы).
:::

## Подключение темы NSMP

```vue
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { ConfigProvider } from '@minitwiks/nsmp-vue-components'
import {
  parseNsmpTheme,
  type NsmpThemeProperties,
} from '@minitwiks/nsmp-vue-components/utils'

const props = defineProps<{
  themeName: string
}>()

const nsmpTheme = shallowRef<NsmpThemeProperties>()

onMounted(async () => {
  const responseText = ...
  nsmpTheme.value = parseNsmpTheme(await responseText)
})
</script>

<template>
  <ConfigProvider :nsmp-theme="nsmpTheme">
    <RouterView />
  </ConfigProvider>
</template>
```

## Готовая тема

```ts
import { blue } from '@minitwiks/nsmp-vue-components'
```

Переданные через `theme` токены имеют приоритет над встроенной темой и преобразованными свойствами `nsmpTheme`.

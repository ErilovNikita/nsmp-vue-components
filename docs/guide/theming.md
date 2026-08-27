# Темизация

::: tip Компоненты
Все описанные на этой странице способы темизации используются вместе с компонентом [`ConfigProvider`](/components/config-provider), который преобразует настройки темы и применяет их к вложенным компонентам.
:::

`ConfigProvider` применяет встроенную тему `blue` по умолчанию. Можно передать стандартный объект `theme` Ant Design Vue или исходные свойства темы NSMP через `nsmpTheme`.

## Получение кода темы текущего пользователя

Код темы, выбранной текущим пользователем, можно получить только внутри модуля NSMP:

```groovy
import ru.naumen.core.server.script.api.metainfo.PersonalSettingsWrapper

/** Объект персональных настроек для текущего пользователя */
PersonalSettingsWrapper settings = api.employee.getPersonalSettings(user.UUID)
/** Код темы в интерфейсе оператора (`blue`, `site` и другие) */
String theme = settings.getThemeOperator()
```

Полученное значение `theme` можно подставить в параметр `theme` запроса к `/sd/jspresource`.

## Загрузка темы из инсталяции

Тему не нужно дублировать в коде приложения. Её можно загрузить непосредственно из того инстанса NSMP, внутри которого работает приложение:

```text
GET /sd/jspresource?id=common&method=theme&theme=<THEME_NAME>
```

Вместо `<THEME_NAME>` передаётся код требуемой темы. Ручка является публичной частью NSMP, но не анонимной: запрос должен выполняться с авторизацией пользователя в целевом инстансе.

NSMP возвращает исходный текст темы с объявлением `themeProperties`. Метод `parseNsmpTheme()` извлекает этот объект, проверяет его структуру и возвращает готовый `nsmpTheme`.

Полный список доступных переменных приведён в [документации по ключам темы NSMP](https://www.naumen.ru/docs/sd/nsmp/Content/setting_user/interface_theme_template.htm?Highlight=темы).

## Подключение темы

Передайте результат `parseNsmpTheme()` в `ConfigProvider`. Провайдер преобразует свойства NSMP в токены Ant Design Vue и применит их ко всем вложенным компонентам.

```vue
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { ConfigProvider } from '@minitwiks/nsmp-vue-components'
import { parseNsmpTheme } from '@minitwiks/nsmp-vue-components/utils'
import type { NsmpThemeProperties } from '@minitwiks/nsmp-vue-components/utils'

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

## Использование готовой темы

```ts
import { blue } from '@minitwiks/nsmp-vue-components'
```

Если загружать тему из NSMP не требуется, используйте встроенную тему `blue`. Она содержит исходные свойства основной темы NSMP. Токены Ant Design Vue не дублируются в репозитории: `ConfigProvider` рассчитывает их из `blue` тем же способом, что и для темы, полученной через `parseNsmpTheme()`.

Переданные через `theme` токены имеют приоритет над встроенной темой и преобразованными свойствами `nsmpTheme`.

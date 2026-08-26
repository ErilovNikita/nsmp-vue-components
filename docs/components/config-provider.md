# ConfigProvider

Корневой провайдер темы NSMP поверх `ConfigProvider` из Ant Design Vue. По умолчанию включает русскую локаль для всех вложенных компонентов Ant Design Vue, включая календарь, таблицы, пагинацию и модальные окна.

::: info Основа компонента
Компонент построен на [ConfigProvider из Ant Design Vue](https://antdv.com/components/config-provider).
:::

```vue
<script setup lang="ts">
import { ConfigProvider } from '@minitwiks/nsmp-vue-components'
</script>

<template>
  <ConfigProvider>
    <App />
  </ConfigProvider>
</template>
```

## Props

| Prop | Тип | Описание |
| --- | --- | --- |
| `theme` | `ThemeConfig` | Стандартные токены Ant Design Vue |
| `nsmpTheme` | `Record<string, string>` | Свойства темы, полученные от NSMP |
| `locale` | `Locale` | Локаль Ant Design Vue. По умолчанию используется `ru_RU`; переданное значение имеет приоритет. |

Остальные свойства напрямую передаются в Ant Design Vue. Подробнее о приоритетах токенов — в разделе [«Темизация»](/guide/theming).

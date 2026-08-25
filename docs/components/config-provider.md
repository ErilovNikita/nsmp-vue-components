# ConfigProvider

Корневой провайдер темы NSMP поверх `ConfigProvider` из Ant Design Vue.

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

Остальные свойства напрямую передаются в Ant Design Vue. Подробнее о приоритетах токенов — в разделе [«Темизация»](/guide/theming).

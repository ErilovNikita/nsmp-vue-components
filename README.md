# @minitwiks/nsmp-vue-components

Styled Vue components for NSMP embedded applications. The library builds on [`ant-design-vue`](https://github.com/vueComponent/ant-design-vue), keeping its mature primitives while adding NSMP tokens, defaults, and data helpers.

## Install

```bash
npm install @minitwiks/nsmp-vue-components ant-design-vue
```

## Use the plugin

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { NsmpVueComponents } from '@minitwiks/nsmp-vue-components'
import 'ant-design-vue/dist/reset.css'
import '@minitwiks/nsmp-vue-components/style.css'

createApp(App)
  .use(Antd)
  .use(NsmpVueComponents)
  .mount('#app')
```

## Use the NSMP theme provider

`NsmpConfigProvider` is a styled wrapper around Ant Design Vue's `ConfigProvider`. It uses the `naumen` theme by default, so the application no longer needs to import and wire the theme manually:

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

The provider accepts the regular Ant Design Vue config props and supports a local theme override:

```vue
<NsmpConfigProvider :theme="customTheme">
  <AppContent />
</NsmpConfigProvider>
```

The default theme is also available as `naumen` from `@minitwiks/nsmp-vue-components`.

For tree-shaking, import components directly:

```vue
<script setup lang="ts">
import { NsmpButton } from '@minitwiks/nsmp-vue-components'
</script>

<template>
  <NsmpButton variant="secondary">Cancel</NsmpButton>
</template>
```

## Data helpers

```ts
import { formatOptions } from '@minitwiks/nsmp-vue-components'

const options = formatOptions(users, {
  label: (user) => user.displayName,
  value: (user) => user.id,
  disabled: (user) => user.status === 'archived',
})
```

## Development

```bash
npm install
npm run test
npm run build
npm run lint
```

See [docs/architecture.md](docs/architecture.md) for ownership boundaries and rules for extending the library.

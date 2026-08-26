<script setup lang="ts">
import { ConfigProvider as AntConfigProvider, Layout as AntLayout } from 'ant-design-vue'
import ruRU from 'ant-design-vue/lib/locale/ru_RU'
import { computed } from 'vue'
import 'dayjs/locale/ru'
import { provideDefaultButtonTokens } from './context'
import { createProviderTheme } from './theme'
import type { ConfigProviderProps } from './types'

defineOptions({ name: 'LibraryConfigProvider' })

const props = defineProps<ConfigProviderProps>()
const AntLayoutContent = AntLayout.Content

provideDefaultButtonTokens(() => props.nsmpTheme)

const providerProps = computed(() => {
  const { nsmpTheme, theme, ...rest } = props

  return {
    ...rest,
    locale: rest.locale ?? ruRU,
    theme: createProviderTheme(nsmpTheme, theme),
  }
})
</script>

<template>
  <AntConfigProvider v-bind="providerProps">
    <AntLayout>
      <AntLayoutContent>
        <slot />
      </AntLayoutContent>
    </AntLayout>
  </AntConfigProvider>
</template>

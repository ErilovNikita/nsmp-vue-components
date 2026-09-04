<script setup lang="ts">
import { ConfigProvider as AntConfigProvider, Layout as AntLayout } from 'ant-design-vue'
import ruRU from 'ant-design-vue/lib/locale/ru_RU'
import { computed, ref } from 'vue'
import 'dayjs/locale/ru'
import { provideDefaultButtonTokens } from './context'
import { createProviderTheme } from './theme'
import ThemeStyles from './ThemeStyles.vue'
import type { ConfigProviderProps } from './types'

defineOptions({ name: 'LibraryConfigProvider' })

const props = defineProps<ConfigProviderProps>()
const AntLayoutContent = AntLayout.Content
const themeStyles = ref<{ root?: globalThis.HTMLElement }>()

provideDefaultButtonTokens(() => props.nsmpTheme)

const providerProps = computed(() => {
  const { compact, nsmpTheme, theme, ...rest } = props

  return {
    ...rest,
    getPopupContainer: rest.getPopupContainer ?? (() => themeStyles.value?.root ?? globalThis.document.body),
    locale: rest.locale ?? ruRU,
    theme: createProviderTheme(nsmpTheme, theme),
  }
})
</script>

<template>
  <AntConfigProvider v-bind="providerProps">
    <ThemeStyles ref="themeStyles" :compact="compact">
      <AntLayout>
        <AntLayoutContent>
          <slot />
        </AntLayoutContent>
      </AntLayout>
    </ThemeStyles>
  </AntConfigProvider>
</template>

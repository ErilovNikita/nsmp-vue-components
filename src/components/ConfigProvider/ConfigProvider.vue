<script setup lang="ts">
import { ConfigProvider as AntConfigProvider } from 'ant-design-vue'
import { naumen } from '@/tokens'
import type { NsmpConfigProviderProps } from './types'

defineOptions({ name: 'NsmpConfigProvider' })

const props = withDefaults(defineProps<NsmpConfigProviderProps>(), {
  theme: () => naumen,
})
</script>

<template>
  <AntConfigProvider v-bind="props">
    <slot />
  </AntConfigProvider>
</template>

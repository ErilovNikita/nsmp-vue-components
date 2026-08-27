<script setup lang="ts">
import { TypographyTitle as AntTypographyTitle } from 'ant-design-vue'
import type { CaptionProps } from './types'

defineOptions({ name: 'LibraryCaption' })

withDefaults(defineProps<CaptionProps>(), {
  level: 4,
})
</script>

<template>
  <AntTypographyTitle class="library-caption-title" :level="level">
    {{ label }}
  </AntTypographyTitle>
  <slot />
</template>

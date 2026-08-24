<script setup lang="ts">
import { Button as AntButton } from 'ant-design-vue'
import type { NsmpButtonProps } from './types'

defineOptions({ name: 'NsmpButton' })

withDefaults(defineProps<NsmpButtonProps>(), {
  variant: 'default',
})
</script>

<template>
  <AntButton
    v-bind="$attrs"
    :type="variant ?? 'default'"
  >
    <component class="btn-icon" v-if="icon" :is="icon" />
    <slot />
  </AntButton>
</template>

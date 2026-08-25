<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { ConfigProvider } from '../../../src'

const { Layout } = DefaultTheme
</script>

<template>
  <ConfigProvider>
    <Layout />
  </ConfigProvider>
</template>

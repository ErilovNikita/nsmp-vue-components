<script setup lang="ts">
import { reactive } from 'vue'
import { Button, Caption, Form, FormSelect } from '../../../src'
import { parseNsmpTheme } from '../../../src/utils'
import type { NsmpThemeProperties } from '../../../src/utils'
import * as themeSources from '../themes'

const emit = defineEmits<{ apply: [theme: NsmpThemeProperties | undefined] }>()
const options = [
  { label: 'Blue', value: 'blue' },
  ...Object.keys(themeSources).map(name => ({
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: name,
  })),
]
const settings = reactive({ theme: 'blue' })
const apply = () => {
  if (settings.theme === 'blue') {
    emit('apply', undefined)
    return
  }

  const source = themeSources[settings.theme as keyof typeof themeSources]
  if (source) emit('apply', parseNsmpTheme(source))
}
</script>

<template>
  <Form :model="settings" class="settings-form">
    <Caption label="Оформление демо">
      <FormSelect v-model:value="settings.theme" label="Тема" name="theme" placeholder="Выберите тему" :options="options" />
    </Caption>
    <div class="actions"><Button type="primary" @click="apply">Применить</Button></div>
  </Form>
</template>

<style scoped>.settings-form { max-width: 480px; } .actions { margin-top: 40px; }</style>

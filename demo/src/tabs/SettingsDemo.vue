<script setup lang="ts">
import { reactive } from 'vue'
import { Button, Caption, Form, FormSelect } from '../../../src'
import { parseNsmpTheme } from '../../../src/utils'
import type { NsmpThemeProperties } from '../../../src/utils'
import * as themeSources from '../themes'

const emit = defineEmits<{ apply: [
  theme: NsmpThemeProperties | undefined,
  compact: boolean
] }>()
const themesOptions = [
  { label: 'Blue', value: 'blue' },
  ...Object.keys(themeSources).map(name => ({
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: name,
  })),
]
const compactOption = [
  { label: 'Обычный', value: 0 },
  { label: 'Компактный', value: 1 },
]
const settings = reactive({ theme: 'blue', compact: 0 })
const apply = () => {
  if (settings.theme === 'blue') {
    emit('apply', undefined, Number(settings.compact) === 1)
    return
  }

  const source = themeSources[settings.theme as keyof typeof themeSources]
  if (source) emit('apply', parseNsmpTheme(source), Number(settings.compact) === 1)
}
</script>

<template>
  <Form :model="settings" class="settings-form">
    <Caption label="Тема для интерфейса отображения">
      <FormSelect name="theme" placeholder="Выберите тему" :options="themesOptions" />
    </Caption>

    <Caption label="Вид интерфейса">
      <FormSelect
        v-model:value="settings.compact"
        name="compact"
        view="radio"
        :options="compactOption"
      />
    </Caption>
    <div class="actions"><Button type="primary" @click="apply">Применить</Button></div>
  </Form>
</template>

<style scoped>.settings-form { max-width: 480px; } .actions { margin-top: 40px; }</style>

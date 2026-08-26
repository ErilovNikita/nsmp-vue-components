<script setup lang="ts">
import { computed } from 'vue'
import { Button, Table } from '../../../src'
import type { TableColumn } from '../../../src'
import type { DemoObject } from '../types'

const props = defineProps<{ columns: TableColumn[]; objects: DemoObject[]; selectedObjects: DemoObject[] }>()
const emit = defineEmits<{
  regenerate: []
  'update:columns': [columns: TableColumn[]]
  'update:selectedObjects': [objects: DemoObject[]]
}>()
const columnsModel = computed({ get: () => props.columns, set: value => emit('update:columns', value) })
const selection = computed({ get: () => props.selectedObjects, set: value => emit('update:selectedObjects', value) })
</script>

<template>
  <Table v-model:columns="columnsModel" v-model:selected-objects="selection" :data-source="objects" :min-column-width="80" :pagination="{ showSizeChanger: true }" row-key="id" title="Случайные объекты" view-storage-key="demo-objects-table">
    <template #start>
      <Button type="default" @click="emit('regenerate')">Сгенерировать заново</Button>
      <Button type="default" @click="emit('regenerate')" disabled>Выключенная кнопка</Button>
    </template>
  </Table>
  <p>Выбрано объектов: <strong>{{ selectedObjects.length }}</strong></p>
</template>

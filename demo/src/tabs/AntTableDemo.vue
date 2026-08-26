<script setup lang="ts">
import { Button, Table } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import { computed } from 'vue'
import type { TableColumn } from '../../../src'
import type { DemoObject } from '../types'

const props = defineProps<{ columns: TableColumn[]; objects: DemoObject[]; selectedObjects: DemoObject[] }>()
const emit = defineEmits<{ regenerate: []; 'update:selectedObjects': [objects: DemoObject[]] }>()
const selectedRowKeys = computed(() => props.selectedObjects.map(object => object.id))
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: Key[]) => {
    const selectedKeys = new Set(keys)
    emit('update:selectedObjects', props.objects.filter(object => selectedKeys.has(object.id)))
  },
}))
</script>

<template>
  <Table :columns="columns" :data-source="objects" :row-selection="rowSelection" row-key="id" bordered>
    <template #title>
      <div class="title"><strong>Случайные объекты</strong><Button @click="emit('regenerate')">Сгенерировать заново</Button></div>
    </template>
  </Table>
  <p>Выбрано объектов: <strong>{{ selectedObjects.length }}</strong></p>
</template>

<style scoped>.title { display: flex; align-items: center; justify-content: space-between; gap: 16px; }</style>

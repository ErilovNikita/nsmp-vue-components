<script setup lang="ts">
import { Button, Table, TypographyTitle } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import { computed, h } from 'vue'
import type { TableColumn } from '../../../src'
import type { DemoObject } from '../types'
import LockIcon from '../assets/Lock.svg'
import RefreshIcon from '../assets/Refresh.svg'

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
  <TypographyTitle :level="4">Случайные объекты</TypographyTitle>
  <Button @click="emit('regenerate')">
    <template #icon>
      <img :src="RefreshIcon" alt="Refresh" />
    </template>
    Сгенерировать заново
  </Button>
  <Button @click="emit('regenerate')" disabled>
    <template #icon>
      <img :src="LockIcon" alt="Lock" />
    </template>
    Выключенная кнопка
  </Button>
  <Table :columns="columns" :data-source="objects" :row-selection="rowSelection" row-key="id"/>
  <p>Выбрано объектов: <strong>{{ selectedObjects.length }}</strong></p>
</template>

<style scoped>.title { display: flex; align-items: center; justify-content: space-between; gap: 16px; }</style>

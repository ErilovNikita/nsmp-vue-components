<script setup lang="ts">
import {
  Collapse as AntCollapse,
  CollapsePanel as AntCollapsePanel,
  Form as AntForm,
  FormItem as AntFormItem,
  TypographyText as AntTypographyText,
} from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import type { AttrGroupProps } from './types'

defineOptions({ name: 'LibraryAttrGroup' })

const props = withDefaults(defineProps<AttrGroupProps>(), {
  activeKey: null,
  items: () => [],
  open: false,
})

const emit = defineEmits<{
  'update:activeKey': [activeKey: number | null]
  'update:open': [open: boolean]
}>()

const currentActiveKey = ref<number | null>(
  props.activeKey ?? (props.open ? 1 : null),
)

const show = computed(() => currentActiveKey.value !== null)

watch(() => props.activeKey, activeKey => {
  currentActiveKey.value = activeKey
})

watch(() => props.open, open => {
  currentActiveKey.value = open ? 1 : null
})

const setActiveKey = (activeKey: number | null) => {
  currentActiveKey.value = activeKey
  emit('update:activeKey', activeKey)
  emit('update:open', activeKey !== null)
}

const handleActiveKey = (
  activeKey: string | number | Array<string | number>,
) => {
  const key = Array.isArray(activeKey) ? activeKey[0] : activeKey
  setActiveKey(Number(key) === 1 ? 1 : null)
}

const open = () => {
  setActiveKey(1)
  return attrGroupApi
}

const close = () => {
  setActiveKey(null)
  return attrGroupApi
}

const attrGroupApi = {
  open,
  close,
  show,
  activeKey: currentActiveKey,
}

defineExpose(attrGroupApi)
</script>

<template>
  <AntCollapse
    :active-key="currentActiveKey ?? undefined"
    accordion
    ghost
    @update:active-key="handleActiveKey"
  >
    <AntCollapsePanel
      :key="1"
      :header="title"
    >
      <AntForm
        :label-col="{ style: { width: '225px', textAlign: 'left' } }"
        layout="horizontal"
      >
        <div class="btn-toolkit">
          <slot name="start"/>
        </div>

        <AntFormItem
          v-for="([label, fieldName], index) in items"
          :key="`${fieldName}-${index}`"
          :label="label"
          class="attr-group-item"
        >
          <AntTypographyText>{{ values[fieldName] }}</AntTypographyText>
        </AntFormItem>

        <slot name="end" />
      </AntForm>
    </AntCollapsePanel>
  </AntCollapse>
</template>

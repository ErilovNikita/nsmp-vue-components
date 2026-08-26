<script setup lang="ts">
import { TabPane as AntTabPane, Tabs as AntTabs } from 'ant-design-vue'
import { computed, ref, useAttrs, watch } from 'vue'
import type { TabKey, TabsExposed, TabsProps } from './types'

defineOptions({
  name: 'LibraryTabs',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsProps>(), {
  animated: false,
  centered: false,
  defaultTab: 1,
  destroyInactiveTabPane: false,
  size: 'middle',
  tabPosition: 'top',
  type: 'card',
})

const emit = defineEmits<{
  change: [key: TabKey]
  tabClick: [
    key: TabKey,
    event: globalThis.KeyboardEvent | globalThis.MouseEvent,
  ]
  'update:activeKey': [key: TabKey]
}>()

const attrs = useAttrs()
const initialKey = () => props.activeKey
  ?? props.defaultTab
  ?? props.items[0]?.key
const activeTab = ref<TabKey | undefined>(initialKey())
const defaultTab = computed(() => props.defaultTab ?? props.items[0]?.key)
const antActiveKey = computed(() => activeTab.value === undefined
  ? undefined
  : String(activeTab.value))

watch(() => props.activeKey, key => {
  if (key !== undefined) activeTab.value = key
})

const resolveKey = (key: TabKey): TabKey =>
  props.items.find(item => String(item.key) === key)?.key ?? key

const set = (key: TabKey): TabsExposed => {
  activeTab.value = key
  emit('update:activeKey', key)
  emit('change', key)
  return exposed
}

const home = (): TabsExposed => {
  if (defaultTab.value !== undefined) set(defaultTab.value)
  return exposed
}

const exposed: TabsExposed = { home, set }
defineExpose({ activeTab, defaultTab, ...exposed })
</script>

<template>
  <AntTabs
    v-bind="attrs"
    class="library-tabs"
    :active-key="antActiveKey"
    :animated="animated"
    :centered="centered"
    :destroy-inactive-tab-pane="destroyInactiveTabPane"
    :size="size"
    :tab-bar-gutter="tabBarGutter"
    :tab-position="tabPosition"
    :type="type"
    @change="key => set(resolveKey(key))"
    @tab-click="(key, event) => emit('tabClick', resolveKey(key), event)"
  >
    <AntTabPane
      v-for="item in items"
      :key="String(item.key)"
      :disabled="item.disabled"
      :force-render="item.forceRender"
      :tab="item.label"
    >
      <slot
        :name="item.slot ?? String(item.key)"
        :active="activeTab === item.key"
        :item="item"
      />
    </AntTabPane>

    <template
      v-if="$slots.tabBarExtraContent"
      #tabBarExtraContent
    >
      <slot name="tabBarExtraContent" />
    </template>
  </AntTabs>
</template>

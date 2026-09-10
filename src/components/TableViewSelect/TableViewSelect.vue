<script setup lang="ts">
import { computed, ref } from 'vue'
import FormSelectControl from '../FormSelect/FormSelectControl.vue'
import type { FormSelectControlProps } from '../FormSelect/types'
import type { TableViewSelectProps } from './index'

defineOptions({ name: 'LibraryTableViewSelect' })

const props = defineProps<TableViewSelectProps>()
const emit = defineEmits<{
    change: [value: TableViewSelectProps['value'], option: unknown]
    'update:value': [value: TableViewSelectProps['value']]
}>()
const select = ref<{ blur: () => void; focus: () => void }>()
const controlProps = computed(() => props as unknown as FormSelectControlProps)

defineExpose({
    blur: () => select.value?.blur(),
    focus: () => select.value?.focus(),
})
</script>

<template>
    <div class="library-table-view-select">
        <FormSelectControl ref="select" v-bind="controlProps" @change="(value, option) => emit('change', value, option)"
            @update:value="value => emit('update:value', value)">
            <template v-if="$slots.dropdownRender" #dropdownRender="slotProps">
                <slot name="dropdownRender" v-bind="slotProps" />
            </template>
            <template v-if="$slots.notFoundContent" #notFoundContent>
                <slot name="notFoundContent" />
            </template>
            <template v-if="$slots.option" #option="slotProps">
                <slot name="option" v-bind="slotProps" />
            </template>
            <template v-if="$slots.tagRender" #tagRender="slotProps">
                <slot name="tagRender" v-bind="slotProps" />
            </template>
        </FormSelectControl>
    </div>
</template>

<style scoped>
.library-table-view-select {
    display: inline-block;
    vertical-align: top !important; 
}

.library-table-view-select :deep(.ant-select),
.library-table-view-select :deep(.ant-select-selector) {
    height: 24px !important;
    width: 200px;
}

.library-table-view-select :deep(.ant-select-selector) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.library-table-view-select :deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector),
.library-table-view-select :deep(.ant-select-focused .ant-select-selector) {
    box-shadow: none !important;
}

.library-table-view-select :deep(.ant-select-arrow) {
    color: currentColor !important;
}

.library-table-view-select :deep(.ant-select-selection-item),
.library-table-view-select :deep(.ant-select-selection-placeholder) {
    line-height: 22px !important;
}
</style>
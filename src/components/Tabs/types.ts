import type { TabsProps as AntTabsProps } from 'ant-design-vue'

export type TabKey = string | number

export interface TabItem {
  disabled?: boolean
  forceRender?: boolean
  key: TabKey
  label: string
  /** Named slot used for the tab content. Defaults to String(key). */
  slot?: string
}

export interface TabsProps {
  activeKey?: TabKey
  animated?: AntTabsProps['animated']
  centered?: boolean
  defaultTab?: TabKey
  destroyInactiveTabPane?: boolean
  items: TabItem[]
  size?: AntTabsProps['size']
  tabBarGutter?: number
  tabPosition?: AntTabsProps['tabPosition']
  type?: AntTabsProps['type']
}

export interface TabsExposed {
  home: () => TabsExposed
  set: (key: TabKey) => TabsExposed
}

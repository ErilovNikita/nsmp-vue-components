export type AttrGroupItem = [label: string, fieldName: string]

export interface AttrGroupProps {
  activeKey?: number | null
  items?: AttrGroupItem[]
  open?: boolean
  title: string
  values: Record<string, unknown>
}

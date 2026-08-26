export interface DemoFormModel {
  accepted: boolean
  age: number
  birthDate: string
  city: string
  name: string
  notifications: boolean
  workload: number
}

export interface DemoObject extends Record<string, unknown> {
  category: string
  id: number
  name: string
  rating: number
  status: string
}

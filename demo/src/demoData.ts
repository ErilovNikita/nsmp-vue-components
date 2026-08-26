import type { TableColumn } from '../../src'
import type { DemoFormModel, DemoObject } from './types'

export const initialForm: DemoFormModel = {
  accepted: false,
  age: 30,
  birthDate: '1996-05-18',
  city: 'moscow',
  name: 'Анна Смирнова',
  notifications: true,
  workload: 45,
}

export const cities = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Казань', value: 'kazan' },
]

export const acceptanceRules = [{
  validator: (_rule: unknown, value: boolean) => value
    ? globalThis.Promise.resolve()
    : globalThis.Promise.reject(new Error('Примите условия')),
}]

export const initialColumns: TableColumn[] = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 90 },
  { title: 'Название', dataIndex: 'name', key: 'name', width: 220 },
  { title: 'Категория', dataIndex: 'category', key: 'category', width: 160 },
  { title: 'Статус', dataIndex: 'status', key: 'status', width: 140 },
  { title: 'Рейтинг', dataIndex: 'rating', key: 'rating' },
]

export const createObjects = (seed: number): DemoObject[] => {
  let state = seed >>> 0
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
  const categories = ['Документ', 'Задача', 'Проект', 'Обращение']
  const statuses = ['Новый', 'В работе', 'Завершён']

  return Array.from({ length: 9 }, (_, index) => ({
    category: categories[Math.floor(random() * categories.length)],
    id: index + 1,
    name: `Объект ${String(index + 1).padStart(2, '0')}`,
    rating: Math.floor(random() * 100),
    status: statuses[Math.floor(random() * statuses.length)],
  }))
}

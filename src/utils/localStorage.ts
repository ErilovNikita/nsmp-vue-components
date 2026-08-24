export const readLocalStorage = <T>(key: string): T | null => {
  if (typeof globalThis.localStorage === 'undefined') {
    return null
  }

  try {
    const value = globalThis.localStorage.getItem(key)
    return value === null ? null : JSON.parse(value) as T
  } catch {
    return null
  }
}

export const writeLocalStorage = <T>(key: string, value: T): boolean => {
  if (typeof globalThis.localStorage === 'undefined') {
    return false
  }

  try {
    globalThis.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const removeLocalStorage = (key: string): boolean => {
  if (typeof globalThis.localStorage === 'undefined') {
    return false
  }

  try {
    globalThis.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

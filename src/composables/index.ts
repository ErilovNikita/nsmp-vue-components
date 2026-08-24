import { computed, unref, type MaybeRef } from 'vue'

export function useNsmpDisabled(disabled: MaybeRef<boolean | undefined>) {
  return computed(() => Boolean(unref(disabled)))
}

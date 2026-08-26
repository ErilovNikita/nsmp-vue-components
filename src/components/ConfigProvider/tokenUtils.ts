export type TokenRecord = Record<string, unknown>

export const compact = <T extends TokenRecord>(tokens: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(tokens).filter(([, value]) => value !== undefined),
  ) as Partial<T>

export const pxToNumber = (value?: string): number | undefined => {
  if (!value) return undefined

  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export const fontWeightToNumber = (value?: string): number | undefined => {
  if (!value) return undefined

  const normalizedWeights: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }

  return normalizedWeights[value.toLowerCase()] ?? pxToNumber(value)
}

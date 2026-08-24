export interface NsmpThemeProperties {
  [property: string]: string
}

function findObjectEnd(source: string, objectStart: number): number {
  let depth = 0
  let quote: '"' | "'" | null = null
  let escaped = false

  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index]

    if (quote) {
      if (escaped) {
        escaped = false
      } else if (character === '\\') {
        escaped = true
      } else if (character === quote) {
        quote = null
      }
      continue
    }

    if (character === '"' || character === "'") {
      quote = character
    } else if (character === '{') {
      depth += 1
    } else if (character === '}') {
      depth -= 1
      if (depth === 0) {
        return index
      }
    }
  }

  throw new Error('NSMP theme object is not closed')
}

export function parseNsmpTheme(source: string): NsmpThemeProperties {
  const declaration = /\b(?:var|let|const)\s+themeProperties\s*=\s*/.exec(source)

  if (!declaration) {
    throw new Error('NSMP theme declaration "themeProperties" was not found')
  }

  const objectStart = source.indexOf('{', declaration.index + declaration[0].length)
  if (objectStart === -1) {
    throw new Error('NSMP theme object was not found')
  }

  const objectEnd = findObjectEnd(source, objectStart)
  const parsed: unknown = JSON.parse(source.slice(objectStart, objectEnd + 1))

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('NSMP theme must be a JSON object')
  }

  for (const [property, value] of Object.entries(parsed)) {
    if (typeof value !== 'string') {
      throw new Error(`NSMP theme property "${property}" must be a string`)
    }
  }

  return parsed as NsmpThemeProperties
}
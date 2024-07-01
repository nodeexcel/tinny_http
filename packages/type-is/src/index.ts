import * as typer from '@tinyhttp/content-type'
import mime from 'mime'

function normalizeType(value: string) {
  // parse the type
  const type = typer.parse(value)
  type.parameters = {}
  // reformat it
  return typer.format(type)
}

function tryNormalizeType(value: string) {
  if (!value) return null

  try {
    return normalizeType(value)
  } catch (err) {
    return null
  }
}


/**
 * Compare a `value` content-type with `types`.
 * Each `type` can be an extension like `html`,
 * a special shortcut like `multipart` or `urlencoded`,
 * or a mime type.
 */
export const typeIs = (value: string, ...types: string[]) => {
  let i: number
  // remove parameters and normalize
  const val = tryNormalizeType(value)

  // no type or invalid
  if (!val) return false

  // no types, return the content type
  if (!types || !types.length) return val

  let type: string
  for (i = 0; i < types.length; i++) {
    if (mimeMatch(normalize((type = types[i])), val)) {
      return type[0] === '+' || type.indexOf('*') !== -1 ? val : type
    }
  }

  // no matches
  return false
}

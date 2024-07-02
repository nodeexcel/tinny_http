import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Sign the given `val` with `secret`.
 */
export const sign = (val: string, secret: string): string =>
  `${val}.${createHmac('sha256', secret).update(val).digest('base64').replace(/=+$/, '')}`

/**
 * Unsign and decode the given `val` with `secret`,
 * returning `false` if the signature is invalid.
 */
export const unsign = (val: string, secret: string): string | false => {
  const str = val.slice(0, val.lastIndexOf('.'))
  const mac = sign(str, secret)
  const macBuffer = Buffer.from(mac)
  const valBuffer = Buffer.alloc(macBuffer.length)

  valBuffer.write(val)
  return timingSafeEqual(macBuffer, valBuffer) ? str : false
}

export function parse(header: string): string[] {
  let end = header.length
  const list: string[] = []
  let start = header.length

  // gather addresses, backwards
  for (let i = header.length - 1; i >= 0; i--) {
    switch (header.charCodeAt(i)) {
      case 0x20 /*   */:
        if (start === end) {
          start = end = i
        }
        break
      case 0x2c /* , */:
        if (start !== end) {
          list.push(header.substring(start, end))
        }
        start = end = i
        break
      default:
        start = i
        break
    }
  }

  // final address
  if (start !== end) list.push(header.substring(start, end))

  return list
}

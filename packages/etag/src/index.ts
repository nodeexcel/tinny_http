// Original module: https://github.com/jshttp/etag/blob/master/index.js

import { createHash } from 'node:crypto'
import { Stats } from 'node:fs'

const entityTag = (entity: string | Buffer): string => {
  if (entity.length === 0) {
    // fast-path empty
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'
  }
  // generate hash
  const hash = createHash('sha1')
    .update(entity as string, 'utf8')
    .digest('base64')
    .substring(0, 27)

  const len = typeof entity === 'string' ? Buffer.byteLength(entity, 'utf8') : entity.length

  return `"${len.toString(16)}-${hash}"`
}

const statTag = ({ mtime, size }: Stats): string => {
  return `"${mtime.getTime().toString(16)}-${size.toString(16)}"`
}

export const eTag = (entity: string | Buffer | Stats, options?: { weak: boolean }): string => {
  if (entity == null) throw new TypeError('argument entity is required')

  const weak = options?.weak || entity instanceof Stats

  // generate entity tag

  const tag = entity instanceof Stats ? statTag(entity) : entityTag(entity)

  return weak ? `W/${tag}` : tag
}
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


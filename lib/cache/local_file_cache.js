import fs from 'fs'

const path = require('path')
// File caching lasts 10 seconds
const cacheInvalidSeconds = 1000000000 * 1000
// file name
const jsonFile = path.resolve('./data.json')

export async function getCache(key) {
  const exist = await fs.existsSync(jsonFile)
  if (!exist) return null
  const data = await fs.readFileSync(jsonFile)
  let json = null
  if (!data) return null
  try {
    json = JSON.parse(data)
  } catch (error) {
    console.error('读取JSON缓存文件失败', data)
    return null
  }
  // The cache will be invalidated after its validity period.
  const cacheValidTime = new Date(
    parseInt(json[key + '_expire_time']) + cacheInvalidSeconds
  )
  const currentTime = new Date()
  if (!cacheValidTime || cacheValidTime < currentTime) {
    return null
  }
  return json[key]
}

/**
 * Concurrent requests to write files are abnormal; the Vercel production environment does not support writing files.
 * @param key
 * @param data
 * @returns {Promise<null>}
 */
export async function setCache(key, data) {
  const exist = await fs.existsSync(jsonFile)
  const json = exist ? JSON.parse(await fs.readFileSync(jsonFile)) : {}
  json[key] = data
  json[key + '_expire_time'] = new Date().getTime()
  fs.writeFileSync(jsonFile, JSON.stringify(json))
}

export async function delCache(key, data) {
  const exist = await fs.existsSync(jsonFile)
  const json = exist ? JSON.parse(await fs.readFileSync(jsonFile)) : {}
  delete json.key
  json[key + '_expire_time'] = new Date().getTime()
  fs.writeFileSync(jsonFile, JSON.stringify(json))
}

export default { getCache, setCache, delCache }

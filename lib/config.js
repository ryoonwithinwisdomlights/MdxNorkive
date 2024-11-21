'use client'

import { BLOG } from '@/blog.config'
import { useGlobal } from './global'
import { deepClone } from './utils'

/**
 *Config 읽는 순서
 * 1.먼저 NotionConfig 테이블을 읽어보세요
 * 2. 두 번째로 환경 변수를 읽으십시오.
 * 3. 그런 다음 blog.config.js / 또는 각 테마의 CONFIG 파일을 읽으십시오.
 * @param {*} key ； 매개변수 이름

 * @param {*} defaultVal ; 매개변수에 대한 기본 반환 값이 없습니다.
 * @param {*} extendConfig ; 참조 구성 객체{key:val}.공지사항에서 찾을 수 없다면 먼저 여기서 찾아보세요.
 * @returns
 */
export const siteConfig = (key, defaultVal = null, extendConfig = null) => {
  let global = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    global = useGlobal()
  } catch (error) {}

  // First, configure the table configuration in NOTION to be read first
  let val = null
  let siteInfo = null

  if (global) {
    val = global.NOTION_CONFIG?.[key]
    siteInfo = global.siteInfo
    // console.log('current variable', key, val)
  }

  if (!val) {
    // Here we do some compatibility processing for some keys.
    switch (key) {
      case 'HOME_BANNER_IMAGE':
        val = siteInfo?.pageCover // The cover image is taken from the cover of Notion
        break
      case 'AVATAR':
        val = siteInfo?.icon // The cover image is taken from Notion’s avatar.
        break
      case 'TITLE':
        val = siteInfo?.title // The title takes the title in Notion
        break
      case 'DESCRIPTION':
        val = siteInfo?.description // The DESCRIPTION takes the DESCRIPTION in Notion
        break
    }
  }

  // Secondly, if there is an incoming configuration reference, try to read
  if (!val && extendConfig) {
    val = extendConfig[key]
  }

  // Secondly, if NOTION does not find the configuration, it will read the blog.config.js file.
  if (!val) {
    val = BLOG[key]
  }

  if (!val) {
    return defaultVal
  } else {
    if (typeof val === 'string') {
      if (val === 'true' || val === 'false') {
        return JSON.parse(val)
      }
      return val
    } else {
      try {
        return JSON.parse(val)
      } catch (error) {
        // If the value is a string but not in valid JSON format, return the string directly
        return val
      }
    }
  }
}

/**
 * Read all configurations
 * 1. Read the NotionConfig table first
 * 2. Secondly read the environment variables
 * 3. Read the blog.config.js file again
 * @param {*} key
 * @returns
 */
export const siteConfigMap = () => {
  const val = deepClone(BLOG)
  for (const key in val) {
    val[key] = siteConfig(key)
    // console.log('site', key, val[key], siteConfig(key))
  }
  return val
}

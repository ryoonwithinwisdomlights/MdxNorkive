/* eslint-disable no-unused-vars */
// Encapsulate asynchronous resource loading method
import { memo } from 'react'

export const exchangeSlugToType = slug => {
  const typeApp = [
    { slug: 'writing', type: 'Writing' },
    { slug: 'sideproject', type: 'Sideproject' },
    { slug: 'inspiration', type: 'Inspiration' },
    { slug: 'agiveawaylog', type: 'AGiveAwayLog' },
    { slug: 'thelog', type: 'TheLog' },
    { slug: 'guest-book', type: 'GuestBook' },
    { slug: 'thechlog', type: 'TechLog' }
  ]
  let res = ''
  if (slug) {
    typeApp.forEach(item => {
      if (item.slug === slug) {
        res = item.type
      }
    })
  } else {
    res = null
  }

  return res
}

/**
 * Determine whether the client
 * @returns {boolean}
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Component persistence
 */
export const memorize = Component => {
  const MemoizedComponent = props => {
    return <Component {...props} />
  }
  return memo(MemoizedComponent)
}
/**
 * Load external resources
 * @param url address e.g. https://xx.com/xx.js
 * @param type js or css
 * @returns {Promise<unknown>}
 */
export function loadExternalResource(url, type) {
  // Check if it already exists
  const elements =
    type === 'js'
      ? document.querySelectorAll(`[src='${url}']`)
      : document.querySelectorAll(`[href='${url}']`)

  return new Promise((resolve, reject) => {
    if (elements.length > 0 || !url) {
      resolve(url)
      return url
    }

    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'font') {
      tag = document.createElement('link')
      tag.rel = 'preload'
      tag.as = 'font'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
    }
    if (tag) {
      tag.onload = () => {
        console.log('Load Success', url)
        resolve(url)
      }
      tag.onerror = () => {
        console.log('Load Error', url)
        reject(url)
      }
      document.head.appendChild(tag)
    }
  })
}

/**
 * Query the query parameters in the url
 * @param {}} variable
 * @returns
 */
export function getQueryVariable(key) {
  const query = isBrowser ? window.location.search.substring(1) : ''
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
  return false
}

/**
 * Get the value of the specified parameter in the URL
 * @param {string} url
 * @param {string} param
 * @returns {string|null}
 */
export function getQueryParam(url, param) {
  const searchParams = new URLSearchParams(url.split('?')[1])
  return searchParams.get(param)
}

/**
 * Deep merge two objects
 * @param target
 * @param sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

/**
 * Whether object

 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Is iterable
 * @param {*} obj
 * @returns
 */
export function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === 'function'
}

/**
 * deep copy object
 * Deep copy based on source object type, supports object and array
 * @param {*} obj
 * @returns
 */
export function deepClone(obj) {
  if (Array.isArray(obj)) {
    // If obj is an array, create a new array and deep clone each element
    return obj.map(item => deepClone(item))
  } else if (obj && typeof obj === 'object') {
    const newObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] instanceof Date) {
          newObj[key] = new Date(obj[key].getTime()).toISOString()
        } else {
          newObj[key] = deepClone(obj[key])
        }
      }
    }
    return newObj
  } else {
    return obj
  }
}
/**
 * delay
 * @param {*} ms
 * @returns
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Get articles from page 1 to the specified page number
 * @param pageIndex which page
 * @param list All articles
 * @param pageSize Number of articles per page
 * @returns {*}
 */
export const getListByPage = function (list, pageIndex, pageSize) {
  return list.slice(0, pageIndex * pageSize)
}

/**
 * Determine whether to move the device
 */
export const isMobile = () => {
  let isMobile = false
  if (!isBrowser) {
    return isMobile
  }

  // This judgment will trigger TypeError: navigator.userAgentData.mobile is undefined Problem causing the blog to not work properly
  // if (!isMobile && navigator.userAgentData.mobile) {
  //   isMobile = true
  // }

  if (!isMobile && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    isMobile = true
  }

  if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
    isMobile = true
  }

  if (typeof window.orientation !== 'undefined') {
    isMobile = true
  }

  return isMobile
}

'use client'

import { isBrowser } from '@/lib/utils'

/**
 * custom external script
 * The incoming parameters will be converted to <script>Label.
 * @returns
 */
const ExternalScript = props => {
  const { src } = props
  if (!isBrowser || !src) {
    return null
  }

  const element = document.querySelector(`script[src="${src}"]`)
  if (element) {
    return null
  }
  const script = document.createElement('script')
  Object.entries(props).forEach(([key, value]) => {
    script.setAttribute(key, value)
  })
  document.head.appendChild(script)
  console.log('Load external script', props, script)
  return null
}

export default ExternalScript

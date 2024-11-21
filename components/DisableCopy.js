import { BLOG } from '@/blog.config'
import { useEffect } from 'react'

/**
 * Plug-in that prevents users from copying articles
 */
export default function DisableCopy() {
  useEffect(() => {
    if (!JSON.parse(BLOG.CAN_COPY)) {
      // Add copy-disabled styles to the full stack
      document.getElementsByTagName('html')[0].classList.add('forbid-copy')
      // Listen for replication events
      document.addEventListener('copy', function (event) {
        event.preventDefault() // Prevent default copy behavior
        alert('Sorry, the content of this page cannot be copied')
      })
    }
  }, [])

  return null
}

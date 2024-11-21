import { useEffect } from 'react'
import Prism from 'prismjs'
// prismjs for all languages Use autoloader to introduce
// import 'prismjs/plugins/autoloader/prism-autoloader'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// mermaid diagram
import { BLOG } from '@/blog.config'
import { loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useGlobal } from '@/lib/global'

/**
 * Code beautification related
 * @author https://github.com/txs/
 * @returns
 */
const PrismMac = () => {
  const router = useRouter()
  const { isDarkMode } = useGlobal()

  useEffect(() => {
    if (JSON.parse(BLOG.CODE_MAC_BAR)) {
      loadExternalResource('/css/prism-mac-style.css', 'css')
    }
    // Load prism style
    loadPrismThemeCSS(isDarkMode)
    // fold code
    loadExternalResource(BLOG.PRISM_JS_AUTO_LOADER, 'js').then(url => {
      if (window?.Prism?.plugins?.autoloader) {
        window.Prism.plugins.autoloader.languages_path = BLOG.PRISM_JS_PATH
      }

      renderPrismMac()
      renderMermaid()
      renderCollapseCode()
    })
  }, [router, isDarkMode])

  return <></>
}

/**
 * Load styles
 */
const loadPrismThemeCSS = isDarkMode => {
  loadExternalResource(BLOG.PRISM_THEME_PREFIX_PATH, 'css')
}

/*
 * Convert a code block into a collapsible object
 */
const renderCollapseCode = () => {
  if (!JSON.parse(BLOG.CODE_COLLAPSE)) {
    return
  }
  const codeBlocks = document.querySelectorAll('.code-toolbar')
  for (const codeBlock of codeBlocks) {
    // Determine whether the current element is wrapped
    if (codeBlock.closest('.collapse-wrapper')) {
      continue // If wrapped, skip the current loop
    }

    const code = codeBlock.querySelector('code')
    const language = code.getAttribute('class').match(/language-(\w+)/)[1]

    const collapseWrapper = document.createElement('div')
    collapseWrapper.className = 'collapse-wrapper w-full py-2'
    const panelWrapper = document.createElement('div')
    panelWrapper.className =
      'border dark:border-neutral-600 rounded-md hover:border-yellow-500 duration-200 transition-colors'

    const header = document.createElement('div')
    header.className =
      'flex justify-between items-center px-4 py-2 cursor-pointer select-none'
    header.innerHTML = `<h3 class="text-lg font-medium">${language}</h3><svg class="transition-all duration-200 w-5 h-5 transform rotate-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/></svg>`

    const panel = document.createElement('div')
    panel.className =
      'invisible h-0 transition-transform duration-200 border-t border-neutral-300'

    panelWrapper.appendChild(header)
    panelWrapper.appendChild(panel)
    collapseWrapper.appendChild(panelWrapper)

    codeBlock.parentNode.insertBefore(collapseWrapper, codeBlock)
    panel.appendChild(codeBlock)

    function collapseCode() {
      panel.classList.toggle('invisible')
      panel.classList.toggle('h-0')
      panel.classList.toggle('h-auto')
      header.querySelector('svg').classList.toggle('rotate-180')
      panelWrapper.classList.toggle('border-neutral-300')
    }

    // Collapse and expand code after click
    header.addEventListener('click', collapseCode)
    // Whether to automatically expand
    if (JSON.parse(BLOG.CODE_COLLAPSE_EXPAND_DEFAULT)) {
      header.click()
    }
  }
}

/**
 * Render mermaid language into pictures
 */
const renderMermaid = async () => {
  const observer = new MutationObserver(async mutationsList => {
    for (const m of mutationsList) {
      if (m.target.className === 'notion-code language-mermaid') {
        const chart = m.target.querySelector('code').textContent
        if (chart && !m.target.querySelector('.mermaid')) {
          const mermaidChart = document.createElement('div')
          mermaidChart.className = 'mermaid'
          mermaidChart.innerHTML = chart
          m.target.appendChild(mermaidChart)
        }

        const mermaidsSvg = document.querySelectorAll('.mermaid')
        if (mermaidsSvg) {
          let needLoad = false
          for (const e of mermaidsSvg) {
            if (e?.firstChild?.nodeName !== 'svg') {
              needLoad = true
            }
          }
          if (needLoad) {
            loadExternalResource(BLOG.MERMAID_CDN, 'js').then(url => {
              setTimeout(() => {
                const mermaid = window.mermaid
                mermaid?.contentLoaded()
              }, 100)
            })
          }
        }
      }
    }
  })
  if (document.querySelector('#notion-article')) {
    observer.observe(document.querySelector('#notion-article'), {
      attributes: true,
      subtree: true
    })
  }
}

function renderPrismMac() {
  const container = document?.getElementById('notion-article')

  // Add line numbers
  if (JSON.parse(BLOG.CODE_LINE_NUMBERS)) {
    const codeBlocks = container?.getElementsByTagName('pre')
    if (codeBlocks) {
      Array.from(codeBlocks).forEach(item => {
        if (!item.classList.contains('line-numbers')) {
          item.classList.add('line-numbers')
          item.style.whiteSpace = 'pre-wrap'
        }
      })
    }
  }
  // Check all redundant text before re-rendering

  try {
    Prism.highlightAll()
  } catch (err) {
    console.log('code rendering', err)
  }

  const codeToolBars = container?.getElementsByClassName('code-toolbar')
  // Add pre-mac element for Mac Style UI
  if (codeToolBars) {
    Array.from(codeToolBars).forEach(item => {
      const existPreMac = item.getElementsByClassName('pre-mac')
      if (existPreMac.length < codeToolBars.length) {
        const preMac = document.createElement('div')
        preMac.classList.add('pre-mac')
        preMac.innerHTML = '<span></span><span></span><span></span>'
        item?.appendChild(preMac, item)
      }
    })
  }

  // Folding code line number bug
  if (JSON.parse(BLOG.CODE_LINE_NUMBERS)) {
    fixCodeLineStyle()
  }
}

/**
 * The row height of the line number style is incorrectly determined after it is first rendered or folded by detail.
 * Manual resize calculation here
 */
const fixCodeLineStyle = () => {
  const observer = new MutationObserver(mutationsList => {
    for (const m of mutationsList) {
      if (m.target.nodeName === 'DETAILS') {
        const preCodes = m.target.querySelectorAll('pre.notion-code')
        for (const preCode of preCodes) {
          Prism.plugins.lineNumbers.resize(preCode)
        }
      }
    }
  })
  observer.observe(document.querySelector('#notion-article'), {
    attributes: true,
    subtree: true
  })
  setTimeout(() => {
    const preCodes = document.querySelectorAll('pre.notion-code')
    for (const preCode of preCodes) {
      Prism.plugins.lineNumbers.resize(preCode)
    }
  }, 10)
}

export default PrismMac

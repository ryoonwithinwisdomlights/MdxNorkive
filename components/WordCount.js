import { useGlobal } from '@/lib/global'
import { useEffect } from 'react'

/**
 * Count
 * @returns
 */
export default function WordCount() {
  const { locale } = useGlobal()
  useEffect(() => {
    countWords()
  })

  return (
    <span id="wordCountWrapper" className="flex gap-3 font-light">
      <span className="flex whitespace-nowrap items-center">
        <i className="pl-1 pr-2 fas fa-file-word" />
        <span id="wordCount">0</span>
      </span>
      <span className="flex whitespace-nowrap items-center">
        <i className="mr-1 fas fa-clock" />
        <span></span>
        <span id="readTime">0</span>&nbsp;{locale.COMMON.MINUTE}
      </span>
    </span>
  )
}

/**
 * 단어 수 및 읽기 시간 업데이트
 */
function countWords() {
  const articleText = deleteHtmlTag(
    document.getElementById('notion-article')?.innerHTML
  )
  const wordCount = fnGetCpmisWords(articleText)
  // 읽기 속도 분당 300-500
  document.getElementById('wordCount').innerHTML = wordCount
  document.getElementById('readTime').innerHTML =
    Math.floor(wordCount / 400) + 1
  const wordCountWrapper = document.getElementById('wordCountWrapper')
  wordCountWrapper.classList.remove('hidden')
}

// HTML 태그 제거
function deleteHtmlTag(str) {
  if (!str) {
    return ''
  }
  str = str.replace(/<[^>]+>|&[^>]+;/g, '').trim() // 모든 HTML 태그와 &nbsp;와 같은 특수 문자를 제거합니다.
  return str
}

// 단어 방법을 사용하여 텍스트 단어 수 계산
function fnGetCpmisWords(str) {
  if (!str) {
    return 0
  }
  let sLen = 0
  try {
    // eslint-disable-next-line no-irregular-whitespace
    str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
    // eslint-disable-next-line no-control-regex
    str = str.replace(/[\x00-\xff]/g, 'm')
    str = str.replace(/m+/g, '*')
    str = str.replace(/龘+/g, '')
    sLen = str.length
  } catch (e) {}
  return sLen
}

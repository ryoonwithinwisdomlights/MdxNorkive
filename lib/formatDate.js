/**
 * Format date
 * @param date
 * @param local
 * @returns {string}
 */
export default function formatDate(date, local) {
  if (!date || !local) return date || ''
  const d = new Date(date)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const res = d.toLocaleDateString(local, options)
  // If the format is Chinese date, it will be converted to a horizontal bar
  const format =
    local.slice(0, 2).toLowerCase() === 'zh'
      ? res.replace('年', '-').replace('月', '-').replace('日', '')
      : res
  return format
}

export function formatDateFmt(timestamp, fmt) {
  const date = new Date(timestamp)
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // Hour
    'm+': date.getMinutes(), // point
    's+': date.getSeconds(), // Second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt.trim()
}

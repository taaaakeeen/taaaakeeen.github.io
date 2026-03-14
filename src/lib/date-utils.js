export function formatDate(date, format) {
  const y = date.getFullYear()
  const M = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const H = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')

  switch (format) {
    case 'yyyy-MM-dd HH:mm:ss':
      return `${y}-${M}-${d} ${H}:${m}:${s}`
    case 'yyyy-MM-dd':
      return `${y}-${M}-${d}`
    case 'MM/dd':
      return `${M}/${d}`
    case 'HH:mm:ss':
      return `${H}:${m}:${s}`
    default:
      return `${y}-${M}-${d}`
  }
}

const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土']

export function getDayName(date) {
  return DAY_NAMES[date.getDay()]
}

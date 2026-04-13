const BASE_URL = 'https://www.alphavantage.co/query'
const API_KEY_STORAGE = 'alphavantage_api_key'

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || ''
}

export function setApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key.trim())
}

export function hasApiKey() {
  return getApiKey().length > 0
}

async function apiFetch(params) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('APIキーが設定されていません')

  const url = new URL(BASE_URL)
  url.searchParams.set('apikey', apiKey)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const res = await fetch(url)
  const data = await res.json()

  if (data['Error Message']) {
    throw new Error(data['Error Message'])
  }
  if (data['Note']) {
    throw new Error('APIリクエスト上限に達しました。しばらく待ってから再試行してください。')
  }

  return data
}

export async function searchSymbol(keywords) {
  const data = await apiFetch({
    function: 'SYMBOL_SEARCH',
    keywords,
  })

  return (data.bestMatches || []).map(match => ({
    symbol: match['1. symbol'],
    name: match['2. name'],
    type: match['3. type'],
    region: match['4. region'],
    currency: match['8. currency'],
  }))
}

export async function fetchQuote(symbol) {
  const data = await apiFetch({
    function: 'GLOBAL_QUOTE',
    symbol,
  })

  const q = data['Global Quote']
  if (!q || Object.keys(q).length === 0) {
    throw new Error(`${symbol} のデータが見つかりません`)
  }

  return {
    symbol: q['01. symbol'],
    price: parseFloat(q['05. price']),
    change: parseFloat(q['09. change']),
    changePercent: q['10. change percent'],
    open: parseFloat(q['02. open']),
    high: parseFloat(q['03. high']),
    low: parseFloat(q['04. low']),
    volume: parseInt(q['06. volume']),
    previousClose: parseFloat(q['08. previous close']),
    latestDay: q['07. latest trading day'],
  }
}

export async function fetchDaily(symbol) {
  const data = await apiFetch({
    function: 'TIME_SERIES_DAILY',
    symbol,
    outputsize: 'compact',
  })

  const timeSeries = data['Time Series (Daily)']
  if (!timeSeries) {
    throw new Error(`${symbol} の日次データが見つかりません`)
  }

  return Object.entries(timeSeries)
    .map(([date, values]) => ({
      time: date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume']),
    }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

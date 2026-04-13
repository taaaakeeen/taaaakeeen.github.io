import { createChart } from 'lightweight-charts'
import { isFavorite, addFavorite, removeFavorite } from './favorites.js'

export function renderApiKeyForm(onSubmit) {
  const container = document.createElement('div')
  container.className = 'max-w-md mx-auto mt-16 bg-white rounded-xl shadow p-8'
  container.innerHTML = `
    <h2 class="text-xl font-bold mb-2">APIキーの設定</h2>
    <p class="text-sm text-gray-500 mb-6">
      株価データの取得には
      <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener" class="text-blue-600 underline">Alpha Vantage</a>
      の無料APIキーが必要です。
    </p>
    <form id="apikey-form" class="space-y-4">
      <input
        type="text"
        id="apikey-input"
        placeholder="APIキーを入力"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
        保存
      </button>
    </form>
  `

  container.querySelector('#apikey-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const key = container.querySelector('#apikey-input').value.trim()
    if (key) onSubmit(key)
  })

  return container
}

export function renderSearchBar(onSearch) {
  const container = document.createElement('div')
  container.className = 'mb-6'
  container.innerHTML = `
    <form id="search-form" class="flex gap-2">
      <input
        type="text"
        id="search-input"
        placeholder="銘柄を検索（例: AAPL, Toyota）"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
        検索
      </button>
    </form>
    <div id="search-results" class="mt-3"></div>
  `

  container.querySelector('#search-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const query = container.querySelector('#search-input').value.trim()
    if (query) onSearch(query)
  })

  return container
}

export function renderSearchResults(results, onAdd) {
  if (results.length === 0) {
    return '<p class="text-sm text-gray-500">該当する銘柄が見つかりませんでした。</p>'
  }

  return `
    <div class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
      ${results.map(r => `
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <span class="font-medium">${r.symbol}</span>
            <span class="text-sm text-gray-500 ml-2">${r.name}</span>
            <span class="text-xs text-gray-400 ml-2">${r.region} / ${r.currency}</span>
          </div>
          <button class="add-fav-btn px-3 py-1 text-sm bg-yellow-50 border border-yellow-300 rounded-full text-yellow-800 hover:bg-yellow-100 transition-colors cursor-pointer" data-symbol="${r.symbol}" data-name="${r.name}">
            ${isFavorite(r.symbol) ? '&#9733; 登録済' : '+ 追加'}
          </button>
        </div>
      `).join('')}
    </div>
  `
}

export function renderStockTiles(favorites, quotes, onSelect) {
  const container = document.createElement('div')
  container.id = 'stock-tiles'

  if (favorites.length === 0) {
    container.innerHTML = `
      <p class="text-gray-500 text-center py-8">銘柄を検索してお気に入りに追加してください。</p>
    `
    return container
  }

  container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'
  container.innerHTML = favorites.map(fav => {
    const quote = quotes[fav.symbol]
    const loading = !quote
    const positive = quote && quote.change >= 0

    return `
      <button class="stock-tile block text-left p-5 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer" data-symbol="${fav.symbol}">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-lg">${fav.symbol}</span>
          <span class="text-xs text-gray-400">${fav.name.length > 15 ? fav.name.substring(0, 15) + '...' : fav.name}</span>
        </div>
        ${loading
          ? '<div class="text-sm text-gray-400">読み込み中...</div>'
          : `
            <div class="text-2xl font-bold mb-1">${quote.price.toLocaleString()}</div>
            <div class="text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}">
              ${positive ? '+' : ''}${quote.change.toFixed(2)} (${quote.changePercent})
            </div>
          `
        }
      </button>
    `
  }).join('')

  container.querySelectorAll('.stock-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      onSelect(tile.dataset.symbol)
    })
  })

  return container
}

export function renderAnalysis(symbol, quote, dailyData, onToggleFavorite) {
  const container = document.createElement('div')
  container.id = 'analysis-view'

  const fav = isFavorite(symbol)
  const positive = quote.change >= 0

  container.innerHTML = `
    <div class="bg-white rounded-xl shadow p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-2xl font-bold">${symbol}</h2>
          <span class="text-sm text-gray-500">${quote.latestDay}</span>
        </div>
        <div class="flex items-center gap-3">
          <button id="back-btn" class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            &larr; 戻る
          </button>
          <button id="fav-toggle" class="text-2xl cursor-pointer ${fav ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'} transition-colors" title="${fav ? 'お気に入り解除' : 'お気に入り登録'}">
            ${fav ? '&#9733;' : '&#9734;'}
          </button>
        </div>
      </div>

      <div class="flex items-baseline gap-4 mb-6">
        <span class="text-3xl font-bold">${quote.price.toLocaleString()}</span>
        <span class="text-lg font-medium ${positive ? 'text-green-600' : 'text-red-600'}">
          ${positive ? '+' : ''}${quote.change.toFixed(2)} (${quote.changePercent})
        </span>
      </div>

      <div id="chart-container" class="mb-6 rounded-lg overflow-hidden border border-gray-200" style="height: 400px;"></div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="text-gray-500 mb-1">始値</div>
          <div class="font-medium">${quote.open.toLocaleString()}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="text-gray-500 mb-1">高値</div>
          <div class="font-medium text-red-500">${quote.high.toLocaleString()}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="text-gray-500 mb-1">安値</div>
          <div class="font-medium text-blue-500">${quote.low.toLocaleString()}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="text-gray-500 mb-1">終値</div>
          <div class="font-medium">${quote.close.toLocaleString()}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="text-gray-500 mb-1">出来高</div>
          <div class="font-medium">${quote.volume.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `

  // Render chart after DOM insertion
  requestAnimationFrame(() => {
    const chartEl = container.querySelector('#chart-container')
    if (chartEl && dailyData.length > 0) {
      const chart = createChart(chartEl, {
        width: chartEl.clientWidth,
        height: 400,
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
        timeScale: {
          borderColor: '#e0e0e0',
        },
      })

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderDownColor: '#ef4444',
        borderUpColor: '#22c55e',
        wickDownColor: '#ef4444',
        wickUpColor: '#22c55e',
      })

      candlestickSeries.setData(dailyData)
      chart.timeScale().fitContent()

      const resizeObserver = new ResizeObserver(() => {
        chart.applyOptions({ width: chartEl.clientWidth })
      })
      resizeObserver.observe(chartEl)
    }
  })

  return container
}

export function renderLoading() {
  const el = document.createElement('div')
  el.id = 'loading'
  el.className = 'text-center py-12 text-gray-400'
  el.innerHTML = `
    <div class="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    <p class="mt-3 text-sm">読み込み中...</p>
  `
  return el
}

export function renderError(message) {
  const el = document.createElement('div')
  el.className = 'bg-red-50 text-red-600 rounded-xl p-6 mb-6 text-sm'
  el.textContent = message
  return el
}

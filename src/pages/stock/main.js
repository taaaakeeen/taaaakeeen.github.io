import '../../styles/main.css'
import { renderHeader } from '../../components/header.js'
import { renderFooter } from '../../components/footer.js'
import { hasApiKey, setApiKey, fetchQuote, fetchDaily, searchSymbol } from './api.js'
import { getFavorites, addFavorite, removeFavorite, isFavorite } from './favorites.js'
import {
  renderApiKeyForm,
  renderSearchBar,
  renderSearchResults,
  renderStockTiles,
  renderAnalysis,
  renderLoading,
  renderError,
} from './renderer.js'

const app = document.getElementById('app')
app.appendChild(renderHeader('stock'))

const main = document.createElement('main')
main.className = 'max-w-6xl mx-auto px-4 py-6'
app.appendChild(main)
app.appendChild(renderFooter())

function init() {
  if (!hasApiKey()) {
    showApiKeyForm()
  } else {
    showDashboard()
  }
}

function showApiKeyForm() {
  main.innerHTML = ''
  main.appendChild(renderApiKeyForm((key) => {
    setApiKey(key)
    showDashboard()
  }))
}

async function showDashboard() {
  main.innerHTML = ''

  // Search bar
  const searchBar = renderSearchBar(handleSearch)
  main.appendChild(searchBar)

  // Stock tiles
  const favorites = getFavorites()
  const tilesContainer = renderStockTiles(favorites, {}, handleSelectStock)
  main.appendChild(tilesContainer)

  // Load quotes for favorites
  if (favorites.length > 0) {
    const quotes = {}
    for (const fav of favorites) {
      try {
        quotes[fav.symbol] = await fetchQuote(fav.symbol)
      } catch (e) {
        // Skip failed quotes
      }
    }
    refreshTiles(quotes)
  }
}

function refreshTiles(quotes) {
  const oldTiles = document.getElementById('stock-tiles')
  if (!oldTiles) return

  const favorites = getFavorites()
  const newTiles = renderStockTiles(favorites, quotes, handleSelectStock)
  oldTiles.replaceWith(newTiles)
}

async function handleSearch(query) {
  const resultsEl = document.getElementById('search-results')
  if (!resultsEl) return

  resultsEl.innerHTML = '<p class="text-sm text-gray-400">検索中...</p>'

  try {
    const results = await searchSymbol(query)
    resultsEl.innerHTML = renderSearchResults(results)

    // Attach add buttons
    resultsEl.querySelectorAll('.add-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const symbol = btn.dataset.symbol
        const name = btn.dataset.name

        if (isFavorite(symbol)) {
          removeFavorite(symbol)
        } else {
          addFavorite(symbol, name)
        }

        // Refresh dashboard
        showDashboard()
      })
    })
  } catch (e) {
    resultsEl.innerHTML = `<p class="text-sm text-red-500">${e.message}</p>`
  }
}

async function handleSelectStock(symbol) {
  main.innerHTML = ''
  main.appendChild(renderLoading())

  try {
    const [quote, dailyData] = await Promise.all([
      fetchQuote(symbol),
      fetchDaily(symbol),
    ])

    main.innerHTML = ''

    const analysis = renderAnalysis(symbol, quote, dailyData, () => {
      // Re-render analysis after favorite toggle
      handleSelectStock(symbol)
    })
    main.appendChild(analysis)

    // Back button
    const backBtn = main.querySelector('#back-btn')
    if (backBtn) {
      backBtn.addEventListener('click', () => showDashboard())
    }

    // Favorite toggle
    const favToggle = main.querySelector('#fav-toggle')
    if (favToggle) {
      favToggle.addEventListener('click', () => {
        const favName = getFavorites().find(f => f.symbol === symbol)?.name || symbol
        if (isFavorite(symbol)) {
          removeFavorite(symbol)
        } else {
          addFavorite(symbol, favName)
        }
        handleSelectStock(symbol)
      })
    }
  } catch (e) {
    main.innerHTML = ''
    main.appendChild(renderError(e.message))
    const backLink = document.createElement('button')
    backLink.className = 'mt-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer'
    backLink.textContent = '← 戻る'
    backLink.addEventListener('click', () => showDashboard())
    main.appendChild(backLink)
  }
}

init()

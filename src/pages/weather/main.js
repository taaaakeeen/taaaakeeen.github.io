import '../../styles/main.css'
import { renderHeader } from '../../components/header.js'
import { renderFooter } from '../../components/footer.js'
import { fetchAreaList, fetchForecast, fetchOverview, fetchWeatherMapUrl } from './api.js'
import { getFavorites } from './favorites.js'
import {
  renderRegionSelector,
  renderFavoritesBar,
  renderSelectedArea,
  renderForecast,
  renderWeatherMap,
  renderLoading,
  renderError,
} from './renderer.js'

const app = document.getElementById('app')
app.appendChild(renderHeader('weather'))

const main = document.createElement('main')
main.className = 'max-w-6xl mx-auto px-4 py-6'
app.appendChild(main)
app.appendChild(renderFooter())

let areaData = null
let officeNames = {}

async function init() {
  main.innerHTML = ''
  main.appendChild(renderLoading())

  try {
    areaData = await fetchAreaList()

    // Build office name lookup
    officeNames = {}
    for (const [code, office] of Object.entries(areaData.offices || {})) {
      officeNames[code] = office.name
    }

    main.innerHTML = ''

    // Favorites bar
    renderFavBar()

    // Region selector
    const selector = renderRegionSelector(areaData, handleSelectRegion)
    selector.id = 'region-selector'
    main.appendChild(selector)

    // Content area
    const content = document.createElement('div')
    content.id = 'weather-content'
    main.appendChild(content)

    // Load weather map
    loadWeatherMap()

    // Auto-load first favorite if exists
    const favorites = getFavorites()
    if (favorites.length > 0) {
      handleSelectRegion(favorites[0], officeNames[favorites[0]] || favorites[0])
    }
  } catch (e) {
    main.innerHTML = ''
    main.appendChild(renderError('地域データの読み込みに失敗しました。'))
  }
}

function renderFavBar() {
  const existing = document.getElementById('favorites-bar')
  const favorites = getFavorites()
  const bar = renderFavoritesBar(favorites, officeNames, handleSelectRegion, () => {})

  if (existing) {
    existing.replaceWith(bar)
  } else {
    main.prepend(bar)
  }
}

async function handleSelectRegion(officeCode, officeName) {
  const content = document.getElementById('weather-content')
  if (!content) return

  content.innerHTML = ''

  // Selected area header with favorite toggle
  const areaHeader = renderSelectedArea(officeCode, officeName, () => {
    renderFavBar()
    // Re-render selected area
    const oldHeader = document.getElementById('selected-area')
    if (oldHeader) {
      const newHeader = renderSelectedArea(officeCode, officeName, arguments.callee)
      oldHeader.replaceWith(newHeader)
    }
  })
  content.appendChild(areaHeader)
  content.appendChild(renderLoading())

  try {
    const [forecast, overview] = await Promise.all([
      fetchForecast(officeCode),
      fetchOverview(officeCode),
    ])

    // Remove loading
    const loading = document.getElementById('loading')
    if (loading) loading.remove()

    const forecastEl = renderForecast({ forecast, overview })
    content.appendChild(forecastEl)
  } catch (e) {
    const loading = document.getElementById('loading')
    if (loading) loading.remove()
    content.appendChild(renderError('天気データの読み込みに失敗しました。'))
  }
}

async function loadWeatherMap() {
  try {
    const mapUrl = await fetchWeatherMapUrl()
    const content = document.getElementById('weather-content')
    if (content) {
      content.insertAdjacentHTML('beforeend', renderWeatherMap(mapUrl))
    }
  } catch (e) {
    // Weather map is optional, silently fail
  }
}

init()

import { getWeatherInfo } from '../../lib/weather-codes.js'
import { formatDate, getDayName } from '../../lib/date-utils.js'
import { isFavorite, addFavorite, removeFavorite } from './favorites.js'

export function renderRegionSelector(areas, onSelect) {
  const container = document.createElement('div')
  container.className = 'mb-6'

  const centers = areas.centers
  const offices = areas.offices

  // Group offices by center
  const centerGroups = Object.entries(centers).map(([code, center]) => {
    const officeList = (center.children || [])
      .filter(childCode => offices[childCode])
      .map(childCode => ({ code: childCode, name: offices[childCode].name }))
    return { code, name: center.name, offices: officeList }
  })

  container.innerHTML = `
    <div class="flex flex-wrap gap-2">
      ${centerGroups.map(group => `
        <div class="relative" data-center="${group.code}">
          <button class="center-btn px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer" data-center="${group.code}">
            ${group.name}
          </button>
          <div class="center-dropdown hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
            ${group.offices.map(office => `
              <button class="office-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer first:rounded-t-lg last:rounded-b-lg" data-office="${office.code}">
                ${office.name}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `

  // Toggle dropdown
  container.querySelectorAll('.center-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const centerCode = btn.dataset.center
      const wrapper = container.querySelector(`[data-center="${centerCode}"]`)
      const dropdown = wrapper.querySelector('.center-dropdown')

      // Close all other dropdowns
      container.querySelectorAll('.center-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.add('hidden')
      })
      dropdown.classList.toggle('hidden')
    })
  })

  // Office select
  container.querySelectorAll('.office-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.center-dropdown').forEach(d => d.classList.add('hidden'))
      onSelect(btn.dataset.office, btn.textContent.trim())
    })
  })

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.querySelectorAll('.center-dropdown').forEach(d => d.classList.add('hidden'))
    }
  })

  return container
}

export function renderFavoritesBar(favorites, officeNames, onSelect, onRefresh) {
  const container = document.createElement('div')
  container.id = 'favorites-bar'

  if (favorites.length === 0) {
    container.innerHTML = ''
    return container
  }

  container.className = 'mb-4'
  container.innerHTML = `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-sm text-gray-500 mr-1">&#9733;</span>
      ${favorites.map(code => `
        <button class="fav-btn px-3 py-1 bg-yellow-50 border border-yellow-300 rounded-full text-sm text-yellow-800 hover:bg-yellow-100 transition-colors cursor-pointer" data-office="${code}">
          ${officeNames[code] || code}
        </button>
      `).join('')}
    </div>
  `

  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      onSelect(btn.dataset.office, btn.textContent.trim())
    })
  })

  return container
}

export function renderSelectedArea(officeCode, officeName, onToggleFavorite) {
  const container = document.createElement('div')
  container.id = 'selected-area'
  container.className = 'flex items-center gap-3 mb-6'

  const fav = isFavorite(officeCode)
  container.innerHTML = `
    <h2 class="text-xl font-bold">${officeName}</h2>
    <button id="fav-toggle" class="text-xl cursor-pointer ${fav ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'} transition-colors" title="${fav ? 'お気に入り解除' : 'お気に入り登録'}">
      ${fav ? '&#9733;' : '&#9734;'}
    </button>
  `

  container.querySelector('#fav-toggle').addEventListener('click', () => {
    if (isFavorite(officeCode)) {
      removeFavorite(officeCode)
    } else {
      addFavorite(officeCode)
    }
    onToggleFavorite()
  })

  return container
}

export function renderForecast(weatherData) {
  const container = document.createElement('div')
  container.id = 'forecast-content'

  const threeDayData = parseThreeDayForecast(weatherData)
  const weeklyData = parseWeeklyForecast(weatherData)
  const overview = parseOverview(weatherData)

  container.innerHTML = `
    ${renderOverviewSection(overview)}
    ${renderThreeDaySection(threeDayData)}
    ${renderWeeklySection(weeklyData)}
  `

  return container
}

function parseOverview(weatherData) {
  return {
    publishingOffice: weatherData.forecast[0]?.publishingOffice || '',
    reportDatetime: weatherData.forecast[0]?.reportDatetime || '',
    overviewText: weatherData.overview?.text || '',
  }
}

function parseThreeDayForecast(weatherData) {
  const forecast = weatherData.forecast[0]
  if (!forecast) return []

  const timeSeries = forecast.timeSeries
  const areas = timeSeries[0]?.areas || []
  const dates = timeSeries[0]?.timeDefines || []

  // Get the first area (primary forecast area)
  const area = areas[0]
  if (!area) return []

  return dates.map((dateStr, idx) => {
    const date = new Date(dateStr)
    const weatherCode = area.weatherCodes?.[idx]
    const weatherInfo = weatherCode ? getWeatherInfo(weatherCode) : null

    return {
      date: formatDate(date, 'MM/dd'),
      dayName: getDayName(date),
      dayIcon: weatherInfo?.dayIcon || '',
      nightIcon: weatherInfo?.nightIcon || '',
      descriptionJa: weatherInfo?.descriptionJa || '',
      weather: area.weathers?.[idx] || '',
      wind: area.winds?.[idx] || '',
      wave: area.waves?.[idx] || '',
    }
  })
}

function parseWeeklyForecast(weatherData) {
  const weekly = weatherData.forecast[1]
  if (!weekly) return []

  const timeSeries = weekly.timeSeries
  const weatherAreas = timeSeries[0]?.areas?.[0]
  const tempAreas = timeSeries[1]?.areas?.[0]
  const dates = timeSeries[0]?.timeDefines || []

  if (!weatherAreas) return []

  return dates.map((dateStr, idx) => {
    const date = new Date(dateStr)
    const weatherCode = weatherAreas.weatherCodes?.[idx]
    const weatherInfo = weatherCode ? getWeatherInfo(weatherCode) : null

    return {
      date: formatDate(date, 'MM/dd'),
      dayName: getDayName(date),
      dayIcon: weatherInfo?.dayIcon || '',
      nightIcon: weatherInfo?.nightIcon || '',
      descriptionJa: weatherInfo?.descriptionJa || '',
      tempMax: tempAreas?.tempsMax?.[idx] || '-',
      tempMin: tempAreas?.tempsMin?.[idx] || '-',
      pop: weatherAreas.pops?.[idx] || '-',
      reliability: weatherAreas.reliabilities?.[idx] || '-',
    }
  })
}

function renderOverviewSection(overview) {
  const date = overview.reportDatetime ? formatDate(new Date(overview.reportDatetime), 'yyyy-MM-dd HH:mm:ss') : ''
  const text = overview.overviewText
    ? overview.overviewText.replace(/\n/g, '<br>')
    : ''

  return `
    <div class="bg-white rounded-xl shadow p-6 mb-6">
      <h3 class="text-lg font-semibold mb-3">天気概況</h3>
      <div class="text-sm text-gray-500 mb-3">
        <span>${overview.publishingOffice}</span>
        ${date ? `<span class="ml-3">${date}</span>` : ''}
      </div>
      <p class="text-gray-700 text-sm leading-relaxed">${text || '情報なし'}</p>
    </div>
  `
}

function renderThreeDaySection(days) {
  if (days.length === 0) return ''

  return `
    <div class="bg-white rounded-xl shadow p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">3日間予報</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 text-gray-500">
              <th class="py-2 px-2 text-left">日付</th>
              <th class="py-2 px-2 text-center">天気</th>
              <th class="py-2 px-2 text-left">予報</th>
              <th class="py-2 px-2 text-left hidden md:table-cell">風</th>
              <th class="py-2 px-2 text-left hidden md:table-cell">波</th>
            </tr>
          </thead>
          <tbody>
            ${days.map(day => `
              <tr class="border-b border-gray-100">
                <td class="py-3 px-2 font-medium whitespace-nowrap">${day.date}(${day.dayName})</td>
                <td class="py-3 px-2 text-center">
                  <div class="flex items-center justify-center gap-1">
                    ${day.dayIcon ? `<img src="${day.dayIcon}" alt="" class="w-8 h-8">` : ''}
                    ${day.nightIcon ? `<img src="${day.nightIcon}" alt="" class="w-8 h-8 opacity-60">` : ''}
                  </div>
                </td>
                <td class="py-3 px-2 text-gray-700">${day.weather}</td>
                <td class="py-3 px-2 text-gray-500 hidden md:table-cell">${day.wind}</td>
                <td class="py-3 px-2 text-gray-500 hidden md:table-cell">${day.wave}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `
}

function renderWeeklySection(days) {
  if (days.length === 0) return ''

  return `
    <div class="bg-white rounded-xl shadow p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">週間予報</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 text-gray-500">
              <th class="py-2 px-2 text-left">日付</th>
              <th class="py-2 px-2 text-center">天気</th>
              <th class="py-2 px-2 text-center">最高</th>
              <th class="py-2 px-2 text-center">最低</th>
              <th class="py-2 px-2 text-center">降水</th>
              <th class="py-2 px-2 text-center hidden sm:table-cell">信頼度</th>
            </tr>
          </thead>
          <tbody>
            ${days.map(day => `
              <tr class="border-b border-gray-100">
                <td class="py-3 px-2 font-medium whitespace-nowrap">${day.date}(${day.dayName})</td>
                <td class="py-3 px-2 text-center">
                  <div class="flex items-center justify-center gap-1">
                    ${day.dayIcon ? `<img src="${day.dayIcon}" alt="${day.descriptionJa}" class="w-8 h-8" title="${day.descriptionJa}">` : '-'}
                  </div>
                </td>
                <td class="py-3 px-2 text-center text-red-500 font-medium">${day.tempMax}${day.tempMax !== '-' ? '°' : ''}</td>
                <td class="py-3 px-2 text-center text-blue-500 font-medium">${day.tempMin}${day.tempMin !== '-' ? '°' : ''}</td>
                <td class="py-3 px-2 text-center">${day.pop}${day.pop !== '-' ? '%' : ''}</td>
                <td class="py-3 px-2 text-center hidden sm:table-cell">${day.reliability}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `
}

export function renderWeatherMap(mapUrl) {
  return `
    <div class="bg-white rounded-xl shadow p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">天気図</h3>
      <div class="text-center">
        <img src="${mapUrl}" alt="天気図" class="max-w-full h-auto rounded-lg">
      </div>
    </div>
  `
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

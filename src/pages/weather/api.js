const BASE_URL = 'https://www.jma.go.jp/bosai'

export async function fetchAreaList() {
  const res = await fetch(`${BASE_URL}/common/const/area.json`)
  return res.json()
}

export async function fetchForecast(officeCode) {
  const res = await fetch(`${BASE_URL}/forecast/data/forecast/${officeCode}.json`)
  return res.json()
}

export async function fetchOverview(officeCode) {
  const res = await fetch(`${BASE_URL}/forecast/data/overview_forecast/${officeCode}.json`)
  return res.json()
}

export async function fetchWeatherMapUrl() {
  const res = await fetch(`${BASE_URL}/weather_map/data/list.json`)
  const data = await res.json()
  const images = data.near.now
  const latest = images[images.length - 1]
  return `${BASE_URL}/weather_map/data/png/${latest}`
}

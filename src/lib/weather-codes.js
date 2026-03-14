import weatherCodeData from '../data/weather_code.json'

const JMA_IMG_BASE = 'https://www.jma.go.jp/bosai/forecast/img/'

export function getWeatherInfo(code) {
  const entry = weatherCodeData[String(code)]
  if (!entry) return null
  return {
    dayIcon: JMA_IMG_BASE + entry[0],
    nightIcon: JMA_IMG_BASE + entry[1],
    categoryCode: entry[2],
    descriptionJa: entry[3],
    descriptionEn: entry[4],
  }
}

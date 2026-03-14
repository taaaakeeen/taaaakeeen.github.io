const STORAGE_KEY = 'weather_favorites'

export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addFavorite(officeCode) {
  const favorites = getFavorites()
  if (!favorites.includes(officeCode)) {
    favorites.push(officeCode)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }
}

export function removeFavorite(officeCode) {
  const favorites = getFavorites().filter(code => code !== officeCode)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export function isFavorite(officeCode) {
  return getFavorites().includes(officeCode)
}

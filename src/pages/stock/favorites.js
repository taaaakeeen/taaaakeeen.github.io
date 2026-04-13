const STORAGE_KEY = 'stock_favorites'

export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addFavorite(symbol, name) {
  const favorites = getFavorites()
  if (!favorites.some(f => f.symbol === symbol)) {
    favorites.push({ symbol, name })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }
}

export function removeFavorite(symbol) {
  const favorites = getFavorites().filter(f => f.symbol !== symbol)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export function isFavorite(symbol) {
  return getFavorites().some(f => f.symbol === symbol)
}

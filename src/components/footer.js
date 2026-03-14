export function renderFooter() {
  const footer = document.createElement('footer')
  footer.className = 'bg-gray-50 border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-500'
  footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} taaaakeeen</p>`
  return footer
}

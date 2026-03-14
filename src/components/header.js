const NAV_ITEMS = [
  { href: '/', label: 'Top', key: 'top' },
  { href: '/weather/', label: 'Weather', key: 'weather' },
  { href: '/note/', label: 'Note', key: 'note' },
]

export function renderHeader(currentPage) {
  const header = document.createElement('header')
  header.className = 'bg-white shadow-sm border-b border-gray-200'

  const navLinks = NAV_ITEMS.map(item => {
    const active = item.key === currentPage
    const cls = active
      ? 'text-blue-600 font-semibold'
      : 'text-gray-600 hover:text-blue-600 transition-colors'
    return `<a href="${item.href}" class="${cls}">${item.label}</a>`
  }).join('')

  const mobileLinks = NAV_ITEMS.map(item => {
    const active = item.key === currentPage
    const cls = active
      ? 'block px-4 py-2 text-blue-600 font-semibold bg-blue-50 rounded'
      : 'block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors'
    return `<a href="${item.href}" class="${cls}">${item.label}</a>`
  }).join('')

  header.innerHTML = `
    <nav class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-gray-800">taaaakeeen</a>
      <div class="hidden md:flex gap-6">${navLinks}</div>
      <button id="menu-toggle" class="md:hidden p-2 text-gray-600 hover:text-gray-900" aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </nav>
    <div id="mobile-menu" class="hidden md:hidden px-4 pb-3 space-y-1">${mobileLinks}</div>
  `

  const toggle = header.querySelector('#menu-toggle')
  const menu = header.querySelector('#mobile-menu')
  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden')
  })

  return header
}

import '../../styles/main.css'
import { renderHeader } from '../../components/header.js'
import { renderFooter } from '../../components/footer.js'

const app = document.getElementById('app')
app.appendChild(renderHeader('top'))

const main = document.createElement('main')
main.innerHTML = `
  <div class="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 class="text-4xl font-bold mb-4">taaaakeeen.github.io</h1>
    <p class="text-gray-500 mb-12">Personal website</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <a href="/weather/" class="block p-8 bg-white rounded-xl shadow hover:shadow-md transition group">
        <div class="text-4xl mb-3">&#9925;</div>
        <h2 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">Weather</h2>
        <p class="text-gray-500 text-sm">気象庁APIによる全国の天気予報</p>
      </a>
      <a href="/note/" class="block p-8 bg-white rounded-xl shadow hover:shadow-md transition group">
        <div class="text-4xl mb-3">&#128221;</div>
        <h2 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">Note</h2>
        <p class="text-gray-500 text-sm">日記・メモ</p>
      </a>
    </div>
  </div>
`
app.appendChild(main)
app.appendChild(renderFooter())

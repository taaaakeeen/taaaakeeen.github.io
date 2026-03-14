import '../../styles/main.css'
import { renderHeader } from '../../components/header.js'
import { renderFooter } from '../../components/footer.js'

const app = document.getElementById('app')
app.appendChild(renderHeader('note'))

const main = document.createElement('main')
main.className = 'max-w-4xl mx-auto px-4 py-8'
app.appendChild(main)
app.appendChild(renderFooter())

const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')

if (slug) {
  renderSingleNote(slug)
} else {
  renderNoteList()
}

async function renderNoteList() {
  try {
    const manifest = await import('../../generated/note-manifest.json')
    const notes = manifest.default || manifest

    if (notes.length === 0) {
      main.innerHTML = `
        <h1 class="text-3xl font-bold mb-8">Note</h1>
        <p class="text-gray-500">まだ投稿がありません。</p>
      `
      return
    }

    main.innerHTML = `
      <h1 class="text-3xl font-bold mb-8">Note</h1>
      <div class="space-y-4">
        ${notes.map(note => `
          <a href="/note/?slug=${note.slug}" class="block p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <time class="text-sm text-gray-400">${note.date}</time>
            <h2 class="text-lg font-semibold mt-1">${note.title}</h2>
            <p class="text-gray-600 text-sm mt-2">${note.excerpt}</p>
          </a>
        `).join('')}
      </div>
    `
  } catch (e) {
    main.innerHTML = `
      <h1 class="text-3xl font-bold mb-8">Note</h1>
      <p class="text-gray-500">投稿の読み込みに失敗しました。</p>
    `
  }
}

async function renderSingleNote(slug) {
  try {
    const noteModule = await import(`../../generated/${slug}.json`)
    const note = noteModule.default || noteModule

    main.innerHTML = `
      <div class="mb-6">
        <a href="/note/" class="text-sm text-blue-600 hover:text-blue-800">&larr; 一覧に戻る</a>
      </div>
      <article class="bg-white rounded-xl shadow p-8">
        <time class="text-sm text-gray-400">${note.date || ''}</time>
        <h1 class="text-2xl font-bold mt-2 mb-6">${note.title || slug}</h1>
        <div class="prose prose-gray max-w-none">
          ${note.html}
        </div>
      </article>
    `
  } catch (e) {
    main.innerHTML = `
      <div class="mb-6">
        <a href="/note/" class="text-sm text-blue-600 hover:text-blue-800">&larr; 一覧に戻る</a>
      </div>
      <p class="text-gray-500">記事が見つかりませんでした。</p>
    `
  }
}

import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NOTES_DIR = path.resolve(__dirname, '../src/notes')
const OUTPUT_DIR = path.resolve(__dirname, '../src/generated')

// Ensure directories exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(NOTES_DIR, { recursive: true })

const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'))
const manifest = []

for (const file of files) {
  const raw = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8')
  const { data: frontMatter, content } = matter(raw)
  const html = marked(content)
  const slug = file.replace('.md', '')

  manifest.push({
    slug,
    title: frontMatter.title || slug,
    date: frontMatter.date ? String(frontMatter.date).split('T')[0] : '',
    excerpt: frontMatter.excerpt || content.substring(0, 150).replace(/[#*_\n]/g, '').trim() + '...',
  })

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${slug}.json`),
    JSON.stringify({ ...frontMatter, slug, html })
  )
}

manifest.sort((a, b) => new Date(b.date) - new Date(a.date))
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'note-manifest.json'),
  JSON.stringify(manifest, null, 2)
)

console.log(`Built ${manifest.length} note(s)`)

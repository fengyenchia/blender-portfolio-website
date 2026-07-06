import Welcome from '@/markdown/welcome.mdx'
 
export default function Page() {
  return (
      <main className="p-8 min-h-screen bg-neutral-50"> 
      {/* 使用 prose 讓 Markdown 樣式現形 */}
      <div className="prose prose-stone">
        <Welcome />
      </div>
    </main>
  )
}
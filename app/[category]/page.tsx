// app/[category]/page.tsx
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // 統一的課表資料
  const courses = [
    { slug: 'threeD-computer-animation-foundation', name: '基礎動畫設計' },
    { slug: 'computer-animation', name: '電腦動畫' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link 
            key={course.slug} 
            href={`/${category}/${course.slug}`}
            className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-neutral-50"
          >
            <h2 className="text-xl font-medium">{course.name}</h2>
            <p className="text-neutral-500 mt-2 text-sm">查看所有章節與內容</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
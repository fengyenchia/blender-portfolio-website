import Link from 'next/link';
import { AllData } from '@/config/AllData';

export default async function CoursePage({ params }: { params: Promise<{ category: string; course: string }> }) {
  const { category, course } = await params;

  // 直接從中央資料庫撈取對應分類與課名的資料
  const currentCategory = AllData[category] || [];
  const currentCourse = currentCategory.find(c => c.slug === course);
  const list = currentCourse ? currentCourse.weeks : [];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">{currentCourse?.name || '內容清單'}</h1>
      <ul className="space-y-3">
        {list.map((item) => (
          <li key={item.slug}>
            {item.children?.length ? (
              <div className="border border-neutral-200 bg-white p-5">
                <h2 className="mb-4 text-lg font-semibold">{item.name}</h2>
                <ul className="space-y-2">
                  {item.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/${category}/${course}/${item.slug}/${child.slug}`}
                        className="block border border-neutral-200 px-4 py-3 transition hover:border-neutral-900"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link href={`/${category}/${course}/${item.slug}`}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

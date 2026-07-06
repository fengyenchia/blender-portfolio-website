import { notFound } from "next/navigation";
import Link from "next/link";

// 引入中央資料庫
import { AllData } from "@/config/AllData";

export default async function WeeklyContentPage({ params }: { params: Promise<{ category: string; course: string; weekly: string }> }) {
  const { category, course, weekly } = await params;

  // 💡 1. 從中央資料庫撈取對應的週次標題資料
  const currentCategory = AllData[category.toLowerCase() as keyof typeof AllData] || [];
  const currentCourse = currentCategory.find((c) => c.slug === course);
  const currentWeek = currentCourse?.weeks.find((w) => w.slug === weekly);

  
  // 💡 2. 如果資料庫找不到這週，或是下面 import 失敗，都直接噴 404
  if (!currentWeek) {
    notFound();
  }

  if (currentWeek.children?.length) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-12 text-neutral-900">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold">{currentWeek.name}</h1>
          <ul className="space-y-3">
            {currentWeek.children.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${category}/${course}/${weekly}/${item.slug}`}
                  className="block border border-neutral-200 bg-white px-5 py-4 transition hover:border-neutral-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // 💡 預先抓出這一週的圖片，如果沒設定就用預設的 banner.png
  const bannerImage = currentWeek.image || '/images/banner.png';
  
  let MDXContent;

  try {
    const mdxModule = await import(`@/markdown/${category}/${course}/${weekly}.mdx`);
    MDXContent = mdxModule.default;
  } catch {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-neutral-900">
      <div 
        className="relative w-full h-[30vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${bannerImage}')` }}
      >
        <div className="absolute inset-0" />
          <h1 className="w-full px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:translate-y-0 text-md md:text-4xl font-bold text-zinc-50 text-center">
            {currentWeek.name}
          </h1>
      </div>

      {/* 💡 3. 只在真正需要排版的 MDX 內文區塊加上 prose */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:p-12 prose prose-neutral text-neutral-900">
        <MDXContent />
      </div>
    </div>
  );
}

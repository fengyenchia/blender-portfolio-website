import { notFound } from "next/navigation";

import { AllData } from "@/config/AllData";

export default async function NestedWeeklyContentPage({
  params,
}: {
  params: Promise<{ category: string; course: string; weekly: string; detail: string }>;
}) {
  const { category, course, weekly, detail } = await params;

  const currentCategory = AllData[category.toLowerCase() as keyof typeof AllData] || [];
  const currentCourse = currentCategory.find((c) => c.slug === course);
  const currentGroup = currentCourse?.weeks.find((w) => w.slug === weekly);
  const currentWeek = currentGroup?.children?.find((w) => w.slug === detail);

  if (!currentWeek) {
    notFound();
  }

  const bannerImage = currentWeek.image || "/images/banner.png";

  let MDXContent;

  try {
    const mdxModule = await import(`@/markdown/${category}/${course}/${detail}.mdx`);
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
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="w-full px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:-translate-y-0 text-md md:text-4xl font-bold text-zinc-50 text-center">
          {currentWeek.name}
        </h1>
      </div>

      <div className="max-w-6xl max-w-none mx-auto px-6 py-8 md:p-12 prose prose-neutral text-neutral-900">
        <MDXContent />
      </div>
    </div>
  );
}

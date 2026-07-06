import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const education = [
  {
    period: "2023 - Now",
    title: "國立政治大學",
    detail: "廣告學系",
  },
  {
    period: "2024 - Now",
    title: "國立政治大學",
    detail: "數位內容與科技學士學位學程",
  },
];

const experience = [
  {
    period: "2025/02 - Now",
    title: "國立政治大學 抓馬戲劇社",
    detail: "美宣",
  },
  {
    period: "2025/09 - 2025/12",
    title: "國立政治大學 區塊鏈應用展覽",
    detail: "《N{}U--Undefined 一切尚在編譯中》主視覺",
  },
  {
    period: "2025/09 - 2025/12",
    title: "國立政治大學 傳播學院數位平台年度大展",
    detail: "展覽組長",
  },
  {
    period: "2025/02 - 2025/12",
    title: "國立政治大學 傳播學院數位平台",
    detail: "教學組長",
  },
  {
    period: "2023/09 - 2023/12",
    title: "國立政治大學 包種茶節",
    detail: "視覺設計組",
  },
];

const skills = [
  {
    title: "Design & Creative",
    detail: "Adobe Illustrator / Photoshop / Lightroom / Figma",
  },
  {
    title: "Coding & Interaction",
    detail: "HTML / CSS / JavaScript / p5.js / Python / C++ / C#",
  },
];

const awards = [
  {
    period: "114-1",
    title: "書卷獎",
  },
  {
    period: "114-1",
    title: "全國高中職暨大專院校 Future Young Lions 坎城國際未來獅創意影片大賽 大專院校組 銀獎",
  },
  {
    period: "113-2",
    title: "創意與設計 AR 遊戲專題 金獎",
  },
  {
    period: "113-1",
    title: "書卷獎",
  },
  {
    period: "112-1",
    title: "書卷獎",
  },
];

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-neutral-200 py-8 md:grid-cols-[160px_1fr]">
      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function Resume() {
  return (
    <main className="min-h-screen bg-zinc-50 text-neutral-900">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[360px_1fr] md:px-12">
        <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-200">
          <Image
            src="/images/resume/profile.jpg"
            alt="Yen-Chia Feng"
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover rounded-sm"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Resume</p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">馮妍嘉 Yen-Chia Feng</h1>
          <p className="mt-4 text-lg text-neutral-700">
            國立政治大學 廣告學系 & 數位內容學程
          </p>
          <p className="mt-8 max-w-2xl leading-8 text-neutral-700">
            我是個熱衷於嘗試新事物且喜歡挑戰的人。對我來說，設計的靈感來自生活，我時常將設計與科技結合，透過程式、互動技術或其他數位工具，讓創意與美的展現有更多可能。我也擅長以簡潔的線條、擬人的物件，搭配可愛的色彩呈現作品，傳達活潑且讓人眼前一亮的感覺。
          </p>
          <div className="mt-8 flex justify-end">
            <Link
              href="/files/resume/gc-resume.pdf"
              target="_blank"
              className="inline-flex border border-neutral-900 px-5 py-3 text-sm font-semibold uppercase tracking-wider no-underline transition hover:bg-neutral-900 hover:text-white"
            >
              My Resume
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-12">
        <ResumeSection title="學歷">
          <div className="space-y-5">
            {education.map((item) => (
              <div key={`${item.period}-${item.detail}`} className="grid gap-2 md:grid-cols-[180px_1fr]">
                <p className="text-neutral-500">{item.period}</p>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-neutral-700">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="經歷">
          <div className="space-y-5">
            {experience.map((item) => (
              <div key={`${item.period}-${item.detail}`} className="grid gap-2 md:grid-cols-[180px_1fr]">
                <p className="text-neutral-500">{item.period}</p>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-neutral-700">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="技能">
          <div className="space-y-5">
            {skills.map((item) => (
              <div key={item.title} className="grid gap-2 md:grid-cols-[180px_1fr]">
                <p className="font-bold text-neutral-800">{item.title}</p>
                <p className="text-neutral-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="榮譽">
          <div className="space-y-5">
            {awards.map((item) => (
              <div key={`${item.period}-${item.title}`} className="grid gap-2 md:grid-cols-[180px_1fr]">
                <p className="text-neutral-500">{item.period}</p>
                <p className="text-neutral-800">{item.title}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Contact">
          <div className="space-y-5">
            <div className="grid gap-2 md:grid-cols-[180px_1fr]">
              <p className="font-bold text-neutral-800">Email</p>
              <Link href="mailto:yanjia20050504@gmail.com" className="text-neutral-700 underline underline-offset-4">
                yanjia20050504@gmail.com
              </Link>
            </div>
            <div className="grid gap-2 md:grid-cols-[180px_1fr]">
              <p className="font-bold text-neutral-800">Phone</p>
              <p className="text-neutral-700">0958543915</p>
            </div>
            <div className="grid gap-2 md:grid-cols-[180px_1fr]">
              <p className="font-bold text-neutral-800">Line ID</p>
              <p className="text-neutral-700">yenchia0504</p>
            </div>
          </div>
        </ResumeSection>
      </section>
    </main>
  );
}

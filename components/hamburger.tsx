"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// 💡 引入同一個中央資料庫
import { AllData } from "@/config/AllData";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 💡 用來紀錄手機版目前展開哪一個大分類 (HOMEWORK / PROJECT / PAPER)
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 💡 將中央資料轉換成手機版適用的結構
  const mobileNavItems = [
    { name: "HOME", href: "/" },
    { name: "RESUME", href: "/resume" },
    { name: "HOMEWORK", categories: AllData.homework, type: "homework" },
    { name: "PROJECT", categories: AllData.project, type: "project" },
    { name: "PAPER", categories: AllData.paper, type: "paper" },
  ];

  return (
    <div className="md:hidden">
      {/* 漢堡按鈕 */}
      <button onClick={() => setIsOpen(true)} className="text-neutral-900 focus:outline-none flex items-center">
        <Menu className="w-6 h-6" />
      </button>

      {/* 側邊欄動畫 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* 側邊導覽欄主體 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl z-50 p-6 flex flex-col overflow-y-auto"
            >
              {/* 關閉按鈕 */}
              <div className="flex justify-end mb-6">
                <button onClick={() => setIsOpen(false)} className="p-1">
                  <X className="w-6 h-6 text-neutral-600" />
                </button>
              </div>

              {/* 選單列表 */}
              <nav className="flex flex-col gap-3 text-sm font-medium text-neutral-600">
                {mobileNavItems.map((item) => {
                  // 情境 A：沒有子選單的項目 (HOME, RESUME)
                  if (item.href) {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`py-2 px-3 text-left transition-all ${
                          isActive ? "bg-neutral-100 text-neutral-900 font-semibold" : "hover:bg-neutral-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  }

                  // 情境 B：擁有課程與週次的三層選單
                  const isExpanded = expandedSection === item.name;
                  const hasActiveChild = pathname.startsWith(`/${item.type}`);

                  return (
                    <div key={item.name} className="flex flex-col">
                      {/* 第一層大標題：點擊切換展開/收合 */}
                      <button
                        onClick={() => toggleSection(item.name)}
                        className={`py-2 px-3 flex justify-between items-center text-left transition-all ${
                          hasActiveChild ? "text-neutral-900 font-semibold" : "hover:bg-neutral-50"
                        }`}
                      >
                        <span>{item.name}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* 第二、三層展開區塊 */}
                      <AnimatePresence>
                        {isExpanded && item.categories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 flex flex-col gap-2 border-l border-neutral-100 ml-3 mt-1"
                          >
                            {item.categories.map((course) => (
                              <div key={course.slug} className="flex flex-col gap-1 mt-1">
                                {/* 第二層：課名（僅作提示，不可點擊） */}
                                <span className="text-xs text-neutral-600 font-semibold px-2 py-1">
                                  {course.name}
                                </span>

                                {/* 第三層：每週週次連結（真正可點擊） */}
                                {course.weeks.map((week) => {
                                  const targetHref = `/${item.type}/${course.slug}/${week.slug}`;
                                  const isWeekActive = pathname === targetHref;

                                  return (
                                    <Link
                                      key={week.slug}
                                      href={targetHref}
                                      onClick={() => setIsOpen(false)}
                                      className={`text-xs py-1.5 px-3 text-left transition-all ${
                                        isWeekActive 
                                          ? "bg-neutral-900 text-white font-normal" 
                                          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                                      }`}
                                    >
                                      {week.navName ?? week.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

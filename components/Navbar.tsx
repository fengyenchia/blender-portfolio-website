"use client";

import React, { useState, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import Hamburger from "./hamburger";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

// 引入中央資料庫
import { AllData } from "@/config/AllData";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;
    if (diff > 0 && latest > 40) {
      setHidden(true);
      setActive(null);
      setActiveCourse(null);
      setActiveGroup(null);
    } else if (diff < -5 || latest < 20) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // 💡 1. 調整資料結構：移除大分類的 href，並把第二層的識別路徑寫在 courseSlug
  const navItems = [
    { item: "HOME", href: "/" },
    { item: "RESUME", href: "/resume" },
    {
      item: "HOMEWORK",
      // href 設為 undefined 讓大標題無法點擊
      children: AllData.homework.map((course) => ({
        name: course.name,
        courseSlug: `/homework/${course.slug}`, // 用作滑鼠懸停比對的唯一 Key
        weeks: course.weeks.map((w) => ({
          name: w.name,
          href: `/homework/${course.slug}/${w.slug}`,
          children: w.children?.map((child) => ({
            name: child.name,
            href: `/homework/${course.slug}/${w.slug}/${child.slug}`,
          })),
        })),
      })),
    },
    {
      item: "PROJECT",
      children: AllData.project.map((course) => ({
        name: course.name,
        courseSlug: `/project/${course.slug}`,
        weeks: course.weeks.map((w) => ({
          name: w.name,
          href: `/project/${course.slug}/${w.slug}`,
          children: w.children?.map((child) => ({
            name: child.name,
            href: `/project/${course.slug}/${w.slug}/${child.slug}`,
          })),
        })),
      })),
    },
    {
      item: "PAPER",
      children: AllData.paper.map((course) => ({
        name: course.name,
        courseSlug: `/paper/${course.slug}`,
        weeks: course.weeks.map((w) => ({
          name: w.name,
          href: `/paper/${course.slug}/${w.slug}`,
          children: w.children?.map((child) => ({
            name: child.name,
            href: `/paper/${course.slug}/${w.slug}/${child.slug}`,
          })),
        })),
      })),
    },
  ];

  return (
    <motion.div
      animate={hidden ? "hidden" : "visible"}
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("fixed top-0 inset-x-0 w-full mx-auto z-50 shadow-xs", hidden && "pointer-events-none")}
    >
      <Menu setActive={(val) => { setActive(val); if(!val) { setActiveCourse(null); setActiveGroup(null); } }}>
        <div className="w-full h-full flex items-center justify-center gap-16 mx-auto">
          
          {/* Logo */}
          <div className="h-full w-full flex items-center justify-start">
            <Link href="/">
              <p className="text-neutral-900 text-lg font-semibold">Yen-Chia, Feng</p>
            </Link>
          </div>

          {/* Navigation Items */}
          <Hamburger />
          <div className="hidden w-full h-full md:flex items-center justify-end gap-12 mx-auto">
            {navItems.map((nav) => {
              // 修正底線高亮邏輯：只要目前網址包含對應的大分類文字（例如 /homework），底線就亮起
              const isActivePage = nav.href ? pathname === nav.href : pathname.startsWith(`/${nav.item.toLowerCase()}`);

              return (
                <div key={nav.item} className="relative py-2 flex flex-col items-center">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item={nav.item}
                    href={nav.href} // HOME 和 RESUME 有傳值可點擊，其他為 undefined 無法點擊
                  >
                    {/* 第二層：課名選單 */}
                    {nav.children &&
                      nav.children.map((child) => (
                        <div 
                          key={child.courseSlug}
                          className="relative"
                          onMouseEnter={() => setActiveCourse(child.courseSlug)}
                        >
                          {/* 把 <HoveredLink> 換成普通的 <div>，讓第二層文字完全無法被點擊 */}
                          <div className="cursor-default">
                            <span className="text-sm whitespace-nowrap py-1 px-1 rounded-xs hover:text-neutral-900 text-neutral-500 transition-colors flex justify-between items-center gap-4">
                              {child.name}
                            </span>
                          </div>

                          {/* 第三層：每週週次（只有這裡維持 <HoveredLink> 可點擊跳轉） */}
                          {activeCourse === child.courseSlug && child.weeks && child.weeks.length > 0 && (
                            <div className="absolute top-0 right-[119%] z-100">
                              <div className="bg-white rounded-xs shadow-md border border-neutral-100 p-3 flex flex-col gap-2 min-w-[220px]">
                                {child.weeks.map((week) => (
                                  <div
                                    key={week.href}
                                    className="relative"
                                    onMouseEnter={() => setActiveGroup(week.href)}
                                  >
                                    {week.children?.length ? (
                                      <span className="text-xs whitespace-nowrap block py-1 px-1 rounded-xs hover:text-neutral-900 text-neutral-500 transition-colors cursor-default">
                                        {week.name}
                                      </span>
                                    ) : (
                                      <HoveredLink href={week.href}>
                                        <span className="text-xs whitespace-nowrap block py-1 px-1 rounded-xs hover:text-neutral-900 text-neutral-500 transition-colors cursor-pointer">
                                          {week.name}
                                        </span>
                                      </HoveredLink>
                                    )}

                                    {activeGroup === week.href && week.children?.length && (
                                      <div className="absolute top-0 right-[105%] z-100">
                                        <div className="bg-white rounded-xs shadow-md border border-neutral-100 p-3 flex flex-col gap-2 min-w-[220px]">
                                          {week.children.map((detail) => (
                                            <HoveredLink key={detail.href} href={detail.href}>
                                              <span className="text-xs whitespace-nowrap block py-1 px-1 rounded-xs hover:text-neutral-900 text-neutral-500 transition-colors cursor-pointer">
                                                {detail.name}
                                              </span>
                                            </HoveredLink>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </MenuItem>

                  {/* 底線動畫 */}
                  {isActivePage && (
                    <motion.div
                      layoutId="active-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </Menu>
    </motion.div>
  );
}

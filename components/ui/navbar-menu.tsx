"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// navbar-menu.tsx 中修改 MenuItem
export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  children, // 💡 新增 children
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href?: string;
  children?: React.ReactNode; // 💡 新增型別定義
}) => {
  const itemText = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer text-primary hover:opacity-[0.9] hover:scale-105 transition-all duration-200"
    >
      {item}
    </motion.p>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href ? (
        <Link href={href}>
          {itemText}
        </Link>
      ) : (
        itemText
      )}

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && ( // 💡 只有當 active 且有傳入 children 時才顯示下拉框
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-xs overflow-visible shadow-sm" 
              >
                <div className="w-max h-full p-4 flex flex-col gap-3">
                  {children}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};



export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative bg-white text-primary text-sm flex justify-center px-8 md:px-12 py-4 gap-8"
    >
      {children}
    </nav>
  );
};


export const HoveredLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => {
  return (
    <Link
      href={href || "#"}
      className="text-primary hover:text-black "
      {...rest}
    >
      {children}
    </Link>
  );
};
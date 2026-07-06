import React from "react";

interface LinkItem {
  label: string; // 左側的項目名稱，例如 "Blender 檔案"、"程式碼"
  text: string;  // 按鈕內的文字，例如 "FILE LINK"
  href: string;  // 連結網址
}

interface ProjectMetaProps {
  hours: string | number;       // 製作時數（數字或字串，如 "6" 或 "12 小時"）
  links?: LinkItem[];          // 可選的按鈕行陣列
}

export default function MarkdownMeta({ hours, links = [] }: ProjectMetaProps) {
  return (
    <div className="w-full max-w-2xl text-sm">
      <div className="flex flex-col gap-4">
        
        {/* 第一行：製作時數（文字固定） */}
        <div className="grid grid-cols-[200px_1fr] items-center">
          <span className="font-bold text-neutral-800">製作時數</span>
          <span className="text-neutral-600">
            {typeof hours === "number" || !hours.toString().includes("小時") 
              ? `${hours} 小時` 
              : hours}
          </span>
        </div>

        {/* 動態按鈕行數 */}
        {links.map((link, index) => (
          <div key={index} className="grid grid-cols-[200px_1fr] items-center">
            <span className="font-bold text-neutral-800">{link.label}</span>
            <div>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xs no-underline inline-block px-4 py-2 border border-neutral-900 text-xs tracking-wider text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors duration-600 uppercase"
              >
                {link.text}
              </a>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
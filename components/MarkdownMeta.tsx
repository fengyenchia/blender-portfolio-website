import React from "react";

interface LinkItem {
  label: string;
  text: string;
  href: string;
}

interface ProjectMetaProps {
  hours?: string | number | string[];
  links?: LinkItem[];
}

export default function MarkdownMeta({ hours, links = [] }: ProjectMetaProps) {
  const hourRows =
    hours === undefined
      ? []
      : Array.isArray(hours)
        ? hours
        : [typeof hours === "number" || !hours.toString().includes("小時") ? `${hours} 小時` : hours];

  return (
    <div className="mt-4 mb-8 w-full max-w-4xl text-sm">
      <div className="flex flex-col gap-4">
        {hourRows.length > 0 && (
          <div className="grid grid-cols-[320px_1fr] items-start gap-4">
            <span className="font-bold text-neutral-800">製作時數</span>
            <div className="flex flex-col gap-4 text-neutral-600">
              {hourRows.map((row, index) => (
                <span key={index}>{row}</span>
              ))}
            </div>
          </div>
        )}

        {links.map((link, index) => (
          <div key={index} className="grid grid-cols-[320px_1fr] items-center gap-4">
            <span className="font-bold text-neutral-800">{link.label}</span>
            <div>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xs border border-neutral-900 px-4 py-2 text-xs tracking-wider text-neutral-600 uppercase no-underline transition-colors duration-600 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
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

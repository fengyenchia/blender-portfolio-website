import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const websiteDir = path.join(root, "website");
const uploadsDir = path.join(websiteDir, "uploads");
const publicImagesDir = path.join(root, "public", "images");
const publicFilesDir = path.join(root, "public", "files");
const publicThumbsDir = path.join(root, "public", "thumbs");
const backgroundThumbsDir = path.join(uploadsDir, "1", "5", "5", "0", "155080834", "background-images", "background-images", "thumbs");

const pages = [
  { category: "homework", html: "hw02.html", slug: "CG_HW02", assetFolder: "hw02" },
  { category: "homework", html: "hw03.html", slug: "CG_HW03", assetFolder: "hw03" },
  { category: "homework", html: "hw04.html", slug: "CG_HW04", assetFolder: "hw04" },
  { category: "homework", html: "hw07.html", slug: "CG_HW07", assetFolder: "hw07" },
  { category: "homework", html: "hw10.html", slug: "CG_HW10", assetFolder: "hw10" },
  { category: "homework", html: "hw11.html", slug: "CG_HW11", assetFolder: "hw11" },
  { category: "homework", html: "hw14.html", slug: "CG_HW14", assetFolder: "hw14" },
  { category: "project", html: "project01.html", slug: "CG_Proj01", assetFolder: "project01", group: "project01", titleOverride: "PROJECT01" },
  { category: "project", html: "project02_w11.html", slug: "CG_Proj02_W11", assetFolder: "project02-w11", group: "project02", titleOverride: "PROJECT02_W11" },
  { category: "project", html: "project02_w12.html", slug: "CG_Proj02_W12", assetFolder: "project02-w12", group: "project02", titleOverride: "PROJECT02_W12" },
  { category: "project", html: "project02_w13.html", slug: "CG_Proj02_W13", assetFolder: "project02-w13", group: "project02", titleOverride: "PROJECT02_W13" },
  { category: "project", html: "project02_w14.html", slug: "CG_Proj02_W14", assetFolder: "project02-w14", group: "project02", titleOverride: "PROJECT02_W14" },
  { category: "project", html: "project02_w15.html", slug: "CG_Proj02_W15", assetFolder: "project02-w15", group: "project02", titleOverride: "PROJECT02_W15" },
  { category: "project", html: "project02_w16_final.html", slug: "CG_Proj02_W16_Final", assetFolder: "project02-w16-final", group: "project02", titleOverride: "PROJECT02_W16_FINAL" },
  { category: "paper", html: "paper01.html", slug: "CG_Paper01", assetFolder: "paper01" },
  { category: "paper", html: "paper02.html", slug: "CG_Paper02", assetFolder: "paper02" },
  { category: "paper", html: "paper03.html", slug: "CG_Paper03", assetFolder: "paper03" },
];

const entityMap = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "-",
  mdash: "-",
  hellip: "...",
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
};

function decodeEntities(value = "") {
  return value
    .replace(/\\u([\da-fA-F]{4})/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/&#x([\da-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => entityMap[name] ?? match);
}

function stripTags(value = "") {
  return decodeEntities(value.replace(/<[^>]+>/g, " "))
    .replace(/\u200b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeMdx(value = "") {
  return value.replace(/[{}<>]/g, (char) => {
    if (char === "{") return "&#123;";
    if (char === "}") return "&#125;";
    if (char === "<") return "&lt;";
    return "&gt;";
  });
}

function jsString(value = "") {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "\\n");
}

function htmlToMarkdown(value = "") {
  let out = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/li>/gi, "")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, text) => `**${stripTags(text)}**`)
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, text) => `**${stripTags(text)}**`)
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const label = stripTags(text) || href;
      return `[${escapeMdx(label)}](${decodeEntities(href)})`;
    });

  out = decodeEntities(out.replace(/<[^>]+>/g, " "))
    .replace(/\u200b/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n");

  return escapeMdx(out);
}

function findAllFiles(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findAllFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const uploadFilesByName = new Map();
for (const file of findAllFiles(uploadsDir)) {
  const name = path.basename(file).toLowerCase();
  if (!uploadFilesByName.has(name)) {
    uploadFilesByName.set(name, file);
  }
}

function sourceForUrl(rawUrl) {
  const url = decodeEntities(rawUrl).split("?")[0].replaceAll("\\/", "/");
  const normalized = url.replace(/^\/+/, "");
  const candidates = [];

  if (normalized.startsWith("uploads/")) {
    candidates.push(path.join(websiteDir, normalized));
  } else {
    candidates.push(path.join(uploadsDir, normalized));
    candidates.push(path.join(websiteDir, normalized));
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const baseName = path.basename(normalized).toLowerCase();
  const direct = uploadFilesByName.get(baseName);
  if (direct) return direct;

  const extension = path.extname(baseName);
  const stem = baseName.slice(0, baseName.length - extension.length);
  return uploadFilesByName.get(`${stem}_orig${extension}`) ?? null;
}

function copyAsset(rawUrl, page) {
  const source = sourceForUrl(rawUrl);
  if (!source) {
    return null;
  }

  const destinationDir = path.join(publicImagesDir, page.category, "computer-animation", page.assetFolder);
  fs.mkdirSync(destinationDir, { recursive: true });

  const baseName = path.basename(source);
  const destination = path.join(destinationDir, baseName);
  fs.copyFileSync(source, destination);

  return `/images/${page.category}/computer-animation/${page.assetFolder}/${baseName}`;
}

function copyLinkedFile(rawUrl, page) {
  const source = sourceForUrl(rawUrl);
  if (!source) {
    return decodeEntities(rawUrl);
  }

  const destinationDir = path.join(publicFilesDir, page.category, "computer-animation", page.assetFolder);
  fs.mkdirSync(destinationDir, { recursive: true });

  const baseName = path.basename(source);
  fs.copyFileSync(source, path.join(destinationDir, baseName));

  return `/files/${page.category}/computer-animation/${page.assetFolder}/${baseName}`;
}

function publicPathToFile(publicPath) {
  return path.join(root, "public", publicPath.replace(/^\//, ""));
}

function copyThumb(publicPath, page) {
  const source = publicPathToFile(publicPath);
  const fallback = path.join(root, "public", "images", "banner.png");
  const thumbSource = fs.existsSync(source) ? source : fallback;
  if (!fs.existsSync(thumbSource)) {
    return publicPath;
  }

  const destinationDir = path.join(publicThumbsDir, page.category, "computer-animation", page.assetFolder);
  fs.mkdirSync(destinationDir, { recursive: true });

  const baseName = path.basename(thumbSource);
  fs.copyFileSync(thumbSource, path.join(destinationDir, baseName));
  return `/thumbs/${page.category}/computer-animation/${page.assetFolder}/${baseName}`;
}

function singleImageMdx(src, alt) {
  const rawCaption = stripGenericCaption(alt);
  const caption = escapeMdx(rawCaption);
  const captionLine = caption ? `\n  <p className="-mt-2 text-sm text-slate-500">${caption}</p>` : "";
  return `<div className="flex flex-col items-center justify-center">\n  <Image\n    src="${src}"\n    alt="${jsString(caption || "image")}"\n    width={900}\n    height={506}\n    className="h-auto w-full max-w-3xl object-contain"\n  />${captionLine}\n</div>`;
}

function normalizeYouTubeEmbedUrl(rawUrl = "") {
  const decoded = decodeEntities(rawUrl).replace(/^http:\/\//i, "https://");
  try {
    const url = new URL(decoded);
    if (!url.hostname.includes("youtube.com") && !url.hostname.includes("youtu.be")) {
      return null;
    }

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "");
      if (!id) return null;
      const start = url.searchParams.get("t");
      return `https://www.youtube.com/embed/${id}${start ? `?start=${timeToSeconds(start)}` : ""}`;
    }

    if (url.pathname.startsWith("/embed/")) {
      const id = url.pathname.split("/").filter(Boolean)[1];
      if (!id) return null;
      const start = url.searchParams.get("start") || url.searchParams.get("t");
      return `https://www.youtube.com/embed/${id}${start ? `?start=${timeToSeconds(start)}` : ""}`;
    }

    const id = url.searchParams.get("v");
    if (!id) return null;
    const start = url.searchParams.get("t");
    return `https://www.youtube.com/embed/${id}${start ? `?start=${timeToSeconds(start)}` : ""}`;
  } catch {
    return null;
  }
}

function timeToSeconds(value = "") {
  if (/^\d+$/.test(value)) return value;
  const match = value.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?/i);
  if (!match) return value;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return String(hours * 3600 + minutes * 60 + seconds);
}

function youtubeEmbedMdx(src, index) {
  const embedUrl = normalizeYouTubeEmbedUrl(src);
  if (!embedUrl) return "";
  return `<YouTubeEmbed src="${jsString(embedUrl)}" title="YouTube video ${index}" />`;
}

function stripGenericCaption(value = "") {
  const text = value.replace(/Picture/gi, "").trim();
  return /^image$/i.test(text) ? "" : text;
}

function headingMarkdown(text = "") {
  const normalized = text.replace(/\*/g, "").trim();
  if (/^step\s*\d/i.test(normalized) && normalized.length <= 80) {
    return `### ${escapeMdx(normalized)}`;
  }

  const mainHeadingPatterns = [
    /^作品技術概念/,
    /^節點概念說明/,
    /^技術概念說明/,
    /^過程記錄截圖/,
    /^自我評量與作品建議/,
    /^解決問題之能力與參考資源/,
  ];

  if (mainHeadingPatterns.some((pattern) => pattern.test(normalized))) {
    return `## ${escapeMdx(normalized)}`;
  }

  return "";
}

function formatTextBlock(text = "") {
  return text
    .split("\n")
    .map((line) => headingMarkdown(line) || line)
    .join("\n");
}

function extractHeroBackground(html) {
  const match = html.match(/background-image:\s*url\((?:&quot;|["']?)([^"'&)]+)(?:&quot;|["']?)\)/i);
  return match?.[1] ?? null;
}

function copyHeroThumb(rawUrl, page) {
  if (!rawUrl) {
    return null;
  }

  const baseName = path.basename(decodeEntities(rawUrl).split("?")[0]);
  const fullSizeSource = path.join(path.dirname(backgroundThumbsDir), baseName);
  const thumbSource = path.join(backgroundThumbsDir, baseName);
  const source = fs.existsSync(fullSizeSource) ? fullSizeSource : thumbSource;
  if (!fs.existsSync(source)) {
    return null;
  }

  const destinationDir = path.join(publicThumbsDir, page.category, "computer-animation", page.assetFolder);
  fs.mkdirSync(destinationDir, { recursive: true });
  fs.copyFileSync(source, path.join(destinationDir, baseName));
  return `/thumbs/${page.category}/computer-animation/${page.assetFolder}/${baseName}`;
}

function parseSlides(script, page, index) {
  const imagesMatch = script.match(/images\s*:\s*(\[[\s\S]*?\])\s*\}\)/);
  if (!imagesMatch) {
    return "";
  }

  let images;
  try {
    images = Function(`"use strict"; return (${imagesMatch[1]});`)();
  } catch {
    return "";
  }

  const items = images
    .map((image) => {
      const copied = copyAsset(image.url, page);
      if (!copied) return null;
      const caption = escapeMdx(decodeEntities(image.caption || ""));
      return `    { src: "${copied}", caption: "${jsString(caption || " ")}" }`;
    })
    .filter(Boolean);

  if (items.length === 0) {
    return "";
  }

  return `<ImageCarousel\n  label="${jsString(`${page.slug} slideshow ${index}`)}"\n  images={[\n${items.join(",\n")}\n  ]}\n/>`;
}

function extractButtons(html, page) {
  const buttons = [];
  const buttonRegex = /<a\b[^>]*class=["'][^"']*wsite-button[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?<span class=["']wsite-button-inner["']>([\s\S]*?)<\/span>[\s\S]*?<\/a>/gi;
  let match;

  while ((match = buttonRegex.exec(html))) {
    const rawHref = decodeEntities(match[1]);
    const href = rawHref.startsWith("uploads/") ? copyLinkedFile(rawHref, page) : rawHref;
    const text = stripTags(match[2]) || "Link";
    if (!href || href === "#") continue;

    const before = html.slice(Math.max(0, match.index - 900), match.index);
    const labels = [...before.matchAll(/<div class="paragraph"[\s\S]*?>([\s\S]*?)<\/div>/gi)]
      .map((labelMatch) => stripTags(labelMatch[1]))
      .filter(Boolean);
    const rawLabel = labels.at(-1) || text;
    const label = /小時|\d+\s*hours?/i.test(rawLabel) ? text : rawLabel;

    buttons.push({ label, text, href });
  }

  return buttons;
}

function extractHours(html) {
  const match = stripTags(html).match(/(\d+(?:\.\d+)?)\s*小時/);
  return match ? Number(match[1]) : null;
}

function splitWeeklyHours(value = "") {
  const plain = value.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
  const parts = [...plain.matchAll(/\[week\d+\][\s\S]*?(?=\s*\[week\d+\]|$)/gi)]
    .map((match) => match[0].trim())
    .filter(Boolean);
  return parts.length ? parts : null;
}

function isWeeklyHoursText(value = "") {
  const plain = value.replace(/\*\*/g, "").trim();
  return /\[week\d+\]/i.test(plain) && /\d/.test(plain) && /(?:小時|撠?)/.test(plain);
}

function extractDetailedHours(html) {
  const weeklyHours = [...html.matchAll(/<div class="paragraph"[\s\S]*?>([\s\S]*?)<\/div>/gi)]
    .map((match) => stripTags(match[1]))
    .find((text) => isWeeklyHoursText(text));

  if (weeklyHours) {
    return splitWeeklyHours(weeklyHours) ?? weeklyHours;
  }

  const match = stripTags(html).match(/(\d+(?:\.\d+)?)\s*(?:小時|撠?)/);
  return match ? Number(match[1]) : null;
}

function parseContent(html, page) {
  const contentStart = html.indexOf('id="wsite-content"');
  const contentEnd = html.indexOf('<div class="footer-wrap"');
  const content = html.slice(contentStart >= 0 ? contentStart : 0, contentEnd >= 0 ? contentEnd : html.length);
  const titleMatch = content.match(/<h2\b[^>]*class=["'][^"']*wsite-content-title[^"']*["'][^>]*>([\s\S]*?)<\/h2>/i);
  const title = stripTags(titleMatch?.[1] ?? page.slug).replace(/^​+/, "");

  const tokenRegex = /<script\b[^>]*>[\s\S]*?wSlideshow[\s\S]*?<\/script>|<iframe\b[^>]*youtube[\s\S]*?<\/iframe>|<h2\b[^>]*class=["'][^"']*wsite-content-title[^"']*["'][^>]*>[\s\S]*?<\/h2>|<div class="paragraph"[\s\S]*?<\/div>|<img\b[^>]*>/gi;
  const lines = [];
  let skippedHero = false;
  let slideshowIndex = 1;
  let videoIndex = 1;
  let previous = "";
  let token;

  while ((token = tokenRegex.exec(content))) {
    const value = token[0];

    if (/wSlideshow/.test(value)) {
      const carousel = parseSlides(value, page, slideshowIndex++);
      if (carousel) {
        lines.push(carousel);
        previous = carousel;
      }
      continue;
    }

    if (/^<iframe/i.test(value)) {
      const src = value.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      const embed = src ? youtubeEmbedMdx(src, videoIndex++) : "";
      if (embed) {
        lines.push(embed);
        previous = embed;
      }
      continue;
    }

    if (/^<h2/i.test(value)) {
      const text = stripTags(value);
      if (!skippedHero && text === title) {
        skippedHero = true;
        continue;
      }
      if (text) {
        lines.push(headingMarkdown(text) || `## ${escapeMdx(text)}`);
        previous = text;
      }
      continue;
    }

    if (/^<img/i.test(value)) {
      const src = value.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      if (!src) continue;
      const copied = copyAsset(src, page);
      if (!copied) continue;
      const alt = stripTags(value.match(/\balt=["']([^"']*)["']/i)?.[1] ?? previous ?? " ");
      lines.push(singleImageMdx(copied, alt));
      previous = alt;
      continue;
    }

    const text = htmlToMarkdown(value);
    const normalized = text.replace(/\*/g, "").trim();
    const metaLabels = new Set([
      "製作時數",
      "Blender 檔案",
      "File Link",
      "PDF 檔案",
      "Preview",
      "GitHub",
      "Github",
      "作品連結",
      "程式碼",
      "線上展示",
    ]);

    if (!text || metaLabels.has(normalized) || /^\d+(\.\d+)?\s*小時$/.test(normalized) || isWeeklyHoursText(normalized)) {
      continue;
    }

    lines.push(formatTextBlock(text));
    previous = normalized;
  }

  return { title, body: lines.join("\n\n") };
}

function writeMdx(page, title, body, meta) {
  const mdxDir = path.join(root, "markdown", page.category, "computer-animation");
  fs.mkdirSync(mdxDir, { recursive: true });

  const links = meta.links
    .map((link) => `    { label: "${jsString(escapeMdx(link.label))}", text: "${jsString(escapeMdx(link.text))}", href: "${jsString(link.href)}" }`)
    .join(",\n");
  const hasHours = meta.hours !== null && meta.hours !== undefined;
  const hours = Array.isArray(meta.hours)
    ? `[\n${meta.hours.map((hour) => `    "${jsString(escapeMdx(hour))}"`).join(",\n")}\n  ]`
    : typeof meta.hours === "number"
      ? String(meta.hours)
      : `"${jsString(escapeMdx(meta.hours ?? ""))}"`;
  const hoursLine = hasHours ? `  hours={${hours}}\n` : "";

  const metaBlock = hasHours || links
    ? `<MarkdownMeta\n${hoursLine}  links={[\n${links}\n  ]}\n/>\n\n`
    : "";

  const content = `${metaBlock}${body}\n`;
  fs.writeFileSync(path.join(mdxDir, `${page.slug}.mdx`), content, "utf8");
}

const imported = [];

for (const page of pages) {
  const htmlPath = path.join(websiteDir, page.html);
  const html = fs.readFileSync(htmlPath, "utf8");
  const parsed = parseContent(html, page);
  const title = page.titleOverride ?? parsed.title;
  const body = parsed.body;
  const links = extractButtons(html, page);
  const hours = page.category === "paper" ? undefined : extractDetailedHours(html);

  writeMdx(page, title, body, { links, hours });

  const heroThumb = copyHeroThumb(extractHeroBackground(html), page);
  const firstImage = body.match(/src="(\/images\/[^"]+)"/)?.[1] ?? body.match(/\((\/images\/[^)]+)\)/)?.[1] ?? "/images/banner.png";
  imported.push({ ...page, title, image: heroThumb ?? copyThumb(firstImage, page) });
}

const byCategory = {
  homework: imported.filter((page) => page.category === "homework"),
  project: imported.filter((page) => page.category === "project"),
  paper: imported.filter((page) => page.category === "paper"),
};

function itemFor(page, indent = "        ") {
  return `${indent}{ name: "${escapeMdx(page.title)}",\n${indent}  navName: "${navNameFor(page)}",\n${indent}  slug: "${page.slug}",\n${indent}  image: "${page.image}"\n${indent}}`;
}

function navNameFor(page) {
  if (page.category === "homework") {
    return page.slug.replace(/^CG_/, "").replace("_", "");
  }

  if (page.category === "project") {
    return page.slug
      .replace(/^CG_Proj/, "PROJECT")
      .replace(/_/g, "_")
      .toUpperCase();
  }

  if (page.category === "paper") {
    return page.slug.replace(/^CG_/, "").toUpperCase();
  }

  return escapeMdx(page.title);
}

function weeksFor(category) {
  if (category === "project") {
    const groups = [
      { name: "PROJECT01", slug: "project01" },
      { name: "PROJECT02", slug: "project02" },
    ];

    return groups
      .map((group) => {
        const children = byCategory.project.filter((page) => page.group === group.slug);
        const image = children[0]?.image ?? "/thumbs/default/banner.png";
        const childItems = children.map((page) => itemFor(page, "          ")).join(",\n");
        return `        { name: "${group.name}",\n          navName: "${group.name}",\n          slug: "${group.slug}",\n          image: "${image}",\n          children: [\n${childItems}\n          ]\n        }`;
      })
      .join(",\n");
  }

  return byCategory[category]
    .map((page) => itemFor(page))
    .join(",\n");
}

const allData = `// config/AllData.ts

export interface WeekItem {
  name: string;
  navName?: string;
  slug: string;
  image?: string;
  children?: WeekItem[];
}

export interface CourseData {
  name: string;
  slug: string;
  weeks: WeekItem[];
}

export const AllData: Record<string, CourseData[]> = {
  homework: [
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
${weeksFor("homework")}
      ]
    }
  ],

  project: [
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
${weeksFor("project")}
      ]
    }
  ],

  paper: [
    {
      name: "電腦動畫",
      slug: "computer-animation",
      weeks: [
${weeksFor("paper")}
      ]
    }
  ]
};
`;

fs.writeFileSync(path.join(root, "config", "AllData.ts"), allData, "utf8");

console.log(`Imported ${imported.length} pages.`);

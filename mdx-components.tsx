import type { MDXComponents } from 'mdx/types'
import Image from "next/image";
import MarkdownMeta from "@/components/MarkdownMeta";
import ImageCarousel from "@/components/ImageCarousel";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4 text-slate-800">{children}</h1>,
    p: ({ children }) => <p className="text-base leading-relaxed text-slate-600">{children}</p>,
    ...components,
    Image,
    MarkdownMeta,
    ImageCarousel,
    YouTubeEmbed,
  }
}

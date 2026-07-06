import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    // 💡 改回純物件設定，這樣才能成功序列化（Serializable）
    rehypePlugins: [
      [rehypeKatex, { output: "mathml" }]
    ],
  },
});

export default withMDX(nextConfig);
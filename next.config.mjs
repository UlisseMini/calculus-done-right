/** @type {import('next').NextConfig} */

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import configureMDX from "@next/mdx";
const withMDX = configureMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
});

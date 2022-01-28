/** @type {import('next').NextConfig} */

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      // NOTE: Webpack loaders are executed in reverse order, see
      // https://webpack.js.org/contribute/writing-a-loader/#complex-usage
      use: [
        options.defaultLoaders.babel,
        {
          // FIXME: get require.resolve working (probably need to switch mjs to cjs)
          loader: "@mdx-js/loader",
          // loader:
          //   "/home/uli/calculus-done-right/node_modules/@mdx-js/loader/index.cjs",
          options: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        },
        { loader: "./preprocess-mdx.cjs" },
      ],
    });

    return config;
  },
};

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default function RenderedText(props: {
  children: string;
  inline?: boolean;
}) {
  const ref = useRef(null);
  const [html, setHtml] = useState(props.children);

  useEffect(() => {
    (async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(props.children);

      setHtml(result.toString());
    })();
  });

  return (
    <div
      style={{ display: props.inline ? "inline-block" : "block" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

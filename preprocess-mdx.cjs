const footer = `
export { default } from "components/LessonLayout";
import { genGetStaticProps } from "components/LessonLayout";
export const getStaticProps = genGetStaticProps(meta);
`.trim();

module.exports = function (code) {
  // NOTE: two newlines is important, after an import/export statement mdx goes
  // into "code mode" and expects the next lines to be js, until a newline
  // where it goes back to content mode
  if (this.resourcePath.includes("pages/lesson")) {
    return [code, footer].join("\n\n");
  } else {
    return code;
  }
};

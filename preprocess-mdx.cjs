const footer = `
export { default } from "components/LessonLayout";
import { genGetStaticProps } from "components/LessonLayout";
export const getStaticProps = genGetStaticProps(meta);

{!meta /* A hack to prevent nextjs from removing meta when it thinks its only used serverside */}
`.trim();

module.exports = function (code) {
  if (this.resourcePath.includes("pages/lesson")) {
    const slug = this.resourcePath.split("/").at(-1)?.replace(/\..+/, "");

    // for debugging
    if (!slug || slug.match(/(pages|mdx|\..+$)/) || slug.length < 5) {
      throw Error(`invalid slug "${slug}" path ${this.resourcePath}`);
    }

    // add slug to metadata
    code = code.replace(
      "export const meta = {\n",
      `export const meta = {\n  slug: "${slug}",\n`
    );
    // make sure it worked (better to get an error then spend hours debugging it)
    if (!code.includes(`slug: "${slug}"`)) {
      throw Error(`replace failed, code does not include slug: "${slug}"`);
    }

    // NOTE: two newlines is important, after an import/export statement mdx goes
    // into "code mode" and expects the next lines to be js, until a newline
    // where it goes back to content mode
    code = [code, footer].join("\n\n");
  }

  return code;
};

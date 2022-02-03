import * as lesson from "lib/lesson";
import { useStoreDefault } from "lib/store";
import Link from "next/link";
import pages from "pages";

type Props = {
  pages: lesson.Meta[];
};

export default function LessonList({ pages }: Props) {
  const finishedLessons = useStoreDefault((store) => store.finishedLessons, []);

  const statusColor = (status: lesson.Status) =>
    ["green", "blue", "red"][status];
  const colorCSS = (color: string) => ({ color: `var(--${color})` });
  const pageLinkCSS = (page: lesson.Meta) =>
    colorCSS(statusColor(lesson.status(page, finishedLessons)));

  // sort so the available lessons come first
  pages.sort((p1, p2) => {
    const [h1, h2] = [
      lesson.havePrereqs(p1, finishedLessons),
      lesson.havePrereqs(p2, finishedLessons),
    ];
    const s = `${Number(h1)}${Number(h2)}`;
    return { "10": -1, "01": 1 }[s] ?? 0;
  });

  return (
    <>
      <p>
        Green = Finished, Blue = Ready to Learn, Red = Missing prerequisites
      </p>
      <ul>
        {pages.map((meta: lesson.Meta, i: number) => (
          <li key={i}>
            <Link href={lesson.href(meta.slug)}>
              <a style={pageLinkCSS(meta)}>{meta.title}</a>
            </Link>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

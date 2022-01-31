import { CardData, CardDataMemory } from "lib/cards";
import { ReactElement } from "react";
import Layout from "./Layout";
import { Meta, slugToMeta, validateMeta } from "lib/lesson";
import Link from "next/link";
import Button from "./Button";
import { useStore } from "lib/store";
import { GetStaticProps } from "next";

type Props = Meta & {
  children: ReactElement[];
  depMetas: Meta[];
};

export default function LessonLayout(props: Props) {
  const slug = props.slug;
  const finishLesson = useStore((store) => store.finishLesson);
  const lessonIsFinished = useStore((store) => store.lessonIsFinished);

  function finish() {
    finishLesson(slug);
  }

  return (
    <Layout>
      <h1>{props.title}</h1>
      <span>Prerequisites: </span>
      {props.deps.length > 0 ? (
        <ul>
          {props.deps.map((dep, i) => (
            <li key={i}>
              <Link href={`/lesson/${dep}`}>
                <a>{props.depMetas[i].title}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <span>None</span>
      )}
      <div>{props.children}</div>
      <Button onClick={finish} disabled={lessonIsFinished(slug)}>
        Finish Lesson
      </Button>
    </Layout>
  );
}

export const genGetStaticProps = (meta: Meta): GetStaticProps => {
  validateMeta(meta);

  return async () => {
    const depMetas = await Promise.all(meta.deps.map(slugToMeta));

    return { props: { ...meta, depMetas } };
  };
};

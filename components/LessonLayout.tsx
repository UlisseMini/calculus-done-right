import { CardData, CardDataMemory } from "lib/cards";
import { ReactElement, useEffect, useState } from "react";
import Layout from "./Layout";
import { Meta, importMeta, validateMeta } from "lib/lesson";
import Link from "next/link";
import Button from "./Button";
import { useStore } from "lib/store";
import { GetStaticProps } from "next";
import { plural } from "lib/utils";

type Props = Meta & {
  children: ReactElement[];
  depMetas: Meta[];
};

type State = { type: "loading" } | { type: "ready"; lessonFinished: boolean };

function FinishButton({ onClick, cardsLength, lessonFinished }: any) {
  return lessonFinished ? (
    <Button disabled>
      {`Lesson finished (${plural(cardsLength, "card")} in review)`}
    </Button>
  ) : (
    <Button onClick={onClick}>
      {`Finish Lesson (adds ${plural(cardsLength, "card")} to review)`}
    </Button>
  );
}

export default function LessonLayout(props: Props) {
  // useEffect needed since localStorage isn't available serverside, and next really hates hydration mismatches
  const { slug, cards, title, deps, depMetas, children } = props;
  const finishLesson = useStore((store) => store.finishLesson);
  // WARNING: Do not use finishedLessons outside useEffect or you might get
  // hydration mismatches which lead to obscure bugs and hair pulling
  const finishedLessons = useStore((store) => store.finishedLessons);

  // useEffect needed since localStorage isn't available serverside,
  // and next really hates hydration mismatches (and will punish you with obscure bugs)
  const [state, setState] = useState<State>({ type: "loading" });
  useEffect(() => {
    const lessonFinished = finishedLessons.includes(slug);
    setState({ type: "ready", lessonFinished });
  }, [finishedLessons, slug]);

  return (
    <Layout>
      <h1>{title}</h1>
      <span>Prerequisites: </span>
      {deps.length > 0 ? (
        <ul>
          {deps.map((dep, i) => (
            <li key={i}>
              <Link href={`/lesson/${dep}`}>
                <a>{depMetas[i].title}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <span>None</span>
      )}
      <div>{children}</div>
      {state.type === "ready" ? (
        <FinishButton
          onClick={() => finishLesson(slug)}
          cardsLength={cards.length}
          lessonFinished={state.lessonFinished}
        />
      ) : (
        <></>
      )}
    </Layout>
  );
}

export const genGetStaticProps = (meta: Meta): GetStaticProps => {
  validateMeta(meta);

  return async () => {
    const depMetas = await Promise.all(meta.deps.map(importMeta));

    return { props: { ...meta, depMetas } };
  };
};

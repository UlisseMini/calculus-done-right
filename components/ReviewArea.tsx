import { useEffect, useState } from "react";
import styles from "./ReviewArea.module.css";
import Button from "./Button";
import Card from "./Card";
import { useStore } from "lib/store";
import { Meta, slugToMeta } from "lib/lesson";

type State = { type: "loading" } | { type: "ready"; metas: Meta[] };

export default function ReviewArea() {
  const finishedLessons = useStore((store) => store.finishedLessons);
  const [state, setState] = useState<State>({ type: "loading" });

  useEffect(() => {
    (async () => {
      // FIXME: Broken because of https://github.com/UlisseMini/nextjs-dynamic-import-meta-export
      const metas = await Promise.all(finishedLessons.map(slugToMeta));
      setState({ type: "ready", metas });
    })();
  }, []);

  if (state.type === "loading") {
    return <p>Loading ReviewArea...</p>;
  } else if (state.type === "ready") {
    return <pre>{JSON.stringify(state.metas, null, 2)}</pre>;
  } else {
    throw Error("unreachable");
  }
}

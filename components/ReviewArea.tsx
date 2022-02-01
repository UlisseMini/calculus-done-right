import { useEffect, useState } from "react";
import styles from "./ReviewArea.module.css";
import Button from "./Button";
import Card from "./Card";
import { useStore } from "lib/store";
import { Meta, importMeta } from "lib/lesson";

type State = { type: "loading" } | { type: "ready"; metas: Meta[] };

export default function ReviewArea() {
  const finishedLessons = useStore((store) => store.finishedLessons);
  const [state, setState] = useState<State>({ type: "loading" });

  useEffect(() => {
    (async () => {
      const metas = await Promise.all(finishedLessons.map(importMeta));
      setState({ type: "ready", metas });
    })();
  }, [finishedLessons]);

  if (state.type === "loading") {
    return <p>Loading ReviewArea...</p>;
  } else if (state.type === "ready") {
    const cards = state.metas.map((meta) => meta.cards).flat();

    return (
      <>
        {cards.map((card) => (
          <Card
            card={card}
            onAnswer={(success) => alert(`success: ${success}`)}
          />
        ))}
      </>
    );
  } else {
    throw Error("unreachable");
  }
}

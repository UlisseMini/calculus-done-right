import styles from "./CardMemory.module.css";
import { useState } from "react";
import Button from "components/Button";
import RenderedText from "components/RenderedText";
import { CardData, CardDataMemory } from "lib/cards";
import { CardProps } from "components/Card";

export default function CardMemory(props: CardProps<CardDataMemory>) {
  const { onAnswer } = props;
  const { prompt, answer } = props.card.data;

  const [answerShown, setAnswerShown] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.question}>
        <RenderedText>{prompt}</RenderedText>
      </div>

      {/* react won't rerender if we click when answerShown is already true*/}
      <div className={styles.answer} onClick={() => setAnswerShown(true)}>
        {answerShown ? (
          <RenderedText>{answer}</RenderedText>
        ) : (
          <p>
            <i>Click anywhere to show answer</i>
          </p>
        )}
      </div>

      <div className={styles.answerButtons}>
        <Button onClick={() => onAnswer(false)} disabled={!answerShown}>
          Didn{"'"}t remember
        </Button>
        <Button onClick={() => onAnswer(true)} disabled={!answerShown}>
          Remembered
        </Button>
      </div>
    </div>
  );
}

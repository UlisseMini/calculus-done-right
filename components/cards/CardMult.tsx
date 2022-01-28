import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import RenderedText from "components/RenderedText";
import styles from "./CardMult.module.css";
import { CardProps } from "components/Card";
import { CardDataMult } from "lib/cards";

type FormData = {
  choice: string;
};

type State = { type: "waiting" } | { type: "answered"; choice: string };

export default function CardMult(props: CardProps<CardDataMult>) {
  const { onAnswer } = props;
  const { options, prompt, explain } = props.card.data;
  const correct = options[0];
  // TODO: shuffle options (currently correct is always first)

  const { register, handleSubmit } = useForm<FormData>();
  const [state, setState] = useState<State>({ type: "waiting" });

  function submit(data: FormData) {
    setState({ type: "answered", choice: data.choice });
  }

  const labelClass = (o: string) => {
    if (state.type == "waiting") return "";
    return o == correct ? styles.correct : styles.incorrect;
  };

  return (
    <div className={styles.quiz}>
      <RenderedText>{prompt}</RenderedText>
      <form onSubmit={handleSubmit(submit)}>
        {options.map((o, i) => (
          <label key={i} className={`${styles.label} ${labelClass(o)}`}>
            <input
              type="radio"
              value={o}
              disabled={state.type == "answered"}
              {...register("choice")}
            />
            <RenderedText inline={true}>{o}</RenderedText>
          </label>
        ))}
        <Button type="submit" disabled={state.type == "answered"}>
          Submit
        </Button>
      </form>
      {state.type == "answered" ? (
        <>
          <p>
            Explanation: <RenderedText inline={true}>{explain}</RenderedText>
          </p>
          <Button onClick={() => onAnswer(state.choice === correct)}>
            Continue
          </Button>
        </>
      ) : null}
    </div>
  );
}

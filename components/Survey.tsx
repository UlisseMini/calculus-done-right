import { useState } from "react";
import Button from "./Button";
import styles from "./Survey.module.css";
import { useForm } from "react-hook-form";

type State =
  | { type: "waiting" }
  | { type: "sending" }
  | { type: "sent"; docRef: any }
  | { type: "error"; error: Error };

type FormData = {
  bestDescribes: string;
  whyStudyMath: string;
  mostTimeSpent: string;
  mostWant: string;
  email: string;
  extra: string;
};

export default function Survey() {
  const [state, setState] = useState<State>({ type: "waiting" });
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
    setState({ type: "sending" });
    // addDoc(collection(db, 'responses'), data)
    //   .then(docRef => setState({type: 'sent', docRef}))
    //   .catch(error => setState({type: 'error', error}))
  };

  const submitElement: React.ReactElement = {
    waiting: () => <Button type="submit">Submit</Button>,
    sending: () => <Button disabled>Submitting...</Button>,
    sent: () => <p>Success! Thanks for the feedback</p>,
    error: (s: any) => <p>Error: {s.error.message}</p>,
  }[state.type](state);

  const options = (...options: string[]) => {
    return options.map((o, i) => (
      <option key={i} value={o}>
        {o}
      </option>
    ));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          What best describes you?
          <select {...register("bestDescribes")}>
            {options(
              "High school student",
              "Collage student",
              "Finished school"
            )}
          </select>
        </label>

        <label>
          Why do you study math?
          <select {...register("whyStudyMath")}>
            {options(
              "To pass a test",
              "It's interesting/beautiful",
              "I need it for my carrier/hobby"
            )}
          </select>
        </label>

        <label>
          What are you currently learning
          <select>
            {options(
              "Pre-Algebra",
              "Algebra I",
              "Algebra II",
              "Precalculus",
              "Calculus",
              "Other"
            )}
          </select>
        </label>

        <label>
          Where do you spend the most time learning math?
          <select {...register("mostTimeSpent")}>
            {options(
              "At School",
              "On Khan Academy",
              "On Brilliant",
              "On Youtube"
            )}
          </select>
        </label>

        <label>
          Want to hear about the awesome math resources I make? (no spam I pinky
          promise)
          <input
            type="email"
            placeholder="email"
            autoComplete="email"
            {...register("email")}
          />
        </label>

        <label>
          Any extra advice you have for me building calculus-done-right?
          <textarea {...register("extra")} />
        </label>
        {submitElement}
      </form>
    </div>
  );
}

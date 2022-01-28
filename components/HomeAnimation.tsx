import { Mafs, FunctionGraph, useStopwatch, Theme } from "mafs";
import { useEffect } from "react";

const cos = Math.cos;
const sin = Math.sin;

export default function HomeAnimation() {
  const { time, start } = useStopwatch();
  useEffect(() => start(), [start]);

  const k = cos(time * 0.3); // periodic coefficient used in the animation
  const tau = 2 * Math.PI;

  // <FunctionGraph.OfX y={f} color={Theme.blue} />
  return (
    <>
      <Mafs pan={false}>
        <FunctionGraph.Parametric
          xy={(t) => [
            (t * cos(k * (t + 0.1 * cos(t)) * tau)) / 4,
            (t * sin(k * (t + 0.1 * sin(t)) * tau)) / 4,
          ]}
          t={[0, 10]}
          color={Theme.blue}
        />
      </Mafs>
    </>
  );
}

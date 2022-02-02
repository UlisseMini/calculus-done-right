import { useClientDimensions } from "lib/utils";
import { Mafs, FunctionGraph, useStopwatch, Theme } from "mafs";
import { useEffect } from "react";

const cos = Math.cos;
const sin = Math.sin;

// TODO: gif or video this for slow devices (svg isn't that performant)

export default function HomeAnimation() {
  const { time, start } = useStopwatch();
  useEffect(() => start(), [start]);

  const k = cos(time * 0.3); // periodic coefficient used in the animation
  const tau = 2 * Math.PI;

  const { clientWidth } = useClientDimensions();
  // subtract 8 to deal with padding issue (its a hack I know)
  const size = Math.min(500, clientWidth - 8);

  // <FunctionGraph.OfX y={f} color={Theme.blue} />
  return (
    <>
      <Mafs pan={false} width={size} height={size}>
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

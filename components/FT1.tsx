import {
  Mafs,
  CartesianCoordinates,
  FunctionGraph,
  useMovablePoint,
  Line,
  Point,
} from "mafs";
import { range } from "lodash";
import { useState } from "react";

export default function FT1({
  f = Math.sin,
  df = Math.cos,
  pmin = 1,
  pmax = 30,
  pstart = 3,
}) {
  const a = useMovablePoint([0, 0], { constrain: "horizontal" });
  const b = useMovablePoint([3, 0], { constrain: "horizontal" });

  const [numPartitions, setNumPartitions] = useState(pstart);
  const dx = (b.x - a.x) / numPartitions;

  const lines = range(a.x, b.x, dx).map((x, i) => {
    return (
      <Line.Segment
        color="blue"
        key={i}
        point1={[x, f(x)]}
        point2={[x + dx, f(x) + df(x) * dx]}
      />
    );
  });

  return (
    <>
      <div>
        <input
          type="range"
          min={pmin}
          max={pmax}
          value={numPartitions}
          onChange={(e) => setNumPartitions(+e.target.value)}
        />
      </div>
      <Mafs>
        <CartesianCoordinates />
        <FunctionGraph.OfX y={f} />
        {lines}
        {a.element}
        {b.element}
      </Mafs>
    </>
  );
}

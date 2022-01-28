import { Mafs, Circle, Polygon, Vector2, Theme, Text } from "mafs";
import range from "lodash/range";
import round from "lodash/round";
import { useState } from "react";

const circle = (theta: number, r: number): Vector2 => [
  r * Math.cos(theta),
  r * Math.sin(theta),
];

export function CircleAreaUnderEstimate({ numSlices = 0, radius = 2 }: any) {
  const dtheta = numSlices ? (2 * Math.PI) / numSlices : 0;
  const slices = range(0, numSlices).map((n) => {
    return (
      <Polygon
        key={n}
        points={[
          [0, 0],
          circle(dtheta * n, radius),
          circle(dtheta * (n + 1), radius),
        ]}
      />
    );
  });

  const base = Math.sin(dtheta) * radius;
  const height = Math.sqrt(radius ** 2 - (base / 2) ** 2);
  const areaOfSlice = (base * height) / 2;
  const areaEstimate = numSlices * areaOfSlice;
  const piEstimate = areaEstimate / radius ** 2;

  const trueArea = Math.PI * radius ** 2;

  return (
    <>
      <Mafs pan={false}>
        <Circle center={[0, 0]} radius={radius} />
        {slices}
        <Text x={-2} y={2.5}>
          True area: 3.142 r^2{" "}
        </Text>
        <Text x={-2} y={3}>
          Area estimate: {round(piEstimate, 3)} r^2
        </Text>
      </Mafs>
    </>
  );
}

export function CircleAreaUnderEstimateSlider(props: any) {
  const [min, max] = [0, 20];
  const [slices, setSlices] = useState(props.numSlices || 0);

  return (
    <>
      <CircleAreaUnderEstimate numSlices={slices} />
      <label>Adjust the number of slices: </label>
      <input
        type="range"
        value={slices}
        min={min}
        max={max}
        onChange={(event) => setSlices(+event.target.value)}
      />
    </>
  );
}

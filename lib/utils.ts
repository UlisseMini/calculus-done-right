import { useEffect, useState } from "react";

export const assert = (checkFn: () => boolean, msg?: string) => {
  if (!checkFn()) {
    const checkString = checkFn.toString().replace(/\(\) ?=> ?/, "");
    throw Error(`assertion ${checkString} failed${msg ? ": " + msg : ""}`);
  }
};

export const plural = (num: number, word: string) =>
  `${num} ${word}${num !== 1 ? "s" : ""}`;

export const useClientDimensions = () => {
  const [dims, setDims] = useState({
    // default to mobile, this is stupid
    clientHeight: 667,
    clientWidth: 375,
  });

  useEffect(() => {
    const onResize = () => {
      setDims({
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth,
      });
    };
    window.addEventListener("resize", onResize);
    onResize(); // fire it once to get started
    return () => document.removeEventListener("resize", onResize);
  }, []);

  return dims;
};

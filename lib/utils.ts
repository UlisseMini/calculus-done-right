export const assert = (checkFn: () => boolean, msg?: string) => {
  if (!checkFn()) {
    const checkString = checkFn.toString().replace(/\(\) ?=> ?/, "");
    throw Error(`assertion ${checkString} failed${msg ? ": " + msg : ""}`);
  }
};

export const plural = (num: number, word: string) =>
  `${num} ${word}${num !== 1 ? "s" : ""}`;

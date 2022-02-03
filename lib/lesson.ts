import { CardData, CardDataMemory } from "./cards";
import { assert } from "./utils";

export type Meta = {
  title: string;
  slug: string;
  deps: string[];
  cards: CardData<any>[];
};

export function validateMeta(m: any): Meta {
  assert(() => !!m, `got ${m}`);
  assert(() => typeof m.title === "string", `got ${m.title}`);
  assert(() => typeof m.slug === "string", `got ${m.slug}`);
  assert(() => !m.slug.includes("/"), `got ${m.slug}`);
  assert(() => Array.isArray(m.deps), `got ${m.deps}`);

  m.deps.forEach((d: string, i: number) => {
    assert(() => typeof m.deps[i] === "string", `dep[${i}] = ${d}`);
  });

  assert(() => Array.isArray(m.cards), `got ${m.cards}`);
  m.cards.forEach((q: CardData<any>, i: number) => {
    assert(() => q && typeof q === "object", `cards[${i}] = ${q}`);
    assert(() => typeof q.type === "string", `cards[${i}].type = ${q.type}`);
  });
  return m;
}

export async function importMeta(slug: string): Promise<Meta> {
  const meta = (await import(`pages/lesson/${slug}.mdx`)).meta;
  // TODO: only in dev? not sure if next is smart enough to optimize out if
  // i used if (!process.browser)...
  validateMeta(meta);
  return meta;
}

export enum Status {
  Finished,
  ReadyToLearn,
  NotReadyToLearn,
}

export const havePrereqs = (meta: Meta, finishedLessons: string[]): boolean =>
  meta.deps.every((dep) => finishedLessons.includes(dep));

export const status = (meta: Meta, finishedLessons: string[]) => {
  if (finishedLessons.includes(meta.slug)) {
    return Status.Finished;
  } else {
    return havePrereqs(meta, finishedLessons)
      ? Status.ReadyToLearn
      : Status.NotReadyToLearn;
  }
};

export const href = (slug: string) => `/lesson/${slug}`;

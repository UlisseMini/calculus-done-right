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

export async function slugToMeta(slug: string): Promise<Meta> {
  const meta = (await import(`pages/lesson/${slug}.mdx`)).meta;
  // TODO: only in dev? not sure if next is smart enough to optimize out if
  // i used if (!process.browser)...
  validateMeta(meta);
  return meta;
}

import { CardData, CardDataMemory } from "./cards";

export type Meta = {
  title: string;
  url: string;
  deps: string[];
  cards: CardData<any>[];
};

export function validateMeta(m: any) {
  if (!m) {
    throw Error(`m is ${m}`);
  }
  if (typeof m.title !== "string") {
    throw Error(
      `want title to be a string, got ${m.title} (${typeof m.title})`
    );
  }
  if (typeof m.url !== "string") {
    throw Error(`want url string got ${m.url}`);
  }

  if (!Array.isArray(m.deps)) {
    throw Error(`want deps to be an array, got ${m.deps}`);
  }

  m.deps.forEach((d: string, i: number) => {
    if (typeof d !== "string") {
      throw Error(
        `want deps to be an array of strings, but dep[${i}] is ${d} (${typeof d})`
      );
    }
  });

  if (!Array.isArray(m.cards)) {
    throw Error(`want cards to be an array, got ${m.cards}`);
  }
  m.cards.forEach((q: CardData<any>, i: number) => {
    if (typeof q !== "object" || !q) {
      throw Error(`want cards[i] be an object, but cards[${i}] is ${q}`);
    }
    if (typeof q.type !== "string") {
      throw Error(
        `want cards[i].type be a string, but cards[${i}].type is ${q.type}`
      );
    }
  });
}

export async function slugToMeta(slug: string): Promise<Meta> {
  const imports = await import(`pages/lesson/${slug}.mdx`);
  // console.log(imports);
  // TODO: only in dev? not sure if next is smart enough to optimize out if
  // i used if (!process.browser)...
  validateMeta(imports.meta);
  return imports.meta;
}

import { CardData } from "./cards";
import create, { StateSelector } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import { importMeta } from "./lesson";

type Time = number;
type CardIdentifier = {
  lesson: string;
  index: number;
};

// TODO: cache this
export async function cardFromID(id: CardIdentifier): Promise<CardData<any>> {
  return (await importMeta(id.lesson)).cards[id.index];
}

interface Review {
  id: CardIdentifier;
  time: Time;
  success: boolean;
}

type State = {
  reviews: Review[];
  // TODO: store date in finishedLessons (local change)
  finishedLessons: string[]; // finishing a lesson DOES NOT INCLUDE card reviews
  recordReview: (review: Review) => void;
  finishLesson: (lesson: string) => void;
};

export const useStore = create<State>(
  persist(
    (set, get) => ({
      reviews: [],
      finishedLessons: [],
      recordReview: (review: Review) =>
        set((draft) => ({
          reviews: [...draft.reviews, review],
        })),
      finishLesson: (lesson: string) =>
        set((draft) => ({
          finishedLessons: draft.finishedLessons.includes(lesson)
            ? draft.finishedLessons
            : [...draft.finishedLessons, lesson],
        })),
    }),
    { name: "store" }
  )
);

export const useStoreDefault = <U>(
  selector: StateSelector<State, U>,
  defaultValue: U
) => {
  const [value, setValue] = useState(defaultValue);
  const zustandValue = useStore(selector);
  useEffect(() => setValue(zustandValue), [zustandValue]);

  return value;
};

/*
export function useReviews() {
  const recordReview = useStore(store => store.recordReview)
  const [now, setNow] = useState(Date.now())

  return {
    card: card,
    nextCard: (success: boolean) => {
      if (!card) {return null}

      setNow(Date.now())
      recordReview(card.id, success)
    },
  }
}
*/

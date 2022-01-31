import { CardData } from "./cards";
import create from "zustand";
import { persist } from "zustand/middleware";
import { useCallback, useEffect, useMemo, useState } from "react";
import { slugToMeta } from "./lesson";

// TODO: Only show lessons where you have the required deps

type Time = number;
type CardIdentifier = {
  lesson: string;
  index: number;
};

// TODO: cache this
export async function cardFromID(id: CardIdentifier): Promise<CardData<any>> {
  return (await slugToMeta(id.lesson)).cards[id.index];
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
  lessonIsFinished: (lesson: string) => boolean;
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
      lessonIsFinished: (lesson: string) =>
        get().finishedLessons.includes(lesson),
    }),
    { name: "store" }
  )
);

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

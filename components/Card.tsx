import { CardData } from "lib/cards";
import CardMemory from "./cards/CardMemory";
import CardMult from "./cards/CardMult";

export type CardProps<T> = {
  card: CardData<T>;
  onAnswer: (success: boolean) => void;
};

export default function Card(props: CardProps<any>) {
  return {
    memory: () => <CardMemory {...props} />,
    mult: () => <CardMult {...props} />,
  }[props.card.type]();
}

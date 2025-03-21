import { atom, selector } from "recoil";

export const counterAtom = atom({
  key : "counter",
  default : 0
})

export const evenSelector = selector({
  key : "even",
  get : ({get}) => {
    const counter = get(counterAtom);
    const isEven = counter % 2 === 0;
    return isEven;
  }
})
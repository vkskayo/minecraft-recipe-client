import { atom } from "recoil";

export const selectedItem = atom({
  key: "indexItem", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

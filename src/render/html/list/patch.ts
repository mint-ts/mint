import { getPatch } from "fast-array-diff";
import { MintListElement } from "../../../elements";

// TODO: list patch for HTMLNodes
export const patch = (el: MintListElement) => {
  const patchItems = getPatch(el.array.prevValue, el.array.value);
  console.log(patchItems);
};

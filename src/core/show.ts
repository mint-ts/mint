import { Reactive } from "../reactive";
import { MintNode } from "../types";
import { createElementFactory } from "./createElementFactory";
import { MintShowElement, createShowElement } from "./elements";

/** Used for conditional rendering. */
export const show = (args: {
  when: Reactive<any>;
  then: MintNode;
  else?: MintNode;
}) => {
  return createElementFactory<MintShowElement>((core) =>
    createShowElement(
      args.when,
      core.createElements(args.then),
      core.createElements(args.else)
    )
  );
};

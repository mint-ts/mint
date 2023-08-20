import { MintComponentElement } from "../elements";
import { MintNode } from "../types";

/**
 * Creates a component factory which creates a new MintComponentElement
 * @returns (props: Props) => MintComponentElement
 */
export const component =
  <Props = void>(render: (props: Props) => MintNode) =>
  (props: Props) => {
    return new MintComponentElement(render, (props ?? {}) as object);
  };

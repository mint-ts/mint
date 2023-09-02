import { MintComponentElement, MintElementValue } from "../elements";
import { MintNode } from "../types";

/**
 * Creates a component factory which creates a new MintComponentElement
 * @returns (props: Props) => MintComponentElement
 */
export const component =
  <Props = void>(render: (props: Props) => MintNode) =>
  (props: Props): MintElementValue => {
    return new MintElementValue(
      (renderer) => new MintComponentElement(render, props ?? {}, renderer)
    );
  };

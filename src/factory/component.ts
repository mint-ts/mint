import { MintElement } from "../elements";
import { MintNode } from "../types";

/** Creates a component factory which creates a new MintElement of type component */
export const component =
  <Props = void>(render: (props: Props) => MintNode) =>
  (props: Props) => {
    return new MintElement({
      type: "component",
      data: {
        render,
        props,
      },
    });
  };

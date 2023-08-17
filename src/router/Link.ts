import { component, h } from "../factory";
import { HTMLAnchorElementProps, MintNode, MintProp } from "../types";
import { getReactiveValue } from "../utils";
import { getRouter } from "./Router";

export type LinkProps = HTMLAnchorElementProps & {
  to: MintProp<string>;
  children?: MintNode;
  replace?: boolean;
  state?: any;
};

export const Link = component(
  ({ to, props, children, replace, state }: LinkProps) => {
    const router = getRouter();

    return h.a(
      {
        href: to,
        onClick: (e) => {
          e.preventDefault();
          router.navigate(getReactiveValue(to), { replace, state });
        },
        style: { color: "white" },
        ...props,
      },
      children
    );
  }
);

import { createElementFactory } from "./createElementFactory";
import {
  ComponentRenderFn,
  MintComponentElement,
  createComponentElement,
} from "./elements";

/** Used for creating component element factories. */
export const component =
  <Props = void>(render: ComponentRenderFn<Props>) =>
  (props: Props) => {
    return createElementFactory<MintComponentElement<Props>>(() =>
      createComponentElement(render, props)
    );
  };

import { ComponentApi } from "../ComponentApi";
import { MintApi } from "../MintApi";
import { TYPE_MAP } from "../constants";
import { MintElement, MintNode } from "../types";
import { ElementFactory } from "./ElementFactory";

export class ComponentElement<Props> implements MintElement {
  constructor(
    public render: ComponentRenderFn<Props>,
    public props: Props,
    public api: MintApi
  ) {}

  _type = TYPE_MAP.component;
  index = 0;
  children: MintElement[] = [];

  create() {
    const api = new ComponentApi<Props>(this);
    const node = this.render(api);

    // if (isPromise(node)) {
    //   const removePromise = this.api.addPending(node);
    //   node.then((v) => {
    //     const elements = this.api.createElements(v);
    //     this.children = elements;
    //     this.api.create(this.children, this);
    //     this.api.insertElements(this, this.children);
    //     this.api.flushUpdates();
    //     removePromise();
    //   });
    // }
    // //
    // else {
    //   const elements = this.api.createElements(node);
    //   this.children = elements;
    //   this.api.create(this.children, this);
    // }
    const elements = this.api.createElements(node as MintNode);
    this.children = elements;
    return this.api.create(this.children, this);
  }

  destroy() {
    // this.api.deleteStates(el.data.state);
    // this.state = [];
  }
}

export type ComponentRenderFn<Props> = (
  api: ComponentApi<Props>
) => MintNode | Promise<MintNode>;

/** Used for creating component element factories. */
export const component =
  <Props = void>(render: ComponentRenderFn<Props>) =>
  (props: Props) => {
    return new ElementFactory(
      (api) => new ComponentElement(render, props, api)
    );
  };

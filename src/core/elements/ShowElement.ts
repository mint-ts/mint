import { MintApi } from "../MintApi";
import { TYPE_MAP } from "../constants";
import { Effect, Reactive } from "../reactive";
import { MintElement, MintNode } from "../types";
import { ElementFactory } from "./ElementFactory";

export class ShowElement implements MintElement {
  constructor(
    public reactive: Reactive<any>,
    public trueEls: MintElement[],
    public falseEls: MintElement[],
    public api: MintApi
  ) {}
  _type = TYPE_MAP.show;
  index = 0;
  disposers = [];
  children: MintElement[] = [];
  onInsert = [];
  onRemove = [];
  prevCondition: boolean | undefined;
  effect: Effect | undefined;

  create() {
    const condition = Boolean(this.reactive.value);
    this.prevCondition = condition;
    this.children = condition ? this.trueEls : this.falseEls;
    this.api.create(this.children, this);
    this.effect = new Effect(
      () => this.reactive.value,
      this.api.manager,
      () => {
        this.patch();
      }
    );
    this.effect.run();
  }

  patch() {
    const condition = Boolean(this.reactive.value);
    if (this.prevCondition == null || this.prevCondition !== condition) {
      this.children = condition ? this.trueEls : this.falseEls;
      this.api.create(this.children, this);
      this.api.insertShowElements(this, this.children);
      this.api.destroy(condition ? this.falseEls : this.trueEls);
    }
    this.prevCondition = condition;
  }

  destroy() {
    if (this.effect) {
      this.effect.destroy();
      this.effect = undefined;
    }
    for (const child of this.children) {
      child.destroy();
    }
  }
}

/** Used for conditional rendering. */
export const show = (args: {
  when: Reactive<any>;
  then?: MintNode;
  else?: MintNode;
}) => {
  return new ElementFactory(
    (api): ShowElement =>
      new ShowElement(
        args.when,
        api.createElements(args.then),
        api.createElements(args.else),
        api
      )
  );
};

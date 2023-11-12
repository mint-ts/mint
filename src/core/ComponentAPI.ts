import { Context } from "./Context";
import { ComponentElement } from "./elements";
import { Computed, State } from "./reactive";
import { MintNode } from "./types";
import { isCoreObjectOfType } from "./utils";

export class ComponentApi<Props> {
  constructor(el: ComponentElement<Props>) {
    this._el = el;
  }
  _el;

  get props() {
    return this._el.props;
  }

  state<Value>(initialValue: Value) {
    const _state = new State(initialValue, this._el.api.manager);
    // this._el.state.push(_state);
    return _state;
  }

  computed<Value>(getter: () => Value) {
    const computed = new Computed(getter, this._el.api.manager);
    return computed;
  }

  getContext<Value>(context: Context<Value>) {
    let current: any | undefined = this._el;

    if (!current) return {} as Value;

    while (current) {
      if (
        isCoreObjectOfType(current, "provider") &&
        current.context === context
      ) {
        return current.value as Value;
      }
      current = current.parent;

      if (!current) return {} as Value;
    }

    return {} as Value;
  }

  pending(node: MintNode) {
    const elements = this._el.api.createElements(node);
    // this._el.data.pendingEls = elements;
    const nodes = this._el.api.create(elements, this._el);
    // this._el.api.insertElements(this._el, elements, nodes);
    // this._el.api.update();
  }
}

import { State } from "../reactive";
import { Context } from "./Context";
import { Core } from "./Core";
import { CoreElement, MintComponentElement, isElementOfType } from "./elements";

export class ComponentAPI<Props> {
  constructor(component: MintComponentElement<Props>, core: Core<any, any>) {
    this._component = component;
    this._core = core;
  }
  private _component;
  private _core;

  get props() {
    return this._component.props;
  }

  state<Value>(initialValue: Value) {
    const _state = new State(initialValue, this._core, (c) => {
      this._component.computed.push(c);
    });
    this._component.state.push(_state);
    return _state;
  }

  getContext<Value>(context: Context<Value>) {
    let current: CoreElement | undefined = this._component;

    if (!current) return {} as Value;

    while (current) {
      if (isElementOfType(current, "provider") && current.context === context) {
        return current.value as Value;
      }
      current = current.parent;

      if (!current) return {} as Value;
    }

    return {} as Value;
  }
}

// computed<Value>(deps: Reactive<any>[], computeFn: () => Value) {
//   return new ComputedReactive(deps, computeFn, this._app);
// }

// effect(deps: Reactive<any>[], run: () => any) {
// this._component.addEffect(new Effect(deps, run));
// }

// query<Data>(options: QueryOptions<Data>) {
//   return new Query(options);
// }

import { Reactive, createComputed, createState } from "../reactive";
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
    const _state = createState({
      initialValue,
      core: this._core,
      addComputed: (c) => {
        this._component.computed.push(c);
      },
    });
    this._component.state.push(_state);
    return _state;
  }

  computed<Value>(deps: Reactive<any>[], computeFn: () => Value) {
    const computed = createComputed({ deps, computeFn, core: this._core });
    this._component.computed.push(computed);
    return computed;
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

// effect(deps: Reactive<any>[], run: () => any) {
// this._component.addEffect(new Effect(deps, run));
// }

// query<Data>(options: QueryOptions<Data>) {
//   return new Query(options);
// }

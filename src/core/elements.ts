import { Computed, Reactive, State } from "../reactive";
import { MintElement, MintNode } from "../types";
import { isObject } from "../utils";
import { ComponentAPI } from "./ComponentAPI";
import { Context } from "./Context";

export type MintProviderElement<Value> = MintElement & {
  _type: typeof PROVIDER_ELEMENT_TYPE;
  value: Value;
  context: Context<Value>;
  children: MintElementCoreWorksWith<any>[];
};

export type MintComponentElement<Props> = MintElement & {
  _type: typeof COMPONENT_ELEMENT_TYPE;
  props: Props;
  render: ComponentRenderFn<any>;
  state: State<any>[];
  computed: Computed<any>[];
  children: MintElementCoreWorksWith<any>[];
};

export type MintShowElement = MintElement & {
  _type: typeof SHOW_ELEMENT_TYPE;
  reactive: Reactive<any>;
  trueEls: MintElementCoreWorksWith<any>[];
  falseEls: MintElementCoreWorksWith<any>[];
  prevCondition: boolean | undefined;
  children: MintElementCoreWorksWith<any>[];
};

export type MintListElement<Item> = MintElement & {
  _type: typeof LIST_ELEMENT_TYPE;
  reactiveArray: Reactive<Item[]>;
  renderItem: RenderItemFn<Item>;
  cache: ListElementCache;
  prevArrayValue: Item[];
  children: MintElementCoreWorksWith<any>[];
};

export type CoreElement =
  | MintComponentElement<any>
  | MintShowElement
  | MintListElement<any>
  | MintProviderElement<any>;

export const PROVIDER_ELEMENT_TYPE = "_mint_prov_el";
export const COMPONENT_ELEMENT_TYPE = "_mint_cmp_el";
export const SHOW_ELEMENT_TYPE = "_mint_show_el";
export const LIST_ELEMENT_TYPE = "_mint_list_el";

export type ComponentRenderFn<Props> = (api: ComponentAPI<Props>) => MintNode;

export type ListElementData = {};

export type ListElementCacheItem = {
  stateIndex: State<number>;
  computedIndex: Computed<number>;
  els: MintElementCoreWorksWith<any>[];
};

export type ListElementCache = Map<any, ListElementCacheItem>;

export type RenderItemFn<Item> = (
  item: Item,
  index: Computed<number>
) => MintNode;

export const createShowElement = (
  reactive: Reactive<any>,
  trueEls: MintElementCoreWorksWith<any>[],
  falseEls: MintElementCoreWorksWith<any>[]
): MintShowElement => ({
  _type: SHOW_ELEMENT_TYPE,
  reactive,
  trueEls,
  falseEls,
  prevCondition: undefined,
  children: [],
  index: 0,
});

export const createComponentElement = <Props>(
  render: ComponentRenderFn<Props>,
  props: Props
): MintComponentElement<Props> => ({
  _type: COMPONENT_ELEMENT_TYPE,
  render,
  props,
  state: [],
  computed: [],
  children: [],
  index: 0,
});

export const createListElement = <Item>(
  reactiveArray: Reactive<Item[]>,
  renderItem: RenderItemFn<Item>
): MintListElement<Item> => ({
  _type: LIST_ELEMENT_TYPE,
  reactiveArray,
  renderItem,
  children: [],
  index: 0,
  cache: new Map(),
  prevArrayValue: [...reactiveArray.value],
});

export const createProviderElement = <Value>(
  value: Value,
  context: Context<Value>,
  children: MintElementCoreWorksWith<any>[]
): MintProviderElement<Value> => ({
  _type: PROVIDER_ELEMENT_TYPE,
  value,
  context,
  children,
  index: 0,
});

export const isElementOfType = <Type extends keyof ElTypeMap>(
  v: any,
  type: Type
): v is ElTypeMap[Type] => {
  return isObject(v) && v["_type"] === typeMap[type];
};

export const isCoreElement = (v: any): v is CoreElement => {
  return isObject(v) && !!(reverseTypeMap as any)[v._type];
};

type ElTypeMap = {
  show: MintShowElement;
  list: MintListElement<any>;
  provider: MintProviderElement<any>;
  component: MintComponentElement<any>;
};

const typeMap = {
  show: SHOW_ELEMENT_TYPE,
  list: LIST_ELEMENT_TYPE,
  provider: PROVIDER_ELEMENT_TYPE,
  component: COMPONENT_ELEMENT_TYPE,
};

const reverseTypeMap = {
  [SHOW_ELEMENT_TYPE]: 1,
  [LIST_ELEMENT_TYPE]: 1,
  [PROVIDER_ELEMENT_TYPE]: 1,
  [COMPONENT_ELEMENT_TYPE]: 1,
};

export type MintElementCoreWorksWith<RendererElement> =
  | CoreElement
  | RendererElement;

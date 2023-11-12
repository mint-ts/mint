import { MintApi } from "./MintApi";
import {
  ComponentElement,
  ElementFactory,
  ListElement,
  ShowElement,
} from "./elements";
import { Reactive } from "./reactive";

/** Basic contract for all mint elements */
export interface MintElement {
  _type: string;
  index: number;
  parent?: MintElement & { children: MintElement[] };
  api: MintApi;
  node?: any;
  children?: MintElement[];
  create(): void;
  destroy(): void;
}

export type MintParentElement = MintElement & { children: MintElement[] };

/** Nodes which are ignored ( not rendered ) */
export type MintEmptyNode = boolean | null | undefined;

/** Nodes which are rendered as text */
export type MintTextNode = string | number;

export type MintNode =
  | MintEmptyNode
  | MintTextNode
  | ElementFactory
  | Reactive<any>
  | MintNode[];

export type MintReactiveProps<T> = {
  [key in keyof T]: T[key] | Reactive<T[key]>;
};

export type CoreElement =
  | ComponentElement<any>
  // | MintProviderElement<any>
  | ShowElement
  | ListElement<any>;

export interface MintRenderer<RendererNode> {
  run(nodes: RendererNode[]): any;
  update(actions: Function[]): any;
  createRootElement?(): MintParentElement;
  createTextElement?(node: MintTextNode): MintElement;
  createReactiveElement?(node: Reactive<any>): MintElement;
  createInsertShowNodesJob?(el: ShowElement, nodes: RendererNode[]): Job;
  createInsertNodesJob?(parentEl: MintElement, nodes: RendererNode[]): Job;
  createRemoveNodesJob?(nodes: RendererNode[]): Job;
}

export type Job = () => void;

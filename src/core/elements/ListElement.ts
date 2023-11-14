import { MintApi } from "../MintApi";
import { TYPE_MAP } from "../constants";
import { Computed, Effect, Reactive, State } from "../reactive";
import { MintElement, MintNode } from "../types";
import { ElementFactory } from "./ElementFactory";

export class ListElement<Item> implements MintElement {
  constructor(
    public reactive: Reactive<Item[]>,
    public renderItemFn: ListRenderItemFn<Item>,
    public api: MintApi
  ) {}
  _type = TYPE_MAP.list;
  index = 0;
  disposers = [];
  children: MintElement[] = [];
  onInsert = [];
  onRemove = [];
  cache: ListElementCache = new Map();
  prevValue: Item[] = [];
  effect?: Effect;

  create() {
    this.effect = new Effect(
      () => this.reactive.value,
      this.api.manager,
      () => {
        this.patch();
      }
    );
    this.effect.run();
    this.cache = new Map();
    this.prevValue = [...this.reactive.value];

    const len = this.reactive.value.length;
    const elements = [];

    for (let i = 0; i < len; i++) {
      const item = this.reactive.value[i];
      const { stateIndex, computedIndex, els } = this.renderItem(item, i);
      this.cache.set(item, {
        stateIndex,
        computedIndex,
        els,
      });
      elements.push(...els);
    }
    this.children = elements;

    return this.api.create(this.children, this);
  }

  renderItem(item: Item, index: number) {
    const stateIndex = new State(index, this.api.manager);
    const computedIndex = new Computed(
      () => stateIndex.value,
      this.api.manager
    );
    const els = this.api.createElements(this.renderItemFn(item, computedIndex));

    return {
      els,
      stateIndex,
      computedIndex,
    };
  }

  patch() {
    const oldItems = [...this.prevValue];
    const newItems = this.reactive.value;
    this.prevValue = [...this.reactive.value];
    const oldLen = oldItems.length;
    const newLen = newItems.length;

    // fast path for new empty
    if (newLen === 0) {
      const elsToBeRemoved = [];
      for (let i = 0; i < oldLen; i++) {
        const item = oldItems[i];
        const cacheItem = this.cache.get(item);
        if (!cacheItem) continue;
        const els = this.destroyItem(item);
        if (els) {
          elsToBeRemoved.push(...els);
        }
      }
      this.cache.clear();
      this.children = [];
      this.api.destroy(elsToBeRemoved);
    }
    // fast path for prev empty
    else if (oldLen === 0) {
      const nodesToBeInserted = [];

      for (let i = 0; i < newLen; i++) {
        const item = newItems[i];

        const cacheItem = this.renderItem(item, i);

        this.cache.set(item, cacheItem);

        const nodes = this.api.create(cacheItem.els, this, i);
        nodesToBeInserted.push(...nodes);

        this.children.push(...cacheItem.els);
      }

      this.api.insertElements(this, this.children, nodesToBeInserted);
    }
    //
    else {
      let patchItems: ListPatchItem[] = [];
      const newCache = new Map<any, ListElementCacheItem>();

      this.children = [];

      // go through new items, populate the new cache and the patch items
      for (let i = 0; i < newLen; i++) {
        const item = newItems[i];

        let cacheItem = this.cache.get(item);

        const oldIndex = cacheItem?.computedIndex.value;
        const newIndex = i;

        // new element
        if (cacheItem == null) {
          cacheItem = this.renderItem(item, i);
        }
        // old element
        else {
          if (oldIndex !== newIndex) {
            cacheItem.stateIndex.value = newIndex;
          }
        }

        patchItems.push({
          item,
          oldIndex,
          newIndex,
          els: cacheItem.els,
        });

        newCache.set(item, cacheItem);

        this.children.push(...cacheItem.els);
      }

      const elsToBeRemoved = [];
      // go through old items and destroy their elements if they are not in new items
      for (let i = 0; i < oldLen; i++) {
        const item = oldItems[i];
        const oldCacheItem = this.cache.get(item)!;
        const newCacheItem = newCache.get(item);

        // no longer present - should be removed
        if (oldCacheItem && !newCacheItem) {
          const els = this.destroyItem(item);
          if (els) {
            elsToBeRemoved.push(...els);
          }
        }
      }

      let elsToBeInserted = [];
      const nodesToBeInserted = [];

      // finally patch
      for (let i = 0; i < patchItems.length; i++) {
        const patchItem = patchItems[i];

        if (patchItem.oldIndex != null) {
          if (patchItem.oldIndex !== patchItem.newIndex) {
            const nodes = this.api.getNodes(patchItem.els);
            nodesToBeInserted.push(...nodes);
            elsToBeInserted.push(...patchItem.els);
          }
        }
        //
        else {
          const nodes = this.api.create(patchItem.els, this, i);
          nodesToBeInserted.push(...nodes);
          elsToBeInserted.push(...patchItem.els);
        }
      }

      this.api.destroy(elsToBeRemoved);
      this.api.insertElements(this, elsToBeInserted, nodesToBeInserted);

      this.cache = new Map(newCache);
    }
  }

  destroyItem(item: Item) {
    const cacheItem = this.cache.get(item);
    if (!cacheItem) return;
    const els = cacheItem.els;
    this.cache.delete(item);
    return els;
  }

  destroy(): void {
    if (this.effect) {
      this.effect.destroy();
      this.effect = undefined;
    }
    for (const child of this.children) {
      child.destroy();
    }
  }
}

/** Used for dynamic lists. */
export const map = <Item>(
  reactive: Reactive<Item[]>,
  renderItem: ListRenderItemFn<Item>
) => {
  return new ElementFactory(
    (api) => new ListElement(reactive, renderItem, api)
  );
};

export type ListRenderItemFn<Item> = (
  item: Item,
  index: Computed<number>
) => MintNode;

export type ListElementCacheItem = {
  stateIndex: State<number>;
  computedIndex: Computed<number>;
  els: MintElement[];
};

export type ListElementCache = Map<any, ListElementCacheItem>;

export type ListPatchItem = {
  oldIndex: number | undefined;
  newIndex: number;
  els: any[];
  item: any;
};

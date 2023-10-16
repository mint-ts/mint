import { Core, ListElementCacheItem, MintListElement } from "../../core";
import { createState } from "../../reactive";
import { findNearestHtmlElementAncestor } from "./findNearestHtmlElementAncestor";
import { DomNode, ListPatchItem } from "./types";

export const createPatchList = (core: Core<any, DomNode>) => {
  const patchList = (el: MintListElement<any>) => {
    const oldItems = el.prevArrayValue;
    const newItems = el.reactiveArray.value;
    el.prevArrayValue = el.reactiveArray.value;
    const oldLen = oldItems.length;
    const newLen = newItems.length;
    const htmlAncestor = findNearestHtmlElementAncestor(el);
    const ancestorNode = htmlAncestor.domNode!;

    const renderItem = (item: any, index: number) => {
      const stateIndex = createState({ initialValue: index, core });
      const computedIndex = stateIndex.derive((i) => i);

      const els = core.createElements(el.renderItem(item, computedIndex));

      return {
        els,
        stateIndex,
        computedIndex,
      };
    };

    // fast path for zero items
    if (newLen === 0) {
      for (let i = 0; i < oldLen; i++) {
        const item = oldItems[i];
        const cacheItem = el.cache.get(item);
        if (!cacheItem) continue;
        core.destroyListItem(el, item);
      }
      el.cache.clear();
    }
    // fast path for empty list
    else if (oldLen === 0) {
      let nodeAfter: DomNode | null = null;

      for (let i = newLen - 1; i >= 0; i--) {
        const item = newItems[i];

        const cacheItem = renderItem(item, i);

        el.cache.set(item, cacheItem);

        const domNodes = core.createNodes(cacheItem.els, el, i);

        for (let i = 0; i < domNodes.length; i++) {
          const domNode = domNodes[i];
          ancestorNode.insertBefore(domNode, nodeAfter);
        }

        nodeAfter = domNodes[0];
      }
    }
    //
    else {
      let patchItems: ListPatchItem[] = [];
      const newCache = new Map<any, ListElementCacheItem>();

      // go through new items, populate the new cache and the patch items
      for (let i = 0; i < newLen; i++) {
        const item = newItems[i];

        let cacheItem = el.cache.get(item);

        const oldIndex = cacheItem?.computedIndex.value;
        const newIndex = i;

        // new element
        if (cacheItem == null) {
          cacheItem = renderItem(item, i);
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
      }

      // go through old items and destroy their elements if they are not in new items
      for (let i = 0; i < oldLen; i++) {
        const item = oldItems[i];
        const oldCacheItem = el.cache.get(item)!;

        // no longer present - should be removed
        if (oldCacheItem && !newCache.get(item)) {
          core.destroyListItem(el, item);
          el.cache.delete(item);
        }
      }

      let nodeAfter: DomNode | null = null;

      // finally patch the dom
      for (let i = patchItems.length - 1; i >= 0; i--) {
        const patchItem = patchItems[i];

        // old elements that need to be moved
        if (patchItem.oldIndex != null) {
          if (patchItem.oldIndex !== patchItem.newIndex) {
            const domNodes = core.getAllNodes(patchItem.els);

            for (let i = 0; i < domNodes.length; i++) {
              const domNode = domNodes[i];

              ancestorNode.insertBefore(domNode, nodeAfter);
            }

            nodeAfter = domNodes[0];
          }
        }

        // new elements
        else {
          const domNodes = core.createNodes(patchItem.els, el, i);

          for (let i = 0; i < domNodes.length; i++) {
            const domNode = domNodes[i];
            ancestorNode.insertBefore(domNode, nodeAfter);
          }

          nodeAfter = domNodes[0];
        }
      }

      el.cache = newCache;
    }
  };

  return patchList;
};

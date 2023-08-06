import { currentComponent } from "../currentComponent";

/** Callback is called when the component's tree
 * is removed from the DOM
 */
export const onDestroy = (callback: () => void) => {
  const current = currentComponent.current;

  if (current) {
    current.data.onDestroys.add(callback);
  }
};

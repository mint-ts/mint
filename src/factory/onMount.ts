import { currentComponent } from "../currentComponent";

/** Callback is called when the component's tree
 * is created and inserted into the DOM
 */
export const onMount = (callback: () => void) => {
  const current = currentComponent.current;

  if (current) {
    current.data.onMounts.add(callback);
  }
};

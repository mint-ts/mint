import { currentComponent } from "../currentComponent";

/** Callback is called when the component's tree is unmounted */
export const onDestroy = (callback: () => void) => {
  const current = currentComponent.current;

  if (current) {
    current.onDestroys.add(callback);
  }
};

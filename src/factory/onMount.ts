import { currentComponent } from "../currentComponent";

/** Callback is called when the component's tree is created and mounted */
export const onMount = (callback: () => void) => {
  const current = currentComponent.current;

  if (current) {
    current.onMounts.add(callback);
  }
};

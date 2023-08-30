export const setStyleProp = (node: HTMLElement, styleValue: any) => {
  for (const [key, value] of Object.entries(styleValue as any) as any) {
    let v = value;

    if (typeof v === "number") {
      v = `${v}px`;
    }
    node.style[key] = v;
  }
};

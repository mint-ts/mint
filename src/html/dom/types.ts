export type DomNode = HTMLElement | SVGElement | Text;

export type ListPatchItem = {
  oldIndex: number | undefined;
  newIndex: number;
  els: any[];
  item: any;
};

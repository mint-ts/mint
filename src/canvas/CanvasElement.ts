export class CanvasElement {
  constructor(tag: string, props: Record<string, any>) {
    this.tag = tag;
    this.props = props;
  }
  tag;
  props;
  index = 0;
  node: any;
  disposers?: Function[] | undefined;
}

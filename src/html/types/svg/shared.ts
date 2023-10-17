import { MintReactiveProps } from "../../../types";
import { AriaAttributes } from "../aria";
import { MintProps } from "../shared";
import { SVGAttributes } from "./SvgAttributes";

export type SVGProps<T extends SVGElement> = MintProps<T> &
  MintReactiveProps<SVGAttributes & AriaAttributes>;

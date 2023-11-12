import { MintNode } from "../types";
import { RouteElement } from "./types";

export const route = ({ path, node }: { path: string; node: MintNode }) => {
  // return createElementFactory(
  //   (api): RouteElement =>
  //     createMintParentElement({
  //       type: TYPE_MAP.route,
  //       api,
  //       children: [],
  //       data: {
  //         path,
  //         children: api.createElements(node),
  //       },
  //     })
  // );
};

export const createRoute = (el: RouteElement) => {};

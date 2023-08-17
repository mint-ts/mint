import { MintNode } from "../types";
import { Path } from "./Path";

export type RouteConfig = {
  path: Path;
  render: () => MintNode;
  routes?: RouteConfig[];
};

export type Match = {
  params: Record<string, any>;
};

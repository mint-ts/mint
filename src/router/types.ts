import { RoutePath } from "./RoutePath";

export type GenericUserRoutes = {
  [key: string]: {
    path: RoutePath<any>;
  };
};

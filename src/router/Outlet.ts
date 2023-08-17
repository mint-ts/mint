import { component } from "../factory";
import { getRoute } from "./Route";

export const Outlet = component(() => {
  const route = getRoute();

  if (!route) return null;

  return route.routes.map((r) => r.render());
});

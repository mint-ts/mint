import { createContext, getContext } from "../context";
import { computed, show, state } from "../factory";
import { Router } from "./Router";
import { Match, RouteConfig } from "./types";
import { mergePaths } from "./utils";

export class Route<Params = {}> {
  constructor({
    path,
    routes = [],
    render: renderFn,
    router,
  }: RouteConfig & { router: Router }) {
    this.path = path;
    this.routes = routes.map(
      (rc) => new Route({ ...rc, path: mergePaths(this.path, rc.path), router })
    );
    this.router = router;
    this.renderFn = renderFn;
  }
  path;
  routes: Route[] = [];
  router: Router = {} as Router;
  match = state<Match | null>(null);
  params = computed(
    [this.match],
    () => (this.match.value?.params ?? {}) as Params
  );
  renderFn;

  render() {
    return RouteContext.provider(
      { value: this },
      show(this.match, this.renderFn())
    );
  }
}

const RouteContext = createContext<Route<any>>();

export const getRoute = <Params = {}>() =>
  getContext<Route<Params>>(RouteContext);

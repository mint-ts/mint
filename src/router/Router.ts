import { createContext, getContext } from "../context";
import { state } from "../factory";
import { Route } from "./Route";
import { RouteConfig } from "./types";
import { matchRoutes } from "./utils";

export class Router {
  constructor(config: RouterConfig) {
    this.routes = config.routes.map((rc) => new Route({ ...rc, router: this }));

    this.url.subscribe(() => {
      matchRoutes(this.routes, this.url.value);
    });

    window.addEventListener("popstate", () => {
      this.url.value = new URL(window.location.href);
    });

    matchRoutes(this.routes, this.url.value);
  }
  routes;
  url = state(new URL(window.location.href));

  navigate(pathName: string, options?: NavigateOptions) {
    const newURL = new URL(pathName, this.url.value);
    if (options?.replace) {
      history.replaceState(options?.state, "", newURL);
    }
    //
    else {
      history.pushState(options?.state, "", newURL);
    }
    this.url.value = newURL;
  }

  Provider() {
    return RouterContext.provider(
      { value: this },
      this.routes.map((r) => r.render())
    );
  }
}

export const createRouter = (config: RouterConfig) => {
  return new Router(config);
};

const RouterContext = createContext<Router>();

export const getRouter = () => getContext(RouterContext);

type RouterConfig = {
  routes: RouteConfig[];
};

type NavigateOptions = {
  replace?: boolean;
  state?: any;
};

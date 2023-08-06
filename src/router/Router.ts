import { createContext, getContext } from "../context";
import { h, show, state } from "../factory";
import { MintNode } from "../types";
import { Route } from "./Route";
import { RoutePath } from "./RoutePath";
import { GenericUserRoutes } from "./types";

export class Router<UserRoutes extends GenericUserRoutes> {
  constructor(routerConfig: RouterConfig<UserRoutes>) {
    this.url = state(new URL(window.location.href));

    window.addEventListener("popstate", () => {
      this.url.value = new URL(window.location.href);
    });

    // creation of Route objects
    for (const [key, routeConfig] of Object.entries(routerConfig.routes)) {
      (this.routes as any)[key] = new Route({
        key,
        path: routeConfig.path,
        router: this,
      });
    }
    this.matchRoutes();

    this.url.subscribe(() => {
      this.matchRoutes();
    });
  }
  routes: Routes<UserRoutes> = {} as Routes<UserRoutes>;
  url;
  isNotFound = state(false);
  matches: Record<keyof UserRoutes, Route<any>> = {} as Record<
    keyof UserRoutes,
    Route<any>
  >;

  private matchRoutes() {
    let isAnyRouteMatched = false;
    for (const route of Object.values(this.routes)) {
      if (this.matchPath(route.path)) {
        route.match.value = {};
        isAnyRouteMatched = true;
      } else {
        route.match.value = null;
      }
    }
    if (!isAnyRouteMatched) {
      this.isNotFound.value = true;
    } else {
      this.isNotFound.value = false;
    }
  }

  private matchPath(routePath: RoutePath<any>) {
    const path = this.url.value.pathname;
    let splitPath = [""];

    if (path !== "/") {
      splitPath = path.split("/").filter((s) => s !== "");
    }

    if (routePath.path.length > splitPath.length) {
      return false;
    }

    let isMatched = true;

    for (let i = 0; i < splitPath.length; i++) {
      const routeSeg = routePath.path[i];
      if (!routeSeg) break;
      const urlSeg = splitPath[i];

      if (routeSeg.type === "static") {
        if (routeSeg.segment !== urlSeg) {
          isMatched = false;
          break;
        }
      }
      if (
        routeSeg.type === "dynamic" &&
        routeSeg.validate &&
        !routeSeg.validate(urlSeg)
      ) {
        isMatched = false;
        break;
      }
    }

    return isMatched;
  }

  Provider(...children: MintNode[]) {
    return RouterContext.provider({ value: this }, children);
  }

  Route({ key, children }: RouteProps<UserRoutes>) {
    const route = this.routes[key] as Route<any>;
    return route.render(children);
  }

  NotFound({ children }: { children: MintNode }) {
    return show(this.isNotFound, children);
  }

  Link<Key extends keyof UserRoutes>({
    key,
    children,
    ...props
  }: LinkProps<UserRoutes, Key>) {
    const route = this.routes[key] as Route<any>;
    const params = (props as any).params ?? {};
    const href = route.getHref(params);

    return h.a(
      {
        href,
        onClick: (e) => {
          e.preventDefault();
          this.push(href);
        },
      },
      children
    );
  }

  push(path: string) {
    const newURL = new URL(path, this.url.value.href);
    history.pushState({}, "", newURL);
    this.url.value = newURL;
  }
}

const RouterContext = createContext<Router<any>>();

export const getRouter = () => getContext(RouterContext);

export const createRouter = <Routes extends GenericUserRoutes>(
  routerConfig: RouterConfig<Routes>
) => {
  return new Router(routerConfig);
};

type RouterConfig<Routes extends GenericUserRoutes> = {
  routes: Routes;
};

type Routes<UserRoutes extends GenericUserRoutes> = {
  [Key in keyof UserRoutes]: RouteFromUserRoute<UserRoutes[Key]>;
};

type RouteFromUserRoute<
  PassedRoute extends {
    path: RoutePath<any>;
  }
> = Route<ParamsFromRouteConfig<PassedRoute>>;

type ParamsFromRouteConfig<
  RouteConfig extends {
    path: RoutePath<any>;
  }
> = RouteConfig["path"] extends RoutePath<infer T> ? T : unknown;

type RouteProps<UserRoutes extends GenericUserRoutes> = {
  key: keyof UserRoutes;
  children: MintNode;
};

type LinkProps<
  UserRoutes extends GenericUserRoutes,
  Key extends keyof UserRoutes
> = {
  key: Key;
  children?: MintNode;
} & (ParamsFromRouteConfig<UserRoutes[Key]> extends void
  ? {}
  : { params: ParamsFromRouteConfig<UserRoutes[Key]> });

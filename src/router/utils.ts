import { Path } from "./Path";
import { Route } from "./Route";
import { Match } from "./types";

export const matchRoutes = (routes: Route[], url: URL) => {
  let match: Match | null = null;
  let matchedRoute;

  for (const route of routes) {
    match = matchPath(route.path, url);
    if (match) {
      matchedRoute = route;
      break;
    }
  }

  for (const route of routes) {
    if (route === matchedRoute) {
      route.match.value = match;
      if (route.routes.length > 0) {
        matchRoutes(route.routes, url);
      }
    } else {
      route.match.value = null;
    }
  }
};

const matchPath = (path: Path, url: URL): Match | null => {
  if (path.isIndex) return { params: {} };

  const splitURLPath = url.pathname.slice(1).split("/");

  if (path.segments.length > splitURLPath.length) return null;

  let match = true;
  let params: Record<string, any> = {};

  for (let i = 0; i < splitURLPath.length; i++) {
    const urlSeg = splitURLPath[i];
    const pathSeg = path.segments[i];

    if (!pathSeg) {
      break;
    }

    if (pathSeg.type === "static") {
      if (urlSeg !== pathSeg.segment) {
        match = false;
        break;
      }
    }

    if (pathSeg.type === "dynamic") {
      params[pathSeg.name] = urlSeg;
    }
  }

  if (match) {
    return {
      params,
    };
  }
  //
  else {
    return null;
  }
};

export const mergePaths = (path1: Path, path2: Path) => {
  if (path1.isIndex) return new Path(path2.segments);
  if (path2.isIndex) return new Path(path1.segments);

  return new Path([
    ...path1.segments.filter((seg) => {
      if (seg.type === "static") {
        return !path2.segments.find(
          (s) => s.type === "static" && s.segment === seg.segment
        );
      }
      return true;
    }),
    ...path2.segments,
  ]);
};

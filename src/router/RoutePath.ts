export class RoutePath<Params> {
  constructor(path: RoutePathSegment[] = []) {
    this.path = path;
  }

  path;

  static(segment: string) {
    return new RoutePath<Params>([...this.path, { type: "static", segment }]);
  }

  dynamic(
    getSegment: (params: Params) => string,
    options?: { validate?: (param: string) => boolean }
  ) {
    return new RoutePath<Params>([
      ...this.path,
      { type: "dynamic", getSegment, validate: options?.validate },
    ]);
  }

  getHref(params: Params) {
    let path = [];
    for (const s of this.path) {
      if (s.type === "static") {
        path.push(s.segment);
      } else {
        path.push(s.getSegment(params));
      }
    }
    const pathString = path.join("/");

    return "/" + pathString;
  }
}

export const createRoutePath = <Params = void>() => {
  return new RoutePath<Params>();
};

type StaticRoutePathSegment = {
  type: "static";
  segment: string;
};

type DynamicRoutePathSegment = {
  type: "dynamic";
  getSegment: (params: any) => string;
  validate?: (param: any) => boolean;
};

type RoutePathSegment = StaticRoutePathSegment | DynamicRoutePathSegment;

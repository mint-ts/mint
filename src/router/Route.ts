import { createContext } from "../context";
import { computed, show, state } from "../factory";
import { MintNode } from "../types";
import { RoutePath } from "./RoutePath";
import { Router } from "./Router";

export class Route<Params> {
  constructor({ key, path, router }: RouteConfig<Params>) {
    this.key = key;
    this.path = path;
    this.router = router;
    this.match = state(null);

    this.isMatched = computed([this.match], () => !!this.match.value);
  }
  key;
  path;
  router;
  match;
  isMatched;

  getHref(params: Params) {
    return this.path.getHref(params);
  }

  render(children: MintNode) {
    return show(
      this.isMatched,
      RouteContext.provider({ value: this }, children)
    );
  }
}

const RouteContext = createContext();

type RouteConfig<Params> = {
  key: string;
  path: RoutePath<Params>;
  router: Router<any>;
};

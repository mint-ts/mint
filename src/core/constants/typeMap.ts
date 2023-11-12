import {
  ComponentElement,
  ElementFactory,
  ListElement,
  ProviderElement,
  ShowElement,
} from "../elements";
import { Computed, State } from "../reactive";
import { RouteElement } from "../router";

const STATE_TYPE = "mint__state";
const COMPUTED_TYPE = "mint__computed";
// const EFFECT_TYPE = "mint__effect";
const ELEMENT_FACTORY_TYPE = "mint__elfactory";
const PROVIDER_ELEMENT_TYPE = "mint_prov_el";
const COMPONENT_ELEMENT_TYPE = "mint_cmp_el";
const SHOW_ELEMENT_TYPE = "mint_show_el";
const LIST_ELEMENT_TYPE = "mint_list_el";
const ROUTE_ELEMENT_TYPE = "mint_route";

export const TYPE_MAP = {
  state: STATE_TYPE,
  computed: COMPUTED_TYPE,
  // effect: EFFECT_TYPE,
  elFactory: ELEMENT_FACTORY_TYPE,
  provider: PROVIDER_ELEMENT_TYPE,
  component: COMPONENT_ELEMENT_TYPE,
  show: SHOW_ELEMENT_TYPE,
  list: LIST_ELEMENT_TYPE,
  route: ROUTE_ELEMENT_TYPE,
};

export const REVERSE_EL_TYPE_MAP = {
  [PROVIDER_ELEMENT_TYPE]: 1,
  [COMPONENT_ELEMENT_TYPE]: 1,
  [SHOW_ELEMENT_TYPE]: 1,
  [LIST_ELEMENT_TYPE]: 1,
  [ROUTE_ELEMENT_TYPE]: 1,
};

export type TypeMap = {
  state: State<any>;
  computed: Computed<any>;
  // effect: Effect;
  elFactory: ElementFactory;
  provider: ProviderElement<any>;
  component: ComponentElement<any>;
  show: ShowElement;
  list: ListElement<any>;
  route: RouteElement;
};

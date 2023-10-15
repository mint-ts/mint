import { Core } from "./Core";

export const createElementFactory = <E>(
  create: CreateFn<E>
): ElementFactory<E> => {
  return {
    __id: ELEMENT_FACTORY_ID,
    create,
  };
};

export type ElementFactory<E> = {
  __id: typeof ELEMENT_FACTORY_ID;
  create: CreateFn<E>;
};

export type CreateFn<E> = (core: Core<any, any>) => E;

export const ELEMENT_FACTORY_ID = "mint__elFactory";

export const isElementFactory = (v: any): v is ElementFactory<any> => {
  return typeof v === "object" && v != null && v.__id === ELEMENT_FACTORY_ID;
};

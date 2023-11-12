import { isObject } from "./isObject";

export const createTypeChecker = <TypeMap extends Record<string, any>>(
  typeKeyMap: Record<keyof TypeMap, string>
) => {
  const isOfType = <Type extends keyof TypeMap>(
    v: any,
    type: Type
  ): v is TypeMap[Type] => {
    return isObject(v) && v._type === typeKeyMap[type];
  };

  return isOfType;
};

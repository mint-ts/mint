// taken from https://github.com/TanStack/store/blob/main/packages/react-store/src/index.ts
export const isShallowEqual = <T>(a: T, b: T) => {
  if (Object.is(a, b)) {
    return true;
  }

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(b, keysA[i] as string) ||
      !Object.is(a[keysA[i] as keyof T], b[keysA[i] as keyof T])
    ) {
      return false;
    }
  }
  return true;
};

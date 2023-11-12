export const isEqual = (oldValue: any, newValue: any) => {
  return Object.is(oldValue, newValue);
};

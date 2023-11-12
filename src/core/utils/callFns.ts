export const callFns = (fns: Function[]) => {
  for (const fn of fns) fn();
};

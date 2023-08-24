export const isPlainObject = (value: any) => {
  return (
    typeof value === "object" && value !== null && value.constructor === Object
  );
};

export const isEventProp = (propKey: string) =>
  propKey !== "on" && propKey.indexOf("on") === 0 && /[A-Z]/.test(propKey[2]);

# 🍃 mint

[![npm version](https://badge.fury.io/js/mint.ts.svg)](https://www.npmjs.com/package/mint.ts)

Frontend framework

> Work in progress - not ready for production 🚧

```ts
const Counter = component(($) => {
  const count = $.state(0);
  const doubleCount = $.computed(() => count.value * 2);

  return [
    h.div({ node: ["Count is: ", count] }),
    h.div({ node: ["Double count is: ", doubleCount] }),
    h.button({ onClick: () => count.value++ }),
  ];
});
```

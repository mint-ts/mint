# 🍃 mint

[![npm version](https://badge.fury.io/js/mint.ts.svg)](https://www.npmjs.com/package/mint.ts)

Frontend framework

> Not ready for production 🚧

```ts
const Counter = component(() => {
  const count = state(0);

  return [h.div(count), h.button({ onClick: () => count.value++ })];
});
```

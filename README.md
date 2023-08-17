# 🍃 mint

Frontend framework

```ts
const Counter = component(() => {
  const count = state(0);

  return [h.div(count), h.button({ onClick: () => count.value++ })];
});
```

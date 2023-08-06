import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["./src/index.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    minify: !options.watch,
    sourcemap: true,
  };
});

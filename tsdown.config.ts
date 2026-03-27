import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  outDir: "./dist",
  target: "node18",
  dts: true,
  fixedExtension: false,
});

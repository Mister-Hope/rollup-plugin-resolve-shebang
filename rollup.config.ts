import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/index.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      esbuild({
        minify: true,
        target: "node18",
      }),
    ],
    external: ["magic-string"],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];

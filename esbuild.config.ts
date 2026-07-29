import { build } from "esbuild";
import { resolve } from "node:path";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: resolve(import.meta.dirname, "dist/index.js"),

  platform: "node",
  packages: "external",

  format: "esm",
  target: "es2024",
  minify: true,
  treeShaking: true,
  logLevel: "info",
});
import { glob } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";

const entryPoints = [];
for await (const file of glob("src/**/*.ts")) entryPoints.push(file);

await build({
	entryPoints,
	bundle: false,
	outdir: resolve(import.meta.dirname, "dist"),

	platform: "node",
	packages: "external",

	format: "esm",
	target: "es2024",
	minify: true,
	treeShaking: true,
	logLevel: "info",
});

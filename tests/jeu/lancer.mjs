import { build } from "esbuild";
const sortie = new URL("./.logique.test.mjs", import.meta.url).pathname;
await build({ entryPoints: [new URL("./logique.test.ts", import.meta.url).pathname], bundle: true, platform: "node", format: "esm", outfile: sortie, logLevel: "error" });
await import(sortie);

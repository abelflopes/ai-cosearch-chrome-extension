import { globSync } from "glob";
import path from "path";

export const rootDir = process.cwd();

export const distDir = path.resolve(rootDir, "dist");

export const publicDir = path.resolve(rootDir, "public");

export const entryPoints = globSync(path.resolve(rootDir, "./src/*/index.ts*"), {
  ignore: path.resolve(rootDir, "./src/_*/*"),
});

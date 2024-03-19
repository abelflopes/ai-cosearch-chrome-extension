/**
 * @module
 * Writes manifest file to dist directory
 */

import { globSync } from "glob";
import * as CONFIG_PATHS from "../config/paths";
import path from "path";
import fs from "fs";
import { getManifest } from "../config/manifest";

const distManifestPath = path.resolve(CONFIG_PATHS.distDir, "manifest.json");
const images = globSync(path.resolve(CONFIG_PATHS.publicDir, "icon/**/*.{png,jpg,jpeg,gif,svg}"));

const icons = Object.fromEntries(
  images.map((i) => path.relative(CONFIG_PATHS.publicDir, i)).map((i) => [path.parse(i).name, i]),
);

fs.mkdirSync(path.dirname(distManifestPath), { recursive: true });

fs.writeFileSync(distManifestPath, JSON.stringify(getManifest(icons), null, 2));

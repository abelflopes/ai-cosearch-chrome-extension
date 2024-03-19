/**
 * @module
 * Generates manifest json object
 * @see https://developer.chrome.com/docs/apps/manifest
 */

import { globSync } from "glob";
import * as CONFIG_PATHS from "../config/paths";
import { PATH as APP_PATHS } from "../src/common/constants";
import path from "path";
import fs from "fs";
import { packageJson } from "../config/package";

const distManifestPath = path.resolve(CONFIG_PATHS.distDir, "manifest.json");
const images = globSync(path.resolve(CONFIG_PATHS.publicDir, "icon/**/*.{png,jpg,jpeg,gif,svg}"));

const icons = Object.fromEntries(
  images.map((i) => path.relative(CONFIG_PATHS.publicDir, i)).map((i) => [path.parse(i).name, i]),
);

const getManifest = (icons: Record<string, string>): object => ({
  manifest_version: 3,
  name: packageJson.displayName,
  version: packageJson.version,
  description: packageJson.description,
  icons,
  side_panel: {
    default_path: APP_PATHS.SIDE_PANEL,
  },
  content_scripts: [
    {
      js: [APP_PATHS.CONTENT_SCRIPT],
      matches: ["<all_urls>"],
    },
  ],
  background: {
    service_worker: APP_PATHS.SERVICE_WORKER,
  },
  permissions: ["sidePanel", "contextMenus", "unlimitedStorage"],
});

fs.mkdirSync(path.dirname(distManifestPath), { recursive: true });

fs.writeFileSync(distManifestPath, JSON.stringify(getManifest(icons), null, 2));

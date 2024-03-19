import { PATH as APP_PATHS } from "../src/_common/constants";
import { packageJson } from "../config/package";

/**
 * Generates manifest json object
 * @see https://developer.chrome.com/docs/apps/manifest
 */

export const getManifest = (icons: Record<string, string>): object => ({
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

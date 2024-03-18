import { type Config } from "jest";

// https://jestjs.io/docs/cli
// https://jestjs.io/docs/configuration
// https://github.com/istanbuljs/puppeteer-to-istanbul
// https://jestjs.io/docs/puppeteer

const config: Config = {
  testMatch: ["**/test/**/*.test.ts"],
};

export default config;

import { globSync } from "glob";
import path from "path";
import { type Configuration } from "webpack";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { env } from "./config/env";
import * as PATHS from "./config/paths";
import { CustomWebpackPlugin } from "./plugin";
import { TestBrowser } from "./test/test-browser";

const browser = new TestBrowser();

const config: Configuration[] = PATHS.entryPoints.map((entryFile, key) => {
  const folder = path.dirname(entryFile);
  const folderName = path.parse(folder).name;
  const [template] = globSync(path.resolve(folder, "*.{html,ejs}"));
  const fileName = path.parse(entryFile).name;

  const plugins: Configuration["plugins"] = [
    new CustomWebpackPlugin({ browser }),
    // new ForkTsCheckerWebpackPlugin()
  ];

  if (template) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: `AI CoSearch | ${folderName}`,
        template,
      }),
    );
  }

  if (key + 1 === PATHS.entryPoints.length) {
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: PATHS.publicDir, to: PATHS.distDir }],
      }),
    );
  }

  return {
    devtool: false,
    cache: {
      type: "filesystem",
      memoryCacheUnaffected: true,
    },
    experiments: {
      cacheUnaffected: true,
    },
    context: PATHS.rootDir,
    mode: env.NODE_ENV,
    name: folderName,
    entry: entryFile,
    output: {
      filename: `${fileName}.js`,
      path: path.resolve(PATHS.rootDir, PATHS.distDir, folderName),
    },
    stats: env.NODE_ENV === "development" ? "minimal" : "normal",
    resolve: {
      modules: [path.resolve(PATHS.rootDir, "src"), path.resolve(PATHS.rootDir, "node_modules")],
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        ".js": [".js", ".ts"],
        // ".cjs": [".cjs", ".cts"],
        // ".mjs": [".mjs", ".mts"],
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/u,
          exclude: /(node_modules)/u,
          use: {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        },
      ],
    },
    plugins,
    watchOptions: {
      // for some systems, watching many files can result in a lot of CPU or memory usage
      // https://webpack.js.org/configuration/watch/#watchoptionsignored
      // don't use this pattern, if you have a monorepo with linked packages
      ignored: /node_modules/u,
    },
  };
});

export default config;

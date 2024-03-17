import { globSync } from "glob";
import path from "path";
import { type Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const rootDir = __dirname;
const distDir = path.resolve(rootDir, "dist");
const entryPoints = globSync(path.resolve(rootDir, "./src/*/index.ts*"));

const mode: "development" | "production" = Number(new Date()) ? "development" : "development";

const config: Configuration[] = entryPoints.map((entryFile) => {
  const folder = path.dirname(entryFile);
  const folderName = path.parse(folder).name;
  const [template] = globSync(path.resolve(folder, "*.{html,ejs}"));
  const fileName = path.parse(entryFile).name;
  console.log(template);
  return {
    cache: {
      type: "filesystem",
      memoryCacheUnaffected: true,
    },
    experiments: {
      cacheUnaffected: true,
      lazyCompilation: true,
    },
    context: rootDir,
    mode,
    name: folderName,
    entry: entryFile,
    output: {
      filename: `${fileName}.js`,
      path: path.resolve(rootDir, distDir, folderName),
    },
    stats: "minimal",
    resolve: {
      modules: [path.resolve(rootDir, "src"), path.resolve(rootDir, "node_modules")],
      extensions: [".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/u,
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
    plugins: [new ForkTsCheckerWebpackPlugin()],
    watchOptions: {
      // for some systems, watching many files can result in a lot of CPU or memory usage
      // https://webpack.js.org/configuration/watch/#watchoptionsignored
      // don't use this pattern, if you have a monorepo with linked packages
      ignored: /node_modules/u,
    },
    devServer: {
      allowedHosts: "all",
      static: path.join(rootDir, 'public'),
      hot: true,
      compress: false,
      port: "auto",
      open: true,
    },
  };
});

export default config;

import { type WebpackPluginInstance, type Compiler } from "webpack";
import { type TestBrowser } from "./test/test-browser";

export type CustomWebpackPluginOptions = {
  browser: TestBrowser;
};

export class CustomWebpackPlugin implements WebpackPluginInstance {
  private readonly options: CustomWebpackPluginOptions;

  public constructor(options: CustomWebpackPluginOptions) {
    this.options = options;
  }

  public apply = (compiler: Compiler): void => {
    compiler.hooks.done.tap("CustomWebpackPlugin", (): void => {
      this.options.browser.end();
      this.options.browser.startDebounced();
    });
  };
}

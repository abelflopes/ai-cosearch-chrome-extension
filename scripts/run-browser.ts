import { TestBrowser } from "../test/test-browser";

void (async (): Promise<void> => {
  const testBrowser = new TestBrowser();
  await testBrowser.start();
})();

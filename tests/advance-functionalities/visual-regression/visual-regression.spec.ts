import { expect, test } from "@playwright/test";

/**
 * This test validate the visual regression functionality available in playwright.
 * When baseline screenshots are not available in the directory, in the first run test will fail
 * but will capture screenshots. In the second retry, test will compare the webpage with the
 * captured screenshot
 *
 * Also with 1.62, its possible to save and compare screesnhots with WebP format and also save
 * the images with desired image quality
 */

test.describe.skip("Visual Regression", () => {
  test("validate the page screenshot is validated", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveScreenshot();
    await expect(page).toHaveScreenshot({ fullPage: true });
    await expect(
      page.getByRole("link", { name: "Get started" }),
    ).toHaveScreenshot();
  });

  test("store screenshots in webp format", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.screenshot({
      path: "tests/advance-functionalities/visual-regression/visual-regression.spec.ts-snapshots/screenshot.webp",
    });
    await page.screenshot({
      fullPage: true,
      path: "tests/advance-functionalities/visual-regression/visual-regression.spec.ts-snapshots/fullpage.webp",
    });
    await page.getByRole("link", { name: "Get started" }).screenshot({
      path: "tests/advance-functionalities/visual-regression/visual-regression.spec.ts-snapshots/locator.webp",
      quality: 50,
    });
  });

  // skipping the test as few changes in webp format causing the failures even if there are no visual changes
  test.skip("validate the page screenshot against WebP format", async ({
    page,
  }) => {
    await page.goto("https://playwright.dev/");
    await expect
      .soft(page)
      .toHaveScreenshot("screenshot.webp", { maxDiffPixels: 100 });
    await expect.soft(page).toHaveScreenshot("fullPage.webp", {
      fullPage: true,
      maxDiffPixels: 100,
    });
    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toHaveScreenshot("locator.webp", { maxDiffPixels: 100 });
  });
});

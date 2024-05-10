import { test, expect } from "@playwright/test";

test("Login Test", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/");
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("banner")
    .getByRole("img", { name: "profile picture" })
    .click();
  await page.locator("text=Logout").click();
});

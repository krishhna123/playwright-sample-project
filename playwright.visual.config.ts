import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  testIgnore: [],
  testMatch: "**/advance-functionalities/visual-regression/**/*.spec.ts",
  updateSnapshots: process.env.CI ? "changed" : "missing",
});

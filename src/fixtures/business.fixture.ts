import { test as base, expect } from "fixtures/pages.fixture";
import { credentials, SALES_PORTAL_URL } from "config/env";
import { LoginPage } from "ui/pages/login.page";

export const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ loginPage, homePage }, use) => {
    await use(async () => {
      // const emailInput = page.locator("#emailinput");
      // const passwordInput = page.locator("#passwordinput");
      // const loginButton = page.locator("button[type='submit']");

      // await page.goto(SALES_PORTAL_URL);
      // await emailInput.fill(credentials.username);
      // await passwordInput.fill(credentials.password);
      // await loginButton.click();
      await loginPage.open();
      await loginPage.fillCredentials(credentials);
      await loginPage.clickLogin();

      await homePage.waitForOpened();
    });
  },
});

export { expect };

import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  INVALID_CREDENTIALS = "Your password is invalid!",
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
}

test.describe("[Demo App] REGISTER & LOGIN Smoke Suite", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("should register and then login successfully", async ({ page }) => {
    const creds: ICredentials = { username: `Smoke_${Date.now()}`, password: "ValidPass123" };

    // Register
    await expect(page.locator("#loginForm")).toBeVisible();
    await page.locator("#registerOnLogin").click();
    await page.fill("#userNameOnRegister", creds.username);
    await page.fill("#passwordOnRegister", creds.password);
    await page.locator("#register").click();
    await expect(page.getByText(NOTIFICATIONS.REGISTER_SUCCESS, { exact: true })).toBeVisible();

    // Back to login
    await page.locator("#backOnRegister").click();

    // Login
    await page.fill("#userName", creds.username);
    await page.fill("#password", creds.password);
    await page.locator("#submit").click();
    await expect(page.getByText(`Hello, ${creds.username}!`)).toBeVisible();
    await expect(page.locator("#loginForm")).toBeHidden();
  });
});

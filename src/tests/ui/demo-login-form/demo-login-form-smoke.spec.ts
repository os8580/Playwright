import { test, expect, Page } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
}

const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

test.describe.skip("[Demo App] REGISTER & LOGIN Smoke Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.locator("#loginForm")).toBeVisible();
  });

  test("Open registration page", async ({ page }) => {
    await page.locator("#registerOnLogin").click();
    await expect(page.locator("#userNameOnRegister")).toBeVisible();
  });

  test("Register user with normal username and password", async ({ page }) => {
    const creds: ICredentials = { username: generateUsername(), password: "ValidPass123" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Register user with minimum username length (3 chars)", async ({ page }) => {
    const creds: ICredentials = { username: "Abc", password: "ValidPass123" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Register user with maximum username length (40 chars)", async ({ page }) => {
    const creds: ICredentials = { username: "A".repeat(40), password: "ValidPass123" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Register user with username containing spaces inside", async ({ page }) => {
    const creds: ICredentials = { username: "User WithSpaces", password: "ValidPass123" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Register user with minimum password length (8 chars) and mixed case", async ({ page }) => {
    const creds: ICredentials = { username: generateUsername(), password: "Aa123456" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Register user with maximum password length (20 chars) and mixed case", async ({ page }) => {
    const creds: ICredentials = { username: generateUsername(), password: "AbcdefG1HijkLmnopQ2" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Register user with password containing letters, digits, and symbols", async ({ page }) => {
    const creds: ICredentials = { username: generateUsername(), password: "Aa1!Bb2@Cc" };
    await registerUser(page, creds);
    await loginUser(page, creds);
  });

  test("Login form visible after returning from registration", async ({ page }) => {
    const creds: ICredentials = { username: generateUsername(), password: "ValidPass123" };
    await registerUser(page, creds);
    await expect(page.locator("#loginForm")).toBeVisible();
  });

  /**
   * Utility to register a user and return to the login page
   */
  async function registerUser(page: Page, creds: ICredentials) {
    await expect(page.locator("#registerOnLogin")).toBeVisible({ timeout: 5000 });
    await page.locator("#registerOnLogin").click();
    await page.fill("#userNameOnRegister", creds.username);
    await page.fill("#passwordOnRegister", creds.password);
    await page.locator("#register").click();
    await expect(
      page.getByText(NOTIFICATIONS.REGISTER_SUCCESS, { exact: true })
    ).toBeVisible();
    await page.locator("#backOnRegister").click();
  }

  /**
   * Utility to log in with given credentials
   */
  async function loginUser(page: Page, creds: ICredentials) {
    await page.fill("#userName", creds.username);
    await page.fill("#password", creds.password);
    await page.locator("#submit").click();
    await expect(page.getByText(`Hello, ${creds.username}!`)).toBeVisible();
    await expect(page.locator("#loginForm")).toBeHidden();
  }

  /**
   * Utility to generate unique usernames
   */
  function generateUsername(prefix = "User") {
    return `${prefix}_${Date.now()}`;
  }
});
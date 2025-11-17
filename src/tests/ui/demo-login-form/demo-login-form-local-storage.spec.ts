import { test, expect } from "@playwright/test";

test.describe.skip("[Demo App] LOGIN WITH localStorage CREDS Suite", () => {
  test("should register user in localStorage and login successfully", async ({ page }) => {

    // Inject user credentials into localStorage BEFORE page load
    await page.context().addInitScript(() => {
      const user = {
        name: "test@gmail.com",
        password: "SecretPw123!@#"
      };
      localStorage.setItem(user.name, JSON.stringify(user));
    });

    // Navigate to the login form
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");

    // Fill in login credentials
    await page.fill("#userName", "test@gmail.com");
    await page.fill("#password", "SecretPw123!@#");
    await page.click("#submit");

    // Validate successful login
    const successMessage = page.locator("#successMessage");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText("Hello, test@gmail.com!"); 

    // Optionally, verify that success block is visible
    await expect(page.locator(".successMessage")).toBeVisible();
  });
});

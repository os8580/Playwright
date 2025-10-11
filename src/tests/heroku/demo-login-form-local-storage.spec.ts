import { test, expect } from "@playwright/test";

test.describe("[Demo App] LOGIN WITH localStorage CREDS Suite", () => {
  test("Register user in localStorage and login successfully", async ({ page }) => {
    // Open the target page
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");

    // Add a user object to localStorage in the format used by the app
    // The key must be the username itself, and the value is a JSON string with "name" and "password" fields
    await page.evaluate(() => {
      const user = {
        name: "test@gmail.com",
        password: "SecretPw123!@#"
      };
      localStorage.setItem(user.name, JSON.stringify(user));
    });

    // Reload the page so that the app reads the new localStorage data
    await page.reload();

    // Fill the login form with the same credentials we inserted into localStorage
    await page.fill("#userName", "test@gmail.com");
    await page.fill("#password", "SecretPw123!@#");

    // Click the login button
    await page.click("#submit");

    // Validate that login was successful
    const successMessage = page.locator("#successMessage");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText("Hello, test@gmail.com!");

    // Extra check: ensure the success form is visible
    const successFormVisible = await page.locator(".successMessage").isVisible();
    expect(successFormVisible).toBeTruthy();
  });
});

import { test, expect } from "@playwright/test";

test.describe("[Demo App] DYNAMIC CONTROLS Suite", () => {
  test("should remove and add checkbox with correct messages", async ({ page }) => {
    // Go to main page
    await page.goto("https://the-internet.herokuapp.com/");

    // Navigate to "Dynamic Controls" section
    await page.getByRole("link", { name: "Dynamic Controls" }).click();

    // Locators
    const checkbox = page.getByRole("checkbox");
    const removeButton = page.getByRole("button", { name: "Remove" });
    const addButton = page.getByRole("button", { name: "Add" });
    const message = page.locator("#message"); 

    // Initial assertions before removing the checkbox
    await expect(page).toHaveTitle("The Internet");
    await expect(removeButton).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    // Remove checkbox
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await removeButton.click();
    await expect(message).toHaveText("It's gone!"); 
    await expect(checkbox).toBeHidden();

    // Add checkbox back
    await expect(addButton).toBeVisible();
    await addButton.click();
    await expect(checkbox).toBeVisible();
    await expect(message).toHaveText("It's back!"); 
  });
});

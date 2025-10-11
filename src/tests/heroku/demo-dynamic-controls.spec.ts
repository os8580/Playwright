import { test, expect } from "@playwright/test";

const baseUrl = "https://the-internet.herokuapp.com/";

test.describe("[Demo App] DYNAMIC CONTROLS Suite", () => {
  test("Dynamic Controls test", async ({ page }) => {
    await page.goto(baseUrl);

    const dynamicControlsURL = page.getByRole("link", { name: "Dynamic Controls" });
    await dynamicControlsURL.click();

    const removeButton = page.getByRole("button", { name: "Remove" });
    const removeAddCheckbox = page.getByRole("checkbox");
    const addButton = page.getByRole("button", { name: "Add" });
    const itsgoneText = page.getByText("It's gone!");
    const itsbackText = page.getByText("It's back!");

    await expect(removeButton).toBeVisible();
    await expect(page).toHaveTitle("The Internet");

    await expect(removeAddCheckbox).not.toBeChecked();
    await removeAddCheckbox.check();
    await expect(removeAddCheckbox).toBeChecked();

    await removeButton.click();
    await expect(removeAddCheckbox).toBeHidden();
    await expect(addButton).toBeVisible();
    await expect(itsgoneText).toBeVisible();

    await addButton.click();
    await expect(removeAddCheckbox).toBeVisible();
    await expect(itsbackText).toBeVisible();
  });
});

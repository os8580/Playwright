import { test, expect } from "@playwright/test";

test.describe("[Demo App] Full Registration Smoke Suite", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-registration-form/";

  test("should successfully fill and submit registration form", async ({ page }) => {
    await page.goto(baseUrl);

    // Test data
    const timestamp = Date.now();
    const firstName = "SmokeFirst";
    const lastName = "SmokeLast";
    const fullName = `${firstName} ${lastName}`;
    const address = "123 Smoke St, Test City";
    const email = `smoke${timestamp}@test.com`;
    const phone = "1234567890";
    const country = "USA";
    const gender = "male";
    const language = "English";
    const skills = ["JavaScript", "Python"];
    const hobbies = ["Travelling", "Gaming"];
    const dob = "1 January 1990";
    const password = "ValidPass123";

    // Fill forms
    await page.fill("#firstName", firstName);
    await page.fill("#lastName", lastName);
    await page.fill("#address", address);
    await page.fill("#email", email);
    await page.fill("#phone", phone);
    await page.fill("#language", language);
    await page.fill("#password", password);
    await page.fill("#password-confirm", password);

    await page.selectOption("#country", country);
    await page.check(`input[name='gender'][value='${gender}']`);
    for (const hobby of hobbies) {
      await page.check(`input.hobby[value='${hobby}']`);
    }
    await page.selectOption("#skills", skills);
    await page.selectOption("#year", "1990");
    await page.selectOption("#month", "January");
    await page.selectOption("#day", "1");

    // Submit
    await page.click("button[type='submit']");

    // Check all fields
    await expect(page.locator("h2")).toHaveText("Registration Details");
    await expect(page.locator("#fullName")).toHaveText(fullName);
    await expect(page.locator("#address")).toHaveText(address);
    await expect(page.locator("#email")).toHaveText(email);
    await expect(page.locator("#phone")).toHaveText(phone);
    await expect(page.locator("#country")).toHaveText(country);
    await expect(page.locator("#gender")).toHaveText(gender);
    await expect(page.locator("#language")).toHaveText(language);
    await expect(page.locator("#skills")).toHaveText(skills.join(", "));
    await expect(page.locator("#hobbies")).toHaveText(hobbies.join(", "));
    await expect(page.locator("#dateOfBirth")).toHaveText(dob);

    // Check back button
    await expect(page.locator("button", { hasText: "Back to Form" })).toBeVisible();
  });
});

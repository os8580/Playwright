import { test, expect } from "@playwright/test";

test.describe.skip("[Demo App] Full Registration Smoke Suite", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-registration-form/";

  test("Full registration flow with valid data", async ({ page }) => {
    // Navigate to registration page
    await page.goto(baseUrl);

    // Test data
    const timestamp = Date.now();
    const testData = {
      firstName: "SmokeFirst",
      lastName: "SmokeLast",
      fullName: "SmokeFirst SmokeLast",
      address: "123 Smoke St, Test City",
      email: `smoke${timestamp}@test.com`,
      phone: "1234567890",
      country: "USA",
      gender: "male",
      language: "English",
      skills: ["JavaScript", "Python"],
      hobbies: ["Travelling", "Gaming"],
      dob: {  
        day: "1",
        month: "January",
        year: "1990"
      },
      password: "ValidPass123",
    };

    // Fill registration form
    await page.fill("#firstName", testData.firstName);
    await page.fill("#lastName", testData.lastName);
    await page.fill("#address", testData.address);
    await page.fill("#email", testData.email);
    await page.fill("#phone", testData.phone);
    await page.fill("#language", testData.language);
    await page.fill("#password", testData.password);
    await page.fill("#password-confirm", testData.password);
    await page.selectOption("#country", testData.country);
    await page.check(`input[name='gender'][value='${testData.gender}']`);
    for (const hobby of testData.hobbies) {
      await page.check(`input.hobby[value='${hobby}']`);
    }
    await page.selectOption("#skills", testData.skills);
    await page.selectOption("#year", testData.dob.year);  
    await page.selectOption("#month", testData.dob.month);  
    await page.selectOption("#day", testData.dob.day);  

    // Submit registration
    await page.click("button[type='submit']");

    // Verify registration result
    await expect(page.locator("h2")).toHaveText("Registration Details");
    await expect(page.locator("#fullName")).toHaveText(testData.fullName);
    await expect(page.locator("#address")).toHaveText(testData.address);
    await expect(page.locator("#email")).toHaveText(testData.email);
    await expect(page.locator("#phone")).toHaveText(testData.phone);
    await expect(page.locator("#country")).toHaveText(testData.country);
    await expect(page.locator("#gender")).toHaveText(testData.gender);
    await expect(page.locator("#language")).toHaveText(testData.language);
    await expect(page.locator("#skills")).toHaveText(testData.skills.join(", "));
    await expect(page.locator("#hobbies")).toHaveText(testData.hobbies.join(", "));
    await expect(page.locator("#dateOfBirth")).toHaveText(
      `${testData.dob.day} ${testData.dob.month} ${testData.dob.year}`  
    );

    // Verify back button is visible
    await expect(page.locator("button", { hasText: "Back to Form" })).toBeVisible();
  });
});
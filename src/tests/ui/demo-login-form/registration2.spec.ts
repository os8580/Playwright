/**
 * @file Test suite for the negative scenarios of the registration form.
 */

import test, { expect } from '@playwright/test';
import userData from '../../../data/demo-login-form/register.data';

test.describe('[Demo Login Form] Registration Negative Scenarios', () => {
  const url = 'https://anatoly-karpovich.github.io/demo-login-form/';

  // This loop creates a separate test for each entry in the userData array.
  for (const { title, credentials, successMessage } of userData) {
    test(title, async ({ page }) => {
      await page.goto(url);

      // Navigate to the registration form
      const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');
      await registerOnLoginButton.click();

      // Define locators for the registration form elements
      const registerForm = page.locator('.registerForm');
      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator("input[type='submit']");
      const errorMessageLabel = registerForm.locator('#errorMessageOnRegister');

      // Fill in the form with invalid data and submit
      const { username, password } = credentials;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();

      // Verify that the correct error message is displayed
      await expect(errorMessageLabel).toHaveText(successMessage);
    });
  }
});
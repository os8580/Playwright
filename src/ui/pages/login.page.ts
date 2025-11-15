import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";

export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator('button[type="submit"]');

  readonly uniqueElement = this.page.locator("#signInPage");

  async fillCredentials(credentials: Partial<ICredentials>) {
    if (credentials.username) await this.emailInput.fill(credentials.username);
    if (credentials.password) await this.passwordInput.fill(credentials.password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}

import { Page } from "@playwright/test";
import { credentials } from "config/env";
import { ICredentials } from "data/types/credentials.types";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { BaseService } from "./base.service";
import { logStep } from "utils/report/logStep.utils";

export class LoginUIService extends BaseService {
  homePage: HomePage;
  loginPage: LoginPage;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
  }

  @logStep("Login as Admin")
  async loginAsAdmin() {
    const cookies = await this.page.context().cookies();
    const existing = cookies.find((c) => c.name === "Authorization");
    if (existing?.value) return existing.value;
    return await this.login(credentials);
  }

  @logStep("Login with custom credentials")
  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickLogin();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}

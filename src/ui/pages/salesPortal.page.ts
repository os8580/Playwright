import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { logStep } from "utils/report/logStep.utils";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  abstract readonly uniqueElement: Locator;

  @logStep("Wait for page opened")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
    await this.waitForSpinners();
  }

  @logStep("Wait for page closed")
  async waitForClosed() {
    await expect(this.uniqueElement).toBeHidden();
  }

  @logStep("Wait for spinners hidden")
  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }

  @logStep("Open route")
  async open(route?: string) {
    const url = route ? SALES_PORTAL_URL + route : SALES_PORTAL_URL;
    await this.page.goto(url);
  }
}

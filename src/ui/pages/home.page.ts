import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { SalesPortalRoutes } from "data/types/routes.types";
import { logStep } from "utils/report/logStep.utils";

export type HomeModuleButton = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly totalOrdersValue = this.page.locator("#total-orders-container .card-text");
  readonly totalRevenueValue = this.page.locator("#total-revenue-container .card-text");
  readonly totalNewCustomersValue = this.page.locator("#total-customers-container .card-text");
  readonly avgOrderValue = this.page.locator("#avg-orders-value-container .card-text");
  readonly canceledOrdersValue = this.page.locator("#canceled-orders-container .card-text");
  readonly uniqueElement = this.welcomeText;

  @logStep("Open Home page")
  async open() {
    await super.open(SalesPortalRoutes.HOME);
  }

  @logStep("Click on View Module button")
  async clickOnViewModule(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[module].click();
  }
}

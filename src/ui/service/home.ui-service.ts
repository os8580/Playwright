import { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { BaseService } from "./base.service";
import { logStep } from "utils/report/logStep.utils";

export class HomeUIService extends BaseService {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  customersListPage: CustomersListPage;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(this.page);
    this.productsListPage = new ProductsListPage(this.page);
    this.customersListPage = new CustomersListPage(this.page);
  }

  @logStep("Open module from home page")
  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.open();
    await this.homePage.waitForOpened();
    await this.homePage.clickOnViewModule(moduleName);

    if (moduleName === "Products") await this.productsListPage.waitForOpened();
    if (moduleName === "Customers") await this.customersListPage.waitForOpened();
  }
}

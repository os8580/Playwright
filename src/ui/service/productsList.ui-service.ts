import { expect, Page } from "@playwright/test";
import { IProductDetails } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { convertToFullDateAndTime } from "utils/date.utils";
import { BaseService } from "./base.service";
import { SalesPortalRoutes } from "data/types/routes.types";
import { logStep } from "utils/report/logStep.utils";

export class ProductsListUIService extends BaseService {
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;

  constructor(page: Page) {
    super(page);
    this.productsListPage = new ProductsListPage(this.page);
    this.addNewProductPage = new AddNewProductPage(this.page);
  }

  @logStep("Open Add New Product page")
  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep("Open product details modal")
  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  @logStep("Open delete product modal")
  async openDeleteModal(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
  }

  @logStep("Delete product")
  async deleteProduct(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
    await this.productsListPage.deleteModal.clickConfirm();
    await this.productsListPage.deleteModal.waitForClosed();
  }

  @logStep("Search for product")
  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  @logStep("Open Products List page")
  async open() {
    await this.productsListPage.open(SalesPortalRoutes.PRODUCTS);
    await this.productsListPage.waitForOpened();
  }

  assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  @logStep("Assert product in table")
  async assertProductInTable(productName: string, { visible }: { visible: boolean }) {
    await expect(this.productsListPage.tableRowByName(productName)).toBeVisible({ visible });
  }
}

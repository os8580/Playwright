import { SalesPortalPage } from "../salesPortal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly topRow = this.page.locator("#table-products tbody tr").first();
  readonly topRowCells = this.topRow.locator("td");

  readonly topRowName = this.topRowCells.nth(0);
  readonly topRowPrice = this.topRowCells.nth(1);
  readonly topRowManufacturer = this.topRowCells.nth(2);
  readonly topRowCreatedOn = this.topRowCells.nth(3);

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }
  async getTopRowTextContents() {
    return this.topRowCells.allTextContents();
  }
}

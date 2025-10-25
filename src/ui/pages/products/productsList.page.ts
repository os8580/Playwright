import { SalesPortalPage } from "../salesPortal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly tableRows = this.page.locator("#table-products tbody tr");

  /**
   * Returns the locator for a table row by its index (0-based).
   * @param index The row index.
   */
  tableRow(index: number) {
    return this.tableRows.nth(index);
  }

  /**
   * Returns the locator for all cells (td) in a specific row.
   * @param rowIndex The row index.
   */
  tableRowCells(rowIndex: number) {
    return this.tableRow(rowIndex).locator("td");
  }

  /**
   * Returns the locator for the 'Name' cell in a specific row.
   * @param rowIndex The row index.
   */
  tableRowName(rowIndex: number) {
    return this.tableRowCells(rowIndex).nth(0);
  }

  /**
   * Returns the locator for the 'Price' cell in a specific row.
   * @param rowIndex The row index.
   */
  tableRowPrice(rowIndex: number) {
    return this.tableRowCells(rowIndex).nth(1);
  }

  /**
   * Returns the locator for the 'Manufacturer' cell in a specific row.
   * @param rowIndex The row index.
   */
  tableRowManufacturer(rowIndex: number) {
    return this.tableRowCells(rowIndex).nth(2);
  }

  /**
   * Returns the locator for the 'Created On' cell in a specific row.
   * @param rowIndex The row index.
   */
  tableRowCreatedOn(rowIndex: number) {
    return this.tableRowCells(rowIndex).nth(3);
  }

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  /**
   * Gets the text content of all cells in a specific row as an array.
   * @param rowIndex The row index.
   */
  async getTableRowTextContents(rowIndex: number) {
    return this.tableRowCells(rowIndex).allTextContents();
  }
}

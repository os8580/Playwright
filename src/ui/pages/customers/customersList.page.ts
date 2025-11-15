import { CustomersTableHeader, ICustomerInTable } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { ConfirmationModal } from "../confirmation.modal";

export class CustomersListPage extends SalesPortalPage {
  readonly deleteModal = new ConfirmationModal(this.page);
  readonly pageTitle = this.page.locator("h2.fw-bold, h2.page-title-text");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByEmail = (email: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: email }) });
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(0);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
  readonly createdOnCell = (emailOrIndex: string | number) =>
    typeof emailOrIndex === "string"
      ? this.tableRowByEmail(emailOrIndex).locator("td").nth(3)
      : this.tableRowByIndex(emailOrIndex).locator("td").nth(3);

  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: CustomersTableHeader) => this.tableHeader.filter({ hasText: name });

  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-customer");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getCustomerData(email: string): Promise<ICustomerInTable> {
    const [e, name, country, createdOn] = await this.tableRowByEmail(email).locator("td").allInnerTexts();
    return {
      email: e!,
      name: name!,
      country: country! as any,
      createdOn: createdOn!,
    };
  }

  async clickSearch() {
    await this.searchButton.click();
  }
}

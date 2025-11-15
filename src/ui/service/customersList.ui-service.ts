import { expect, Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";

export class CustomersListUIService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async open() {
    await this.customersListPage.open("customers");
    await this.customersListPage.waitForOpened();
  }

  async openAddNewCustomerPage() {
    await this.customersListPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  async openDeleteModal(email: string) {
    await this.customersListPage.deleteButton(email).click();
    await this.customersListPage.deleteModal.waitForOpened();
  }

  async deleteCustomer(email: string) {
    await this.openDeleteModal(email);
    await this.customersListPage.deleteModal.clickConfirm();
    await this.customersListPage.deleteModal.waitForClosed();
  }

  async search(text: string) {
    await this.customersListPage.searchInput.fill(text);
    await this.customersListPage.clickSearch();
    await this.customersListPage.waitForOpened();
  }

  async assertCustomerInTable(email: string, { visible }: { visible: boolean }) {
    await expect(this.customersListPage.tableRowByEmail(email)).toBeVisible({ visible });
  }
}

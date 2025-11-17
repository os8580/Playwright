import { expect, Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { BaseService } from "./base.service";
import { SalesPortalRoutes } from "data/types/routes.types";

export class CustomersListUIService extends BaseService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(page: Page) {
    super(page);
    this.customersListPage = new CustomersListPage(this.page);
    this.addNewCustomerPage = new AddNewCustomerPage(this.page);
  }

  async open() {
    await this.customersListPage.open(SalesPortalRoutes.CUSTOMERS);
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

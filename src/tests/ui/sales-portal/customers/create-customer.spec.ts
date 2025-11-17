import { test, expect } from "fixtures";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Customers]", { tag: [TAGS.CUSTOMERS, TAGS.UI, TAGS.SMOKE] }, () => {
  let token = "";

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test("Create customer with API login", async ({ customersApi, customersListUIService, addNewCustomerPage }) => {
    await addNewCustomerPage.setAuthCookie(token);

    await customersListUIService.open();
    await customersListUIService.openAddNewCustomerPage();
    await addNewCustomerPage.waitForOpened();

    const data = generateCustomerData();
    await addNewCustomerPage.fillForm(data);
    await addNewCustomerPage.clickSave();

    await customersListUIService.customersListPage.waitForOpened();
    await customersListUIService.assertCustomerInTable(data.email, { visible: true });
  });
});

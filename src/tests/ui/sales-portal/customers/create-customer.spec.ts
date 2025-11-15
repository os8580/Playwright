import { test, expect } from "fixtures";
import { SALES_PORTAL_URL } from "config/env";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";

test.describe("[Sales Portal] [Customers]", () => {
  let token = "";
  let createdCustomerId = "";

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customersApi }) => {
    if (createdCustomerId) await customersApi.delete(createdCustomerId, token);
    createdCustomerId = "";
  });

  test("Create customer with API login", async ({ page, customersApi, customersListUIService, addNewCustomerPage }) => {
    const url = new URL(SALES_PORTAL_URL);
    await page.context().addCookies([
      {
        name: "Authorization",
        value: token,
        domain: url.hostname,
        path: "/",
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await customersListUIService.open();
    await customersListUIService.openAddNewCustomerPage();
    await addNewCustomerPage.waitForOpened();

    const data = generateCustomerData();
    await addNewCustomerPage.fillForm(data);
    await addNewCustomerPage.clickSave();

    await customersListUIService.customersListPage.waitForOpened();
    await customersListUIService.assertCustomerInTable(data.email, { visible: true });

    const resp = await customersApi.getSorted(token, { search: data.email });
    expect(resp.body.Customers.length).toBeGreaterThan(0);
    const found = resp.body.Customers.find((c) => c.email === data.email);
    expect(found).toBeTruthy();
    createdCustomerId = found!._id;
  });
});

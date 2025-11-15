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

  test("Create customer with API login", async ({ page, customersApi, customersListPage, addNewCustomerPage }) => {
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

    await customersListPage.open("customers");
    await customersListPage.waitForOpened();
    await customersListPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();

    const data = generateCustomerData();
    await addNewCustomerPage.fillForm(data);
    await addNewCustomerPage.clickSave();

    await customersListPage.waitForOpened();
    await expect(customersListPage.tableRowByEmail(data.email)).toBeVisible();

    // Cleanup via API: find by search and delete by id
    const resp = await customersApi.getSorted(token, { search: data.email });
    expect(resp.body.Customers.length).toBeGreaterThan(0);
    const found = resp.body.Customers.find((c) => c.email === data.email);
    expect(found).toBeTruthy();
    createdCustomerId = found!._id;
  });
});

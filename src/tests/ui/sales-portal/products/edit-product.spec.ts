import { test, expect } from "fixtures";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { IProductDetails } from "data/types/product.types";
import { ProductFormPage } from "ui/pages/products/productForm.page";
import { SALES_PORTAL_URL } from "config/env";

test.describe("[Sales Portal] [Products]", () => {
  let token = "";
  let id = "";

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Edit product with API login", async ({
    page,
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
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

    const created = await productsApiService.create(token);
    id = created._id;

    await productsListUIService.open();

    await productsListPage.editButton(created.name).click();
    const form = new ProductFormPage(page);
    await form.waitForOpened();

    const updatedData = generateProductData({ name: created.name + " Edited" });
    await form.fillForm(updatedData);
    await form.clickSave();

    await productsListPage.waitForOpened();
    await expect(productsListPage.tableRowByName(updatedData.name)).toBeVisible();

    await productsListUIService.openDetailsModal(updatedData.name);
    const actual = await productsListPage.detailsModal.getData();
    const expected: IProductDetails = {
      name: updatedData.name,
      amount: updatedData.amount!,
      price: updatedData.price!,
      manufacturer: updatedData.manufacturer!,
      notes: updatedData.notes ?? "",
      createdOn: created.createdOn,
    };
    productsListUIService.assertDetailsData(actual, expected);
  });
});

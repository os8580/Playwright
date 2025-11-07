import { test, expect } from "fixtures/business.fixture";

import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";

test.describe("[Sales Portal] [Products] [Deletion]", () => {
  test("Should create and then delete a product", async ({
    loginAsAdmin,
    homePage,
    productsListPage,
    addNewProductPage,
  }) => {
    const productData = generateProductData();

    await loginAsAdmin();

    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();

    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();

    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);

    const productRow = productsListPage.tableRowByName(productData.name);
    await expect(productRow).toBeVisible();

    await productsListPage.clickDeleteProduct(productData.name);

    const deleteModal = productsListPage.deleteModal;
    await deleteModal.waitForOpened();
    await deleteModal.clickConfirmDelete();

    await deleteModal.waitForClosed();
    await productsListPage.waitForOpened();

    await expect(productRow).toBeHidden();
  });
});

import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", () => {
  //test with fixtures version 1
  test("Product Details", async ({ loginAsAdmin, homePage, productsListPage, addNewProductPage }) => {
    //login page
    // const emailInput = page.locator("#emailinput");
    // const passwordInput = page.locator("#passwordinput");
    // const loginButton = page.locator("button[type='submit']");
    // await homePage.open();
    // await expect(emailInput).toBeVisible();
    // await emailInput.fill(credentials.username);
    // await passwordInput.fill(credentials.password);
    // await loginButton.click();
    // await homePage.waitForOpened();
    await loginAsAdmin();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  });

  //test with fixtures version 2
  // test("Product Details", async ({ page, pages }) => {
  //   const { homePage, productsListPage, addNewProductPage } = pages;
  //   //login page
  //   const emailInput = page.locator("#emailinput");
  //   const passwordInput = page.locator("#passwordinput");
  //   const loginButton = page.locator("button[type='submit']");
  //   await homePage.open();
  //   await expect(emailInput).toBeVisible();
  //   await emailInput.fill(credentials.username);
  //   await passwordInput.fill(credentials.password);
  //   await loginButton.click();
  //   await homePage.waitForOpened();
  //   await homePage.clickOnViewModule("Products");
  //   await productsListPage.waitForOpened();
  //   await productsListPage.clickAddNewProduct();
  //   await addNewProductPage.waitForOpened();
  //   const productData = generateProductData();
  //   await addNewProductPage.fillForm(productData);
  //   await addNewProductPage.clickSave();
  //   await productsListPage.waitForOpened();
  //   await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
  //   await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  //   await productsListPage.detailsButton(productData.name).click();
  //   const { detailsModal } = productsListPage;
  //   await detailsModal.waitForOpened();
  //   const actual = await detailsModal.getData();
  //   expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  // });
});

import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products] Get Sorted", { tag: [TAGS.PRODUCTS, TAGS.API, TAGS.REGRESSION] }, () => {
  test.describe("Search", () => {
    let id = "";
    let token = "";

    test.beforeEach(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });
    test.afterEach(async ({ productsApiService }) => {
      if (id) await productsApiService.delete(token, id);
      id = "";
    });

    test("Search by name", async ({ productsApiService, productsApi }) => {
      const product = await productsApiService.create(token);

      const response = await productsApi.getSorted(token, { search: product.name });

      validateResponse(response, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });
      const { limit, search, manufacturer, total, page, sorting } = response.body;
      const found = response.body.Products.find((el) => el._id === product._id);
      expect.soft(found, `Created product should be in response`).toBeTruthy();
      expect.soft(limit, `Limit should be ${limit}`).toBe(10);
      expect.soft(search).toBe(product.name);
      expect.soft(manufacturer).toEqual([]);
      expect.soft(page).toBe(1);
      expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
      expect.soft(total).toBeGreaterThanOrEqual(1);
    });

    test("Search by price", async ({ productsApiService, productsApi }) => {
      const product = await productsApiService.create(token);

      const response = await productsApi.getSorted(token, { search: product.price.toString() });

      validateResponse(response, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });
      const { limit, search, manufacturer, total, page, sorting } = response.body;
      const found = response.body.Products.find((el) => el._id === product._id);
      expect.soft(found, `Created product should be in response`).toBeTruthy();
      expect.soft(limit, `Limit should be ${limit}`).toBe(10);
      expect.soft(search).toBe(product.price.toString());
      expect.soft(manufacturer).toEqual([]);
      expect.soft(page).toBe(1);
      expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
      expect.soft(total).toBeGreaterThanOrEqual(1);
    });

    test("Search by manufacturer", async ({ productsApiService, productsApi }) => {
      const product = await productsApiService.create(token);

      const response = await productsApi.getSorted(token, { search: product.manufacturer });

      validateResponse(response, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });
      const { limit, search, manufacturer, total, page, sorting } = response.body;
      const found = response.body.Products.find((el) => el._id === product._id);
      expect.soft(found, `Created product should be in response`).toBeTruthy();
      expect.soft(limit, `Limit should be ${limit}`).toBe(10);
      expect.soft(search).toBe(product.manufacturer);
      expect.soft(manufacturer).toEqual([]);
      expect.soft(page).toBe(1);
      expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
      expect.soft(total).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe("Sorting", () => {
    const ids: string[] = [];
    let token = "";

    test.beforeEach(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });
    test.afterEach(async ({ productsApiService }) => {
      if (ids.length) {
        for (const id of ids) {
          await productsApiService.delete(token, id);
        }
        ids.length = 0;
      }
    });

    test("SortField: createdOn, sortOrder: asc", async ({ productsApiService, productsApi, page }) => {
      const product1 = await productsApiService.create(token);
      await page.waitForTimeout(1000);
      const product2 = await productsApiService.create(token);

      ids.push(product1._id, product2._id);
      const response = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "asc" });

      validateResponse(response, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });

      const actualProducts = response.body.Products;
      for (let i = 1; i < actualProducts.length; i++) {
        const prev = new Date(actualProducts[i - 1]!.createdOn).getTime();
        const curr = new Date(actualProducts[i]!.createdOn).getTime();
        expect.soft(prev).toBeLessThanOrEqual(curr);
      }

      const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
      expect.soft(limit, `Limit should be ${limit}`).toBe(10);
      expect.soft(search).toBe("");
      expect.soft(manufacturer).toEqual([]);
      expect.soft(pageParam).toBe(1);
      expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "asc" });
      expect.soft(total).toBeGreaterThanOrEqual(2);
    });

    test("SortField: createdOn, sortOrder: desc", async ({ productsApiService, productsApi, page }) => {
      const product1 = await productsApiService.create(token);
      await page.waitForTimeout(1000);
      const product2 = await productsApiService.create(token);

      ids.push(product1._id, product2._id);
      const response = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "desc" });

      validateResponse(response, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });

      const actualProducts = response.body.Products;
      for (let i = 1; i < actualProducts.length; i++) {
        const prev = new Date(actualProducts[i - 1]!.createdOn).getTime();
        const curr = new Date(actualProducts[i]!.createdOn).getTime();
        expect.soft(prev).toBeGreaterThanOrEqual(curr);
      }

      const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
      expect.soft(limit, `Limit should be ${limit}`).toBe(10);
      expect.soft(search).toBe("");
      expect.soft(manufacturer).toEqual([]);
      expect.soft(pageParam).toBe(1);
      expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
      expect.soft(total).toBeGreaterThanOrEqual(2);
    });

    test("SortField: manufacturer, sortOrder: desc", async ({ productsApiService, productsApi, page }) => {
      const product1 = await productsApiService.create(token);
      await page.waitForTimeout(1000);
      const product2 = await productsApiService.create(token);

      ids.push(product1._id, product2._id);
      const response = await productsApi.getSorted(token, { sortField: "manufacturer", sortOrder: "desc" });

      validateResponse(response, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });

      const actualProducts = response.body.Products;
      for (let i = 1; i < actualProducts.length; i++) {
        const prevM = actualProducts[i - 1]!.manufacturer;
        const currM = actualProducts[i]!.manufacturer;
        const cmp = prevM.localeCompare(currM);
        expect.soft(cmp).toBeGreaterThanOrEqual(0);
        if (cmp === 0) {
          const prev = new Date(actualProducts[i - 1]!.createdOn).getTime();
          const curr = new Date(actualProducts[i]!.createdOn).getTime();
          expect.soft(prev).toBeGreaterThanOrEqual(curr);
        }
      }

      const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
      expect.soft(limit, `Limit should be ${limit}`).toBe(10);
      expect.soft(search).toBe("");
      expect.soft(manufacturer).toEqual([]);
      expect.soft(pageParam).toBe(1);
      expect.soft(sorting).toEqual({ sortField: "manufacturer", sortOrder: "desc" });
      expect.soft(total).toBeGreaterThanOrEqual(2);
    });
  });
});

import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { generateUniqueProductName } from "utils/product.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  test.describe("Create Product", () => {
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

    test("Should create product with min valid data", async ({ productsApi }) => {
      const productData = generateProductData({
        name: generateUniqueProductName("a1"),
        amount: 0,
        price: 1,
        manufacturer: MANUFACTURERS.SONY,
        notes: "",
      });

      const response = await productsApi.create(productData, token);

      validateResponse(response, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      ids.push(response.body.Product._id);
      expect(_.omit(response.body.Product, ["_id", "createdOn"])).toEqual(productData);
    });

    test("Should create product with max valid data", async ({ productsApi }) => {
      const productData = generateProductData({
        name: generateUniqueProductName("MaxName"),
        amount: 999,
        price: 99999,
        manufacturer: MANUFACTURERS.SONY,
        notes: generateProductData().notes!.slice(0, 250),
      });

      const response = await productsApi.create(productData, token);

      validateResponse(response, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      ids.push(response.body.Product._id);
      expect(_.omit(response.body.Product, ["_id", "createdOn"])).toEqual(productData);
    });

    test("Should create product with name containing single space", async ({ productsApi }) => {
      const productData = generateProductData({
        name: generateUniqueProductName("Token One"),
      });

      const response = await productsApi.create(productData, token);

      validateResponse(response, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      ids.push(response.body.Product._id);
      expect(_.omit(response.body.Product, ["_id", "createdOn"])).toEqual(productData);
    });
  });
});

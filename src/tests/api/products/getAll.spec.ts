import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { getAllProductsSchema } from "data/schemas/products/getAll.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse.utils";
import _ from "lodash";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let createdProduct: Record<string, any> = {};
  let productId = "";

  test.afterEach(async ({ request }) => {
    if (productId) {
      const response = await request.delete(`${baseURL}${endpoints.products}/${productId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status()).toBe(STATUS_CODES.DELETED);
    }
  });

  test("Smoke: Get all products", async ({ request }) => {
    // 1. Login
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });

    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    const loginBody = await loginResponse.json();
    expect.soft(loginBody.IsSuccess).toBe(true);
    expect.soft(loginBody.ErrorMessage).toBe(null);

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect(token).toBeTruthy();

    // 2. Create a product
    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
      data: productData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    expect(createProductResponse.status()).toBe(STATUS_CODES.CREATED);
    const createProductBody = await createProductResponse.json();
    createdProduct = createProductBody.Product;
    productId = createdProduct._id;

    // 3. Get all products
    const getAllProductsResponse = await request.get(baseURL + endpoints.productsAll, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 4. Validate response schema and status
    await validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    // 5. Verify created product exists in response
    const responseBody = await getAllProductsResponse.json();
    const foundProduct = responseBody.Products.find((product: Record<string, any>) => product._id === productId);

    expect(foundProduct, "Created product should be in the list").toBeTruthy();
    expect(_.omit(foundProduct, ["createdOn"])).toEqual(_.omit(createdProduct, ["createdOn"]));
  });
});

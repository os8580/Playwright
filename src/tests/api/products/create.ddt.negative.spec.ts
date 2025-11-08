import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { ERROR_MESSAGES } from "data/salesPortal/notifications";
import { IProduct } from "data/types/product.types";
import { validationErrorSchema } from "data/schemas/products/validation-error.schema";

test.describe("[API] [Sales Portal] [Products]", () => {
  test.describe("Create Product Validation", () => {
    const ids: string[] = [];
    let token = "";

    test.beforeEach(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });

    test.afterEach(async ({ productsApiService }) => {
      if (ids.length) {
        for (const id of ids) await productsApiService.delete(token, id);
        ids.length = 0;
      }
    });

    const cases: { title: string; payload: (p: IProduct) => Record<string, unknown>; expected: { status: number } }[] =
      [
        {
          title: "Missing required field: name (empty)",
          payload: (p: IProduct) => ({ ...p, name: "" }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Invalid name: contains angle brackets",
          payload: (p: IProduct) => ({ ...p, name: "Bad<Name" }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Invalid name: too short",
          payload: (p: IProduct) => ({ ...p, name: "a" }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Invalid manufacturer (not in enum)",
          payload: (p: IProduct) => ({ ...p, manufacturer: "INVALID_MAN" }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Price below minimum",
          payload: (p: IProduct) => ({ ...p, price: 0 }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Price above maximum",
          payload: (p: IProduct) => ({ ...p, price: 100000 }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Amount below minimum",
          payload: (p: IProduct) => ({ ...p, amount: -1 }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Amount above maximum",
          payload: (p: IProduct) => ({ ...p, amount: 1000 }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
        {
          title: "Notes contains forbidden char '<'",
          payload: (p: IProduct) => ({ ...p, notes: "Good note <bad>" }),
          expected: { status: STATUS_CODES.BAD_REQUEST },
        },
      ];

    for (const c of cases) {
      test(c.title, async ({ productsApi }) => {
        const base = generateProductData();
        const payload = c.payload(base);

        const response = await productsApi.create(payload as unknown as IProduct, token);

        validateResponse(response, {
          status: c.expected.status,
          schema: validationErrorSchema,
          IsSuccess: false,
        });
        expect(response.status).toBe(c.expected.status);
        expect(response.body?.IsSuccess).toBe(false);
        if (c.expected.status === STATUS_CODES.BAD_REQUEST) {
          expect(response.body?.ErrorMessage).toBe("Incorrect request body");
        }
      });
    }

    test("Duplicate name returns conflict", async ({ productsApi, productsApiService }) => {
      const p = generateProductData();
      const created1 = await productsApiService.create(token, p);
      const name = created1.name;
      ids.push(created1._id);

      const second = generateProductData({ name });
      const response = await productsApi.create(second, token);

      validateResponse(response, {
        status: STATUS_CODES.CONFLICT,
        IsSuccess: false,
        ErrorMessage: ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS(name),
        schema: validationErrorSchema,
      });
      expect(response.status).toBe(STATUS_CODES.CONFLICT);
      expect(response.body?.IsSuccess).toBe(false);
      expect(response.body?.ErrorMessage).toBe(ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS(name));
    });
  });
});

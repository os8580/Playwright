import { test, expect } from "fixtures/api.fixture";
import { TAGS } from "data/tags";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";

/**
 * Deletes all products except the 5 oldest by createdOn (ascending).
 */
test.describe("[API] [Maintenance] [Sales Portal] [Products]", { tag: [TAGS.API] }, () => {
  test("Cleanup: keep only 5 oldest products", async ({ loginApiService, productsApi, productsApiService, page }) => {
    const token = await loginApiService.loginAsAdmin();

    // 1) Get first page to determine pagination
    const firstPageResp = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "asc", page: 1 });
    validateResponse(firstPageResp, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const { limit, total } = firstPageResp.body;
    const pages = Math.max(1, Math.ceil(total / limit));

    // 2) Collect all products across pages in ascending order
    const allProducts: Array<{ _id: string; createdOn: string }> = [];
    for (let p = 1; p <= pages; p++) {
      const resp = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "asc", page: p });
      validateResponse(resp, {
        status: STATUS_CODES.OK,
        IsSuccess: true,
        ErrorMessage: null,
      });
      allProducts.push(...resp.body.Products.map((x: any) => ({ _id: x._id, createdOn: x.createdOn })));
      // Be gentle to the API between pages
      await page.waitForTimeout(50);
    }

    if (allProducts.length <= 5) {
      test.info().annotations.push({ type: "cleanup", description: `Nothing to delete. Total: ${allProducts.length}` });
      expect(true).toBeTruthy();
      return;
    }

    // 3) Determine which to delete (all except first 5 oldest)
    const idsToDelete = allProducts.slice(5).map((p) => p._id);

    // 4) Delete in batches
    for (const id of idsToDelete) {
      await productsApiService.delete(token, id);
      await page.waitForTimeout(25);
    }

    // 5) Verify only 5 remain
    const verifyResp = await productsApi.getSorted(token, { sortField: "createdOn", sortOrder: "asc", page: 1 });
    validateResponse(verifyResp, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const { total: totalAfter } = verifyResp.body;
    expect(totalAfter).toBeLessThanOrEqual(5);
  });
});

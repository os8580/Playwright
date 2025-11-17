import { test, expect } from "fixtures/business.fixture";
import { buildMetricsResponse } from "data/salesPortal/metrics/generateMetricsResponse";
import { formatMoneyShort } from "utils/number.utils";

test.describe("[Integration] [Sales Portal] [Home] [Metrics]", () => {
  test("Orders This Year", async ({ loginAsAdmin, homePage, mock }) => {
    const value = 123;
    await mock.metrics(buildMetricsResponse({ orders: { totalOrders: value } }));
    await loginAsAdmin();
    await homePage.open();
    await homePage.waitForOpened();
    await expect(homePage.totalOrdersValue).toContainText(String(value));
  });

  test("New Customers", async ({ loginAsAdmin, homePage, mock }) => {
    const value = 45;
    await mock.metrics(buildMetricsResponse({ customers: { totalNewCustomers: value } }));
    await loginAsAdmin();
    await homePage.open();
    await homePage.waitForOpened();
    await expect(homePage.totalNewCustomersValue).toContainText(String(value));
  });

  test("Canceled Orders", async ({ loginAsAdmin, homePage, mock }) => {
    const value = 7;
    await mock.metrics(buildMetricsResponse({ orders: { totalCanceledOrders: value } }));
    await loginAsAdmin();
    await homePage.open();
    await homePage.waitForOpened();
    await expect(homePage.canceledOrdersValue).toContainText(String(value));
  });

  test("Total Revenue (formatted)", async ({ loginAsAdmin, homePage, mock }) => {
    const value = 9876543; // 9.9m
    await mock.metrics(buildMetricsResponse({ orders: { totalRevenue: value } }));
    await loginAsAdmin();
    await homePage.open();
    await homePage.waitForOpened();
    const expected = formatMoneyShort(value);
    await expect(homePage.totalRevenueValue).toContainText(expected);
  });

  test("Avg Order Value (formatted)", async ({ loginAsAdmin, homePage, mock }) => {
    const value = 43210; // 43.2k
    await mock.metrics(buildMetricsResponse({ orders: { averageOrderValue: value } }));
    await loginAsAdmin();
    await homePage.open();
    await homePage.waitForOpened();
    const expected = formatMoneyShort(value);
    await expect(homePage.avgOrderValue).toContainText(expected);
  });
});

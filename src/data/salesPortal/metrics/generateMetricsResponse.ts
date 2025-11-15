import { IMetricsData, IMetricsResponse } from "data/types/metrics.types";

export type OrdersOverrides = Partial<
  Pick<IMetricsData["orders"], "totalRevenue" | "totalOrders" | "averageOrderValue" | "totalCanceledOrders">
>;
export type CustomersOverrides = Partial<Pick<IMetricsData["customers"], "totalNewCustomers">>;
export type ProductsOverrides = Record<string, never>;

export type MetricsOverrides = { orders?: OrdersOverrides; customers?: CustomersOverrides; products?: ProductsOverrides };

export function buildMetricsResponse(overrides?: MetricsOverrides): IMetricsResponse {
  const base: IMetricsData = {
    orders: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      totalCanceledOrders: 0,
      recentOrders: [],
      ordersCountPerDay: [],
    },
    customers: {
      totalNewCustomers: 0,
      topCustomers: [],
      customerGrowth: [],
    },
    products: {
      topProducts: [],
    },
  };

  const merged: IMetricsData = {
    ...base,
    orders: { ...base.orders, ...(overrides?.orders || {}) },
    customers: { ...base.customers, ...(overrides?.customers || {}) },
    products: base.products,
  };

  return { IsSuccess: true, Metrics: merged, ErrorMessage: null };
}

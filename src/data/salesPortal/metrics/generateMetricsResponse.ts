import type { IMetricsResponse, MetricsOverrides } from "data/types/metrics.types";

export const buildMetricsResponse = (overrides?: MetricsOverrides): IMetricsResponse => {
  return {
    IsSuccess: true,
    Metrics: {
      orders: {
        totalRevenue: overrides?.orders?.totalRevenue ?? 100000,
        totalOrders: overrides?.orders?.totalOrders ?? 200,
        averageOrderValue: overrides?.orders?.averageOrderValue ?? 500,
        totalCanceledOrders: overrides?.orders?.totalCanceledOrders ?? 15,
        recentOrders: [],
        ordersCountPerDay: [],
      },
      customers: {
        totalNewCustomers: overrides?.customers?.totalNewCustomers ?? 50,
        topCustomers: [],
        customerGrowth: [],
      },
      products: {
        topProducts: [],
      },
    },
    ErrorMessage: null,
  };
};

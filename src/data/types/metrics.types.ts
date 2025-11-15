export interface IDateTriple {
  year: number;
  month: number;
  day: number;
}

export interface IOrdersCountPerDayItem {
  date: IDateTriple;
  count: number;
}

export interface ICustomerGrowthItem {
  date: IDateTriple;
  count: number;
}

export interface IRecentOrderCustomer {
  _id: string;
  email: string;
  name: string;
}

export interface IRecentOrder {
  _id: string;
  status: string;
  customer: IRecentOrderCustomer;
  total_price: number;
}

export interface ITopCustomer {
  _id?: string;
  customerName: string;
  customerEmail: string;
  totalSpent: number;
  ordersCount: number;
}

export interface ITopProduct {
  name: string;
  sales: number;
}

export interface IMetricsData {
  orders: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCanceledOrders: number;
    recentOrders: IRecentOrder[];
    ordersCountPerDay: IOrdersCountPerDayItem[];
  };
  customers: {
    totalNewCustomers: number;
    topCustomers: ITopCustomer[];
    customerGrowth: ICustomerGrowthItem[];
  };
  products: {
    topProducts: ITopProduct[];
  };
}

export interface IMetricsResponse {
  IsSuccess: boolean;
  Metrics: IMetricsData;
  ErrorMessage: string | null;
}

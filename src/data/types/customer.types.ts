import { COUNTRIES } from "data/salesPortal/customers/countries";
import { ID, IResponseFields, SortOrder } from "./core.types";

export interface ICustomerBase {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string;
}

export interface ICustomer extends ICustomerBase {}

export interface ICustomerInTable extends Pick<ICustomerBase, "email" | "name" | "country">, ICreatedOn {}

export interface ICustomerDetails extends Required<ICustomerBase>, ICreatedOn {}

export interface ICustomerFromResponse extends Required<ICustomerBase>, ICreatedOn, ID {}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}

export interface ICustomersSortedResponse extends ICustomersResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  country: string[];
  sorting: {
    sortField: CustomersSortField;
    sortOrder: SortOrder;
  };
}

export type CustomersSortField = "email" | "name" | "country" | "createdOn";

export interface IGetCustomersParams {
  country: COUNTRIES[];
  search: string;
  sortField: CustomersSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export type CustomersTableHeader = "Email" | "Name" | "Country" | "Created On";

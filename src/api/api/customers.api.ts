import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/core.types";
import {
  ICustomer,
  ICustomerResponse,
  ICustomersResponse,
  ICustomersSortedResponse,
  IGetCustomersParams,
} from "data/types/customer.types";
import { convertRequestParams } from "utils/queryParams.utils";
import { logStep } from "utils/report/logStep.utils";

export class CustomersApi {
  constructor(private apiClient: IApiClient) {}

  @logStep("Create customer via API")
  async create(customer: ICustomer, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.customers,
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: customer,
    };
    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep("Get customer by ID via API")
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.customerById(id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep("Get all customers via API")
  async getAll(token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.customersAll,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<ICustomersResponse>(options);
  }

  @logStep("Get sorted customers via API")
  async getSorted(token: string, params?: Partial<IGetCustomersParams>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.customers + (params ? convertRequestParams(params) : ""),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<ICustomersSortedResponse>(options);
  }

  @logStep("Delete customer via API")
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.customerById(id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<null>(options);
  }
}

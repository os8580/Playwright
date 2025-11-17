import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage, ProductsListPage } from "ui/pages/products";
import { BaseService } from "./base.service";
import { SalesPortalRoutes } from "data/types/routes.types";

export class AddNewProductUIService extends BaseService {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(page: Page) {
    super(page);
    this.addNewProductPage = new AddNewProductPage(this.page);
    this.productsListPage = new ProductsListPage(this.page);
  }

  async open() {
    await this.addNewProductPage.open(SalesPortalRoutes.PRODUCTS_ADD);
    await this.addNewProductPage.waitForOpened();
  }

  async create(productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillForm(data);
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}

import { Page } from "@playwright/test";

export abstract class BaseService {
  constructor(protected page: Page) {}
}

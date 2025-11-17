import { Page } from "@playwright/test";
import { IResponse } from "data/types/core.types";
import { SALES_PORTAL_URL } from "config/env";

export abstract class BasePage {
  constructor(protected page: Page) {}

  async setAuthCookie(token: string) {
    const url = new URL(SALES_PORTAL_URL);
    await this.page.context().addCookies([
      {
        name: "Authorization",
        value: token,
        domain: url.hostname,
        path: "/",
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      },
    ]);
  }

  async interceptRequest<T extends unknown[]>(url: string, triggerAction: (...args: T) => Promise<void>, ...args: T) {
    const [request] = await Promise.all([
      this.page.waitForRequest((request) => request.url().includes(url)),
      triggerAction(...args),
    ]);
    return request;
  }

  async interceptResponse<U extends object | null, T extends unknown[]>(
    url: string,
    triggerAction: (...args: T) => Promise<void>,
    ...args: T
  ): Promise<IResponse<U>> {
    const [response] = await Promise.all([
      this.page.waitForResponse((response) => response.url().includes(url)),
      triggerAction(...args),
    ]);
    return {
      status: response.status(),
      headers: response.headers(),
      body: (await response.json()) as U,
    };
  }
}

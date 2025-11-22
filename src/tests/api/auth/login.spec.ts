import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { TAGS } from "data/tags";
import { loginSchema } from "data/schemas/auth/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Auth]", { tag: [TAGS.API, TAGS.SMOKE] }, () => {
  test("Smoke: Login with valid credentials", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });

    // Проверяем ответ на соответствие схеме и статус
    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    // Проверяем наличие токена в заголовках
    const headers = loginResponse.headers();
    const token = headers["authorization"];
    expect(token, "Authorization token should be present in headers").toBeTruthy();

    // Проверяем соответствие данных пользователя
    const loginBody = await loginResponse.json();
    expect(loginBody.User.username).toBe(credentials.username);
  });
});

import { type Page, expect } from "@playwright/test";

/**
 * Represents the key-value structure of a table row's data.
 */
export interface ITableRowData {
  "Last Name": string;
  "First Name": string;
  Email: string;
  Due: string;
  "Web Site": string;
}

/**
 * Finds a specific row in the second table (#table2) by the user's email
 * and returns its data as a key-value object.
 * @param page The Playwright Page object.
 * @param email The email to find within the table.
 * @returns A promise that resolves to the row's data.
 */
export async function getTableRowByEmail(page: Page, email: string): Promise<ITableRowData> {
  // Locate the table row that contains a cell with the specified email.
  const rowLocator = page.locator("#table2 tbody tr", { hasText: email });

  // Ensure that exactly one row is found to avoid ambiguity.
  await expect(rowLocator).toHaveCount(1, { timeout: 5000 });

  // Get all table headers and all cells from the located row.
  const headers = await page.locator("#table2 thead th").allInnerTexts();
  const cells = await rowLocator.locator("td").allInnerTexts();

  const rowData: ITableRowData = {} as ITableRowData;

  // Map each header to its corresponding cell value.
  for (const [i, header] of headers.entries()) {
    const cell = cells[i];

    // Skip the "Action" column or any potentially undefined cells.
    if (!cell || header === "Action") {
      continue;
    }

    // Trim whitespace from both header and cell for cleaner data.
    rowData[header.trim() as keyof ITableRowData] = cell.trim();
  }

  return rowData;
}

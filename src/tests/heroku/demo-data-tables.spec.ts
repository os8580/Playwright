/**
 * @file Test suite for verifying the data in the second table
 * on the "Data Tables" page.
 */
import { test, expect } from '@playwright/test';
import { getTableRowByEmail } from '../../data/heroku/table-helper';
import usersToTest from '../../data/heroku/table.data';

test.describe('[Demo Data Tables] Table 2 Data Verification', () => {
  // Common setup: navigate to the page before each test.
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
  });

  // This loop uses expected data to compare the data in the actual table rows
  test('should return correct row data for all users in table 2', async ({ page }) => {
    for (const user of usersToTest) {
      const rowData = await getTableRowByEmail(page, user.email);
      expect.soft(rowData).toEqual(user.expectedData);
    }
  });
});
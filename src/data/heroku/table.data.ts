/**
 * @file Contains test data for the second table on the "Data Tables" page.
 */

import type { ITableRowData } from './table-helper';

// Defines the structure for a single user data test case.
interface IUserData {
  email: string;
  expectedData: ITableRowData;
}

const usersToTest: IUserData[] = [
  {
    email: 'jsmith@gmail.com',
    expectedData: {
      'Last Name': 'Smith',
      'First Name': 'John',
      'Email': 'jsmith@gmail.com',
      'Due': '$50.00',
      'Web Site': 'http://www.jsmith.com',
    },
  },
  {
    email: 'fbach@yahoo.com',
    expectedData: {
      'Last Name': 'Bach',
      'First Name': 'Frank',
      'Email': 'fbach@yahoo.com',
      'Due': '$51.00',
      'Web Site': 'http://www.frank.com',
    },
  },
  {
    email: 'jdoe@hotmail.com',
    expectedData: {
      'Last Name': 'Doe',
      'First Name': 'Jason',
      'Email': 'jdoe@hotmail.com',
      'Due': '$100.00',
      'Web Site': 'http://www.jdoe.com',
    },
  },
  {
    email: 'tconway@earthlink.net',
    expectedData: {
      'Last Name': 'Conway',
      'First Name': 'Tim',
      'Email': 'tconway@earthlink.net',
      'Due': '$50.00',
      'Web Site': 'http://www.timconway.com',
    },
  },
];

export default usersToTest;
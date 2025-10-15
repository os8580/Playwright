/**
 * @file Contains negative test cases for the registration form.
 * Each case includes a descriptive title, invalid credentials,
 * and the expected error message.
 */

export interface ICredentials {
  username: string;
  password: string;
}

export interface IUserData {
  title: string;
  credentials: ICredentials;
  expectedMessage: string;
}

const negativeTestData: IUserData[] = [
  // --- Invalid Username Scenarios ---
  {
    title: 'should show an error for an empty username',
    credentials: { username: '', password: 'ValidPass1' },
    expectedMessage: 'Username is required',
  },
  {
    title: 'should show an error for a username with a leading space',
    credentials: { username: ' John', password: 'ValidPass1' },
    expectedMessage: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    title: 'should show an error for a username with a trailing space',
    credentials: { username: 'John ', password: 'ValidPass1' },
    expectedMessage: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    title: 'should show an error for a username that is too short',
    credentials: { username: 'Jo', password: 'ValidPass1' },
    expectedMessage: 'Username should contain at least 3 characters',
  },

  // --- Invalid Password Scenarios ---
  {
    title: 'should show an error for an empty password',
    credentials: { username: 'ValidUser', password: '' },
    expectedMessage: 'Password is required',
  },
  {
    title: 'should show an error for a password that is too short',
    credentials: { username: 'ValidUser', password: '12345' },
    expectedMessage: 'Password should contain at least 8 characters',
  },
  {
    title: 'should show an error for a password with no lowercase letters',
    credentials: { username: 'ValidUser', password: 'PASSWORD123' },
    expectedMessage: 'Password should contain at least one character in lower case',
  },

  // --- Both Invalid Scenario ---
  {
    title: 'should show a generic error when both username and password are empty',
    credentials: { username: '', password: '' },
    expectedMessage: 'Please, provide valid data',
  },
];

export default negativeTestData;
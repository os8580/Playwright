import { faker } from "@faker-js/faker";
import { COUNTRIES } from "./countries";
import { ICustomer } from "data/types/customer.types";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  const countryValues = Object.values(COUNTRIES);
  const country = countryValues[faker.number.int({ min: 0, max: countryValues.length - 1 })] as COUNTRIES;
  return {
    email: faker.internet.email({ provider: "example.com" }).toLowerCase(),
    name: faker.person.fullName(),
    country,
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    phone: "+" + faker.number.int({ min: 1000000000, max: 999999999999999999 }).toString(),
    notes: faker.string.alphanumeric({ length: 100 }),
    ...params,
  };
}

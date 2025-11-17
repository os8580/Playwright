import { faker } from "@faker-js/faker";
import { COUNTRIES } from "./countries";
import { ICustomer } from "data/types/customer.types";

function generateValidName(): string {
  const firstName = faker.person.firstName().replace(/[^A-Za-z]/g, "");
  const lastName = faker.person.lastName().replace(/[^A-Za-z]/g, "");
  const name = `${firstName} ${lastName}`.slice(0, 40);
  return name;
}

function generateValidCity(): string {
  let city = faker.location
    .city()
    .replace(/[^A-Za-z ]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return city.slice(0, 20);
}

function generateValidStreet(): string {
  let street = faker.location
    .street()
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return street.slice(0, 40);
}

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  const countryValues = Object.values(COUNTRIES);
  const country = countryValues[faker.number.int({ min: 0, max: countryValues.length - 1 })] as COUNTRIES;
  return {
    email: `${faker.string.alphanumeric({ length: 8 }).toLowerCase()}+${Date.now()}@example.com`,
    name: generateValidName(),
    country,
    city: generateValidCity(),
    street: generateValidStreet(),
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    phone: "+1" + faker.string.numeric(10),
    notes: faker.string.alphanumeric({ length: 100 }),
    ...params,
  };
}

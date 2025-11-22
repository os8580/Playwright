import { faker } from "@faker-js/faker";
import { COUNTRIES } from "./countries";
import { ICustomer } from "data/types/customer.types";

const COUNTRY_PHONE_CODES: Record<COUNTRIES, string> = {
  [COUNTRIES.USA]: "+1",
  [COUNTRIES.Canada]: "+1",
  [COUNTRIES.Belarus]: "+375",
  [COUNTRIES.Ukraine]: "+380",
  [COUNTRIES.Germany]: "+49",
  [COUNTRIES.France]: "+33",
  [COUNTRIES.GreatBritain]: "+44",
  [COUNTRIES.Russia]: "+7",
};

function generatePhoneByCountry(country: COUNTRIES): string {
  const code = COUNTRY_PHONE_CODES[country];
  const digits = faker.string.numeric(10);
  return `${code}${digits}`;
}

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  const countryValues = Object.values(COUNTRIES);
  const country = countryValues[faker.number.int({ min: 0, max: countryValues.length - 1 })] as COUNTRIES;
  return {
    email: `${faker.string.alphanumeric({ length: 8 }).toLowerCase()}+${Date.now()}@example.com`,
    name: faker.person.fullName(),
    country,
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    phone: generatePhoneByCountry(country),
    notes: faker.string.alphanumeric({ length: 100 }),
    ...params,
  };
}

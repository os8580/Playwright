import { faker } from "@faker-js/faker";

export function generateUniqueProductName(base: string): string {
  const suffix = faker.string.hexadecimal({ length: 4 });
  return `${base} ${suffix}`.slice(0, 40);
}

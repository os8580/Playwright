import numeral from "numeral";

export function formatMoneyShort(value: number): string {
  return `$${numeral(value).format("0.0a")}`;
}

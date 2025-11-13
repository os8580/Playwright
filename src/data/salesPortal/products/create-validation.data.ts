import { STATUS_CODES } from "data/statusCodes";
import { IProduct } from "data/types/product.types";

export const productValidationCases: {
  title: string;
  payload: (p: IProduct) => Record<string, unknown>;
  expected: { status: number };
}[] = [
  {
    title: "Missing required field: name (empty)",
    payload: (p: IProduct) => ({ ...p, name: "" }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Invalid name: contains angle brackets",
    payload: (p: IProduct) => ({ ...p, name: "Bad<Name" }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Invalid name: too short",
    payload: (p: IProduct) => ({ ...p, name: "a" }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Invalid manufacturer (not in enum)",
    payload: (p: IProduct) => ({ ...p, manufacturer: "INVALID_MAN" }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Price below minimum",
    payload: (p: IProduct) => ({ ...p, price: 0 }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Price above maximum",
    payload: (p: IProduct) => ({ ...p, price: 100000 }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Amount below minimum",
    payload: (p: IProduct) => ({ ...p, amount: -1 }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Amount above maximum",
    payload: (p: IProduct) => ({ ...p, amount: 1000 }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
  {
    title: "Notes contains forbidden char '<'",
    payload: (p: IProduct) => ({ ...p, notes: "Good note <bad>" }),
    expected: { status: STATUS_CODES.BAD_REQUEST },
  },
];

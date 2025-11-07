import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";

export const getAllProductsSchema = {
  type: "object",
  properties: {
    ...obligatoryFieldsSchema,
    Products: {
      type: "array",
    },
  },
  required: [...obligatoryRequredFields, "Products"],
};

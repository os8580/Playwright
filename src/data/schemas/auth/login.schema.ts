import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";

export const loginSchema = {
  type: "object",
  properties: {
    ...obligatoryFieldsSchema,
    User: {
      type: "object",
    },
  },
  required: [...obligatoryRequredFields, "User"],
};

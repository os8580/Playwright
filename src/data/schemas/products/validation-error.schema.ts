import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";

export const validationErrorSchema = {
  type: "object",
  properties: {
    ...obligatoryFieldsSchema,
    SchemaErrors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          instancePath: { type: "string" },
          schemaPath: { type: "string" },
          keyword: { type: "string" },
          params: { type: "object" },
          message: { type: "string" },
        },
        required: ["instancePath", "schemaPath", "keyword", "params", "message"],
      },
    },
  },
  required: [...obligatoryRequredFields],
};

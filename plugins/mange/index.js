import pluginInfo from "../../plugin-manifest.json";

const getFields = (contentTypes) => {
  return {
    metaDefinition: {
      order: ["singleton_types"],
      propertiesConfig: {
        singleton_types: {
          label: "Singleton Types",
          helpText: "List of content types that should only contain one record",
          unique: false,
          inputType: "select",
          optionsWithLabels: contentTypes,
          useOptionsWithLabels: true,
        },
      },
    },
    schemaDefinition: {
      additionalProperties: false,
      required: [],
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/AbstractContentTypeSchemaDefinition",
        },
        {
          type: "object",
          properties: {
            singleton_types: {
              type: "string",
              minLength: 1,
            },
          },
        },
      ],
    },
  };
};

export const pluginsManageFormSchemaHandler = (contentTypes) => {
  const ctds = contentTypes
    ?.filter(({ internal }) => !internal)
    ?.map(({ name, label }) => ({ value: name, label }));

  return {
    schema: {
      ...getFields(ctds),
      id: pluginInfo.id,
    },
  };
};

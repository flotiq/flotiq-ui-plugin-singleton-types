import pluginInfo from '../../plugin-manifest.json';
import i18n from 'i18next';

const getFields = (contentTypes) => {
  return {
    metaDefinition: {
      order: ['singleton_types'],
      propertiesConfig: {
        singleton_types: {
          label: i18n.t('SingletonTypes'),
          helpText: i18n.t('SingletonTypesDescription'),
          unique: false,
          inputType: 'select',
          optionsWithLabels: contentTypes,
          useOptionsWithLabels: true,
          isMultiple: true,
        },
      },
    },
    schemaDefinition: {
      additionalProperties: false,
      required: [],
      type: 'object',
      allOf: [
        {
          $ref: '#/components/schemas/AbstractContentTypeSchemaDefinition',
        },
        {
          type: 'object',
          properties: {
            singleton_types: {
              type: 'array',
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

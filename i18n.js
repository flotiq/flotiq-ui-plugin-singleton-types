import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  resources: {
    en: {
      translation: {
        SingletonTypes: 'Singleton Types',
        SingletonTypesDescription:
          'List of content types that should only contain one record',
      },
    },
    pl: {
      translation: {
        SingletonTypes: 'Typy singletonowe',
        SingletonTypesDescription:
          'Lista typów treści, które powinny zawierać tylko jeden rekord.',
      },
    },
  },
});

export default i18n;

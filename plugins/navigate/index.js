import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';

const generateLoader = (pluginId) => {
  let loader = getCachedElement(
    `${pluginId}-flotiq-singleton-plugin-loader`,
  )?.element;

  if (!loader) {
    loader = document.createElement('div');
    loader.classList.add('flotiq-singleton-plugin-loader-container');
    loader.innerHTML = '<div class="flotiq-singleton-plugin-loader"></div>';

    addElementToCache(loader, `${pluginId}-flotiq-singleton-plugin-loader`);
  }

  return loader;
};

export default function gridRenderHandler(
  { contentType, contentObjects, isFetching, isLoading },
  getPluginSettings,
  navigate,
) {
  if (isLoading || isFetching) return generateLoader();
  const settings = JSON.parse(getPluginSettings());

  if (!settings.singleton_types.includes(contentType?.name)) return;

  const url = new URL(window.location.href);

  if (!contentObjects[0]) {
    url.pathname = url.pathname.replace(
      '/' + contentType.name,
      `/add/${contentType.name}`,
    );
  } else {
    url.pathname = url.pathname.replace(
      '/' + contentType.name,
      `/edit/${contentType.name}/${contentObjects[0].id}`,
    );
  }

  navigate(url.pathname);
}

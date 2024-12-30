import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';

const generateLoader = (pluginId) => {
  let loader = getCachedElement(`${pluginId}-loader`)?.element;

  if (!loader) {
    loader = document.createElement('div');
    loader.classList.add('loader-container');
    loader.innerHTML = '<div class="loader"></div>';

    addElementToCache(loader, `${pluginId}-loader`);
  }

  return loader;
};

export default function gridRenderHandler(
  { contentType, contentObjects, pagination, isRefetching },
  getPluginSettings,
  navigate,
) {
  if (!getPluginSettings()) return;
  const settings = JSON.parse(getPluginSettings());

  if (!pagination.current_page) return;

  if (!settings.singleton_types.includes(contentType?.name)) return;
  if (isRefetching) return generateLoader();

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

import {
  addObjectToCache,
  getCachedElement,
} from "../../common/plugin-element-cache.js";

export default function gridRenderHandler(
  { contentType, contentObjects, pagination },
  getPluginSettings,
  navigate,
  pluginInfo,
) {
  if (!getPluginSettings()) return;

  const settings = JSON.parse(getPluginSettings());

  if (!pagination.current_page) return;
  if (!settings.singleton_types.includes(contentType?.name)) return;

  const cacheUrlKey = `${pluginInfo.id}-url`;

  let url = getCachedElement(cacheUrlKey);

  if (!url) {
    url = new URL(window.location.href);

    if (url.pathname.includes("/add/") || url.pathname.includes("/edit/")) {
      return;
    }

    if (!contentObjects[0]) {
      url.pathname = url.pathname.replace(
        "/" + contentType.name,
        `/add/${contentType.name}`,
      );
    } else {
      url.pathname = url.pathname.replace(
        "/" + contentType.name,
        `/edit/${contentType.name}/${contentObjects[0].id}`,
      );
    }

    url = url.pathname;

    addObjectToCache(url, cacheUrlKey);
  }

  navigate(url);

  return "";
}

import { registerFn } from "../common/plugin-element-cache";
import pluginInfo from "../plugin-manifest.json";
import cssString from "inline:./styles/style.css";
import { pluginsManageFormSchemaHandler } from "./mange/index.js";
import gridRenderHandler from "./grid-render/index.js";

registerFn(pluginInfo, (handler, _, { getPluginSettings, navigate }) => {
  /**
   * Add plugin styles to the head of the document
   */
  if (!document.getElementById(`${pluginInfo.id}-styles`)) {
    const style = document.createElement("style");
    style.id = `${pluginInfo.id}-styles`;
    style.textContent = cssString;
    document.head.appendChild(style);
  }

  handler.on("flotiq.grid::render", (event) => {
    if (!event.contentType || !event.contentObjects) return;
    return gridRenderHandler(event, getPluginSettings, navigate, pluginInfo);
  });

  handler.on("flotiq.plugins.manage::form-schema", ({ contentTypes }) => {
    return pluginsManageFormSchemaHandler(contentTypes);
  });
});

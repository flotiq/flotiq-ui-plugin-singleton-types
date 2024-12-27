import { registerFn } from '../common/plugin-element-cache';
import pluginInfo from '../plugin-manifest.json';
import cssString from 'inline:./styles/style.css';
import { pluginsManageFormSchemaHandler } from './mange/index.js';
import gridRenderHandler from './navigate/index.js';
import i18n from '../i18n.js';

registerFn(
  pluginInfo,
  (handler, _, { getPluginSettings, getLanguage, navigate }) => {
    /**
     * Add plugin styles to the head of the document
     */
    if (!document.getElementById(`${pluginInfo.id}-styles`)) {
      const style = document.createElement('style');
      style.id = `${pluginInfo.id}-styles`;
      style.textContent = cssString;
      document.head.appendChild(style);
    }

    const language = getLanguage();
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }

    handler.on('flotiq.grid::render', (event) => {
      return gridRenderHandler(event, getPluginSettings, navigate, pluginInfo);
    });

    handler.on('flotiq.plugins.manage::form-schema', ({ contentTypes }) => {
      return pluginsManageFormSchemaHandler(contentTypes);
    });

    handler.on('flotiq.language::changed', ({ language }) => {
      if (language !== i18n.language) {
        i18n.changeLanguage(language);
      }
    });
  },
);

import { AMapLoadOptions, loadScript } from '@utils/load.ts';
import { AMapContainer } from './package/container';
import { App } from 'vue';

function install(app: App<Element>, options?: AMapLoadOptions) {
  // package
  app.component(AMapContainer.name, AMapContainer);
  // load
  if (options) {
    loadScript(options);
    options.isInit = true;
  }
  app.config.globalProperties.$AMap = options || {};
}

export default {
  install,
  AMapContainer,
};

import { AMapContainer } from './package/container';
import { AMapEllipse } from './modules/ellipse';
import { App } from 'vue';

export {
  AMapEllipse,
  AMapContainer,
};

export default {
  install: (app: App<Element>) => {
    app.component(AMapEllipse.name, AMapEllipse);
    app.component(AMapContainer.name, AMapContainer);
  },
};

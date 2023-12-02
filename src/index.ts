import { AmapContainer } from './package/container';
import { App } from 'vue';

export {
  AmapContainer,
};

export default {
  install: (app: App<Element>) => {
    app.component('amap-container', AmapContainer);
  },
};

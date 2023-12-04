import { AMapListener } from './listener';
import { mergeOptions } from '@utils/object.ts';

export interface AMapLoadOptions {
  apiKey?: string; // apiKey
  version?: string; // 版本
  isInit?: boolean; // 是否初始化
  plugins?: string[]; // 插件
}

function loadBeforeScript(callback: () => void) {
  const script = document.createElement('script');
  script.src = 'https://webapi.amap.com/loader.js';
  script.type = 'text/javascript';
  script.onload = callback;
  document.body.appendChild(script);
}

export function loadScript(options: AMapLoadOptions) {
  return new Promise<typeof AMap>(resolve => {
    function Callback() {
      if (window.AMap) return false;
      const { apiKey, ...conf } = mergeOptions({}, options);
      window.AMapLoader.load({ key: apiKey, ...conf }).then(AMap => {
        AMapListener.emit('load', AMap);
        resolve(AMap);
      });
    }

    // load script
    if (!window.AMapLoader) {
      loadBeforeScript(Callback);
    } else {
      Callback();
    }
  });
}

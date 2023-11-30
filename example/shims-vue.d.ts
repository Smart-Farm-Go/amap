/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;

  declare global {
    interface Window {
      AMapLoader: {
        load: (conf: any) => Promise<any>;
        reset: (conf?: any) => Promise<any>;
      };
      AMap: {
        Map: {
          new(...args: any[]): {
            [key: string]: any;
          };
        }
      };
    }
  }
}

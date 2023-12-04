/// <reference types="vite/client" />

declare global {
  interface Window {
    AMapLoader: {
      load(options: { key: string; version?: string; plugins?: string[] }): Promise<AMap>
    };
  }
}

export {};

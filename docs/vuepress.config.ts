import { App, defaultTheme, defineUserConfig } from 'vuepress';

export default defineUserConfig({
  lang: 'zh-CN',
  title: '@sfos/amap',
  description: '这是基于高德地图2.0实现的一个模块用于在[SFOS_Web]中使用高德地图。',
  theme: defaultTheme({
    navbar: [{
      text: 'github',
      link: 'https://github.com/Smart-Farm-Go/amap',
    }],
    sidebar: {
      '/': [{
        text: '介绍',
      }],
    },
  }),
});

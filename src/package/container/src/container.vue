<template>
  <div class="amap-container">
    <div ref="containerRef"></div>
    <div class="amap-container__error" v-show="data.isError">{{ data['isError'] }}</div>
    <component :is="'script'" src="https://webapi.amap.com/loader.js" @load="onScriptLoad"/>
  </div>
</template>

<script lang="ts">export default { name: 'AmapContainer' };</script>
<script lang="ts" setup>
import { ReWriteObj } from '../../../utils/object';
import { computed, reactive, ref } from 'vue';

interface Props {
  /* api key */
  apiKey: string;
  /* 版本 */
  version?: string;
  /* 插件 */
  plugins?: string[];
  //
  zoom?: number; // 放大级别
  viewMode?: '2D' | '3D'; // 地图模式
  zoomEnable?: boolean; //地图是否可缩放，默认值为true
  dragEnable?: boolean; // 地图是否可通过鼠标拖拽平移，默认为true
  rotateEnable?: boolean; // 地图是否可旋转，3D视图默认为true，2D视图默认false
  showIndoorMap?: boolean; // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
  keyboardEnable?: boolean; //地图是否可通过键盘控制，默认为true
  center?: [number, number]; // 地图坐标
  doubleClickZoom?: boolean; // 地图是否可通过双击鼠标放大地图，默认为true
}

const props = withDefaults(defineProps<Props>(), {});

const data = reactive<any>({ isError: '' });
const containerRef = ref<HTMLElement>();
const emits = defineEmits(['load', 'initialize', 'complete', 'zoom', 'move']);

const bindConf = [
  'zoom',
  'center',
  'viewMode',
  'zoomEnable',
  'dragEnable',
  'rotateEnable',
  'showIndoorMap',
  'keyboardEnable',
  'doubleClickZoom',
];

// 加载脚本
function onScriptLoad() {
  data.isError = '';
  const { apiKey, version } = props;
  window.AMapLoader.load({ key: apiKey, version }).then(AMap => {
    emits('load', AMap); // 回调
    data.AMap = AMap;
    // 创建地图
    data.map = createMap(ReWriteObj(props, bindConf, true), AMap);
    // 初始化
    emits('initialize', data.map);
  }).catch(e => {
    data.isError = e.message;
    console.error(e);
  });
}

// 初始化地图
function createMap(config: any, AMap?: any) {
  AMap = AMap || data.AMap || window.AMap;
  data.map = new AMap.Map(containerRef, config);
  // 生命周期
  data.map.on('complete', (...args: any[]) => emits('complete', ...args));
  // 添加插件
  addPlugin(props.plugins || []);
  // 回调
  return data.map;
}

// 添加插件
async function addPlugin(plugins: string[]) {
  const AMap = await window.AMapLoader.load({ plugins });
  if (!data.map) throw new Error('请先初始化地图');
  for (const keys of (props.plugins || [])) {
    const plugin = keys.split('.').slice(1)[0];
    data.map.addControl(new AMap[plugin]());
  }
}

// 地图销毁
function destroy() {
  return data.map?.destroy();
}

defineExpose({ destroy, addPlugin, ref: computed(() => data.map) });
</script>

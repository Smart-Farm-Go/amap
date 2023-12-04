<template>
  <div class="var-AMap">
    <slot :map="data.map"/>
    <div class="var-AMap__container" ref="mapRef"/>
  </div>
</template>

<script lang="ts">export default { name: 'AmapContainer' };</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, onBeforeMount, provide, reactive, ref, watch } from 'vue';
import { mergeOptions, ReWriteObj } from '@utils/object.ts';
import { AMapEvent, AMapListener } from '@utils/listener.ts';
import { loadScript } from '@utils/load.ts';

interface Props {
  apiKey?: string; // apiKey
  version?: string; // 版本
  plugins?: string[]; // 插件
  //
  zoom?: number; // 放大级别
  roadNet?: boolean; // 路网
  satellite?: boolean; // 卫星
  showLabel?: boolean; // 是否显示标注
  viewMode?: '2D' | '3D'; // 地图模式
  center?: [number, number]; // 地图坐标
  features?: ('bg' | 'point' | 'road' | 'building')[]; // 地图显示的要素
  mapStyle?: 'normal' | 'dark' | 'light' | 'whitesmoke' | 'fresh' | 'grey' | 'graffiti' | 'macaron' | 'blue' | 'darkblue' | 'wine' | string; // 设置地图的显示样式
}

interface State {
  map: AMap.Map | null;
  layer: { [name: string]: any };
}

const mapRef = ref<HTMLElement>();
const props = withDefaults(defineProps<Props>(), {
  version: '2.0',
  plugins: () => [
    'ElasticMarker', // 高德地图的弹窗插件
    'MapType', // 地图类型插件
    'Geolocation', // 定位插件
    'DistrictSearch', // 行政区查询插件
    'Geocoder', // 地址解析插件
    'MouseTool', // 鼠标工具插件
    'CircleEditor', // 圆形编辑插件
    'PolygonEditor', // 多边形编辑插件
    'PolylineEditor', // 折线编辑插件
    'RectangleEditor', // 矩形编辑插件
    'EllipseEditor', // 椭圆编辑插件
    'BezierCurveEditor', // 贝塞尔曲线编辑插件
    'RangingTool', // 测距工具插件
    'Weather', // 天气插件
    'BezierCurveEditor',  // 贝塞尔曲线编辑插件
  ].map(v => `AMap.${v}`),
  //
  zoom: 17,
  viewMode: '2D',
  mapStyle: 'normal',
  features: () => ['bg', 'point', 'road', 'building'],
});
const globalConf = (getCurrentInstance()?.proxy as any).$AMap;

onBeforeMount(() => {
  // load
  if (!globalConf.isInit) {
    globalConf.isInit = true;
    loadScript(mergeOptions(globalConf, ReWriteObj(props, ['apiKey', 'version', 'plugins'])));
  }
  // init
  if (!window.AMap) {
    AMapListener.on('load', onInitScript);
  } else {
    onInitScript();
  }
});

const emits = defineEmits(['init', 'complete', 'destroy']);

function onEmits(type: AMapEvent, ...args: any[]) {
  AMapListener.emit(type, ...args);
  emits(type as any, ...args);
}

const data = reactive<State>({ map: null, layer: {} });

provide('AMap', computed(() => data.map));

function getConfig(): AMap.MapOptions {
  const conf = ReWriteObj(props, ['zoom', 'viewMode', 'center', 'features', 'mapStyle']);
  conf.mapStyle = `amap://styles/${conf.mapStyle || 'macaron'}`;
  return conf;
}

function onLoadInit(callback: () => void) {
  if (!data.map) {
    AMapListener.on('load', callback, true);
  } else {
    callback();
  }
}

// 地图初始化
function onInitScript() {
  if (data.map) return false;
  data.map = new window.AMap.Map(mapRef.value as any, getConfig());
  onEmits('init', data.map);
  //
  data.map.on('complete', () => onEmits('complete'));
}

// 地图销毁
function destroy() {
  if (data.map) {
    onEmits('destroy');
    data.map.destroy();
    data.map = null;
  }
}

defineExpose({ destroy, ref: computed(() => data.map) });

watch(() => ({
  zoom: props.zoom,
  center: props.center,
  roadNet: props.roadNet,
  features: props.features,
  mapStyle: props.mapStyle,
  satellite: props.satellite,
}), () => onLoadInit(onWatch));

function onWatch() {
  const map = data.map as AMap.Map;

  // zoom, center
  if (map.getZoom() !== props.zoom || JSON.stringify(map.getCenter()) !== JSON.stringify(props.center)) {
    map.setZoomAndCenter(props.zoom, props.center as any);
  }

  // features
  if (JSON.stringify(map.getFeatures()) !== JSON.stringify(props.features)) {
    map.setFeatures(props.features);
  }

  // mapStyle
  const newMapStyle = `amap://styles/${props.mapStyle || 'normal'}`;
  if (map.getMapStyle() !== newMapStyle) {
    map.setMapStyle(newMapStyle);
  }

  // tileLayer
  if (window.AMap.TileLayer) {
    // roadNet
    if (props.roadNet && !data.layer['roadNet']) {
      data.layer['roadNet'] = new window.AMap.TileLayer.RoadNet();
      map.addLayer(data.layer['RoadNet']);
    } else if (!props.roadNet && data.layer['roadNet']) {
      map.removeLayer(data.layer['roadNet']);
      delete data.layer['roadNet'];
    }

    // satellite
    if (props.satellite && !data.layer['satellite']) {
      data.layer['satellite'] = new window.AMap.TileLayer.Satellite();
    } else if (!props.satellite && data.layer['satellite']) {
      map.removeLayer(data.layer['satellite']);
      delete data.layer['satellite'];
    }
  }
}
</script>

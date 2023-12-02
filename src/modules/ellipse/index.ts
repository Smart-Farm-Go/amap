import { defineComponent, inject } from 'vue';

interface Props {

}

export const AMapEllipse = defineComponent({
  name: 'AMapEllipse',
  setup(props: Props) {
    const AMap = inject('AMap', window.AMap);
    const map = inject('map', null);
    console.log('AMapEllipse', props, AMap, map);
  },
});

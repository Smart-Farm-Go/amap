<template>
  <a-map-container ref="AMapRef" :api-key="data.ApiKey">
    <a-map-ellipse/>
  </a-map-container>
</template>

<script lang="ts">export default { name: 'APP' };</script>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const AMapRef = ref<any>(null);
const data = reactive({
  ApiKey: '490d98c301be8ff8dc8844a162754819',
});
console.log(AMapRef);
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>

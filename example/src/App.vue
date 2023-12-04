<template>
  <amap-container :api-key="data.apiKey"/>
</template>

<script lang="ts"> export default { name: 'App' };</script>
<script lang="ts" setup>
import { reactive } from 'vue';

const data = reactive({
  apiKey: '490d98c301be8ff8dc8844a162754819',
});
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

<!--  -->
<template>
  <div></div>
</template>

<script setup lang='ts'>
import { reactive,ref, inject} from 'vue'  
const $api: any = inject('$api')
$api.product() 
</script>
<style lang='scss' scoped>
</style>
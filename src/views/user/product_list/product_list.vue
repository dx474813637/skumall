<!--  -->
<template>
  <div></div>
</template>

<script setup lang='ts'>
import { reactive,ref, inject} from 'vue'  
const $api: any = inject('$api')
$api.product()
$api.product_detail({params: {id: '2'}})
</script>
<style lang='scss' scoped>
</style>
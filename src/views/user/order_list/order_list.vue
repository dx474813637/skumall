<!--  -->
<template>
  <div></div>
</template>

<script setup lang='ts'>
import { reactive,ref,watch,onMounted,onBeforeMount, inject} from 'vue';
const $api = inject('$api')
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
    $api.order_list()
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style lang='scss' scoped>
</style>
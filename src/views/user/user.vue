<!--  -->
<template>
  <div>user/index</div>
  <router-view></router-view>
</template>

<script setup lang='ts'>
import { onMounted,onBeforeMount} from 'vue' 
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style lang='scss' scoped>
</style>
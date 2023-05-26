<template>
  <div>404</div>
</template>

<script setup>
import { reactive,ref,watch,onMounted,onBeforeMount} from 'vue'
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style lang='scss' scoped>
</style>
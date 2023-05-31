<!--  -->
<template>
  <div>index</div>
</template>

<script setup lang='ts'>
import { onMounted,onBeforeMount, inject} from 'vue'
// const $axios:any = inject('$axios')
// $axios.get('/tqapi/v3/weather/weatherInfo', {
//   loading: false,
//   params: {
//     key: '6717166d28c6f324d1fc1a3705f2c5e3',
//     city: '110101',
//   }
// })
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style lang='scss' scoped>
</style>
<template> 
    <div class="w">
        <iframe v-show="flowSrc !== ''" id="myframe" :src="flowSrc" frameborder="0"
			scrolling="auto" marginheight="0" marginwidth="0" width="100%" height="100%"></iframe>
    </div>
    
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed } from "vue";
import { useSettingsStore } from '@/stores/settings';
// const settings = useSettingsStore();
// const props = defineProps({
//     itemIds: {
//         type: String,
//         default: ''
//     },
//     toPlatform: {
//         type: String,
//         default: ''
//     },
//     cate: {
//         type: String,
//         default: ''
//     }
// })
// const $api = inject('$api');
// const params = computed(() => {
//     return {
//         id: props.itemIds ,
//         toPlatform: props.toPlatform,
//         cate: props.cate,
//     }
// })
// const flowSrc = ref('https://df.kdzs.com/#/login')
const flowSrc = ref('https://df.kdzs.com/?grayUser=false&isRegister=false')

const detail = ref({})
onMounted(async () => {
    // getData()
})
// async function getData() {
//     const res = await $api.superboss({ params: params.value })
//     if (res.code == 1) {
//         flowSrc.value = res.list 
//     }
// }

</script>
<style>

body::-webkit-scrollbar {
    display: none;
}
</style> 
<style lang="scss" scoped>  
.w {
    height: calc(100vh - 80px);
}
.news {
      background-color: #ffff;

      .main {
          min-height: 300px;
      }
  }
</style>

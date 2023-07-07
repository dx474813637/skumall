<template> 
    <el-dialog 
        v-model="props.show" 
        :before-close="handleClose"
        width="80%"
        @close="handleClose" 
        title="Ifram配置"
        >
            <iframe 
                v-show="props.src !== ''" 
                id="myframe" 
                @load="loaded" 
                ref="myframe" 
                :src="props.src" 
                frameborder="0" 
                scrolling="auto"
                marginheight="0" 
                marginwidth="0" 
                width="100%" 
                height="726px;"
                ></iframe>
        </el-dialog> 
</template>
<script lang="ts" setup>
import { reactive, ref, watch, onMounted, onBeforeMount, inject, toRefs, computed } from 'vue';
import {send} from '@/utils/superShop'
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    src: {
        type: String,
        default: ''
    },
})

watch(() => props.src, (n) => console.log(n))
const myframe = ref()
onBeforeMount(() => {
    window.addEventListener('message', (data) => {
        console.log('m', data) 
    }, false);
})
function handleClose() {
    
}
function loaded() {
    console.log('loaded')
    send()
    // 只有在 iframe 加载时传递数据给子组件，$refs 才是非空的
    // myframe.value.contentWindow.postMessage({
    //     type: 'myData',
    //     data: this.data,
    // }, '*');
}
</script>  
  
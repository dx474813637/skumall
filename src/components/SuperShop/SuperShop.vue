<template>
	<div>
		<iframe v-show="props.src !== ''" id="myframe" @load="loaded" ref="myframe" :src="props.src" frameborder="0"
			scrolling="auto" marginheight="0" marginwidth="0" width="100%" height="726px;"></iframe>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, onMounted, onBeforeMount, inject, toRefs, computed } from 'vue';
import { send } from '@/utils/superShop'
const props = defineProps({
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
function loaded() {
	console.log('loaded', myframe)
	const iframeDocument = myframe.value.contentDocument;
	if(!iframeDocument) return
	const mask = iframeDocument.getElementByClassName('.ant-modal-mask');
	mask.style.backgroundColor = '#eee';
	// send()
	// 只有在 iframe 加载时传递数据给子组件，$refs 才是非空的
	// myframe.value.contentWindow.postMessage({
	//     type: 'myData',
	//     data: this.data,
	// }, '*');
}
</script>  
  

<style lang="scss" scoped>
//
</style>
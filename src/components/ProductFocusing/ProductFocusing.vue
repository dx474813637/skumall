<template>
	<div class="wrapper">
		<div class="img-box">
			<template v-if="props.imgs.length == 0">
				<div class="image-slot u-flex u-flex-center">
					<el-empty description="暂无图片源" />
				</div>
			</template>
			<template v-else >
				<el-tooltip
					class="box-item"
					effect="dark"
					content="点击可全屏"
					placement="bottom"
				>
					<el-image 
						:src="curImage"
						:zoom-rate="1.2"
						:preview-src-list="props.imgs"
						:initial-index="props.index"
						lazy
						fit="contain" 
						> 
					</el-image> 
				</el-tooltip>
			</template> 
		</div>
	</div>
</template>

<script setup lang="ts"> 
import { ref, reactive, computed, watch } from 'vue';
const props = defineProps({ 
	imgs: {
		type: Array,
		default: () => []
	},
	index: {
		type: Number,
		default: 0
	}
}) 
const curImage = computed(() => {  
	return props.imgs[props.index]
})
// const followData = reactive<any>({
// 	x: '',
// 	y: '',

// })

</script>
<style lang="scss" scoped>
// 
.wrapper {
	width: 100%;
	.img-box {
		position: relative;
		width: 100%;
		padding-top: 100%;
		border: 1px solid var(--el-border-color);
		@extend %box-sizing;
		.el-image { 
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%
		}
		.image-slot {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%
		}
		.follow-box {
			position: absolute;
			left: 0;
			top: 0;
			width: 50%;
			height: 50%;
			background-color: rgba(255,255,255,.6);
		}
	}
}

</style>
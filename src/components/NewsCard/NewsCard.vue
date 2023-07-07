<template>
	<div class="product-card" @click="gotoDetail">
		<el-card class="box-card" shadow="hover">
			<template #header>
				<div class="card-header">
					<span>{{ origin.title }}</span> 
				</div>
			</template>
			<el-text class="text item" v-html="origin.intro"></el-text>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';

const props = defineProps({
	lazy: {
		type: Boolean,
		default: false
	},
	origin: {
		type: Object,
		default: () => ({})
	},
})

function gotoDetail() {
	if (!props.origin.id) return false
	router.push({
		name: 'news',
		params: {
			id: props.origin.id
		}
	})
} 
</script>
<style lang="scss" scoped> 
.product-card {
	cursor: pointer;
}
</style>

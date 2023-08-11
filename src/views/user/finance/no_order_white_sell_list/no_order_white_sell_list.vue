<!--  -->
<template>
	<div class="u-p-10 box">
		<div class="u-flex u-flex-between u-m-b-20">
			<div class="item"></div>
			<div class="item">
				<!-- <el-select v-model="role" placeholder="买/卖方" size="large" class="u-m-r-20">
					<el-option
						v-for="item in tabs_list2"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						/>
					<template #prefix><i-ep-search /></template>
				</el-select> -->
				<el-select v-model="state" placeholder="状态筛选" size="large">
					<el-option
						v-for="item in tabs_list"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						/>
					<template #prefix><i-ep-search /></template>
				</el-select>
				<el-button class="u-m-l-20" type="primary" size="large" @click="router.push({name: 'no_order_white_sell_add'})" >添加白名单</el-button>
			</div>
		</div>
		<table-white-seller
			:customParams="customParams"
			></table-white-seller>
	</div>
</template>
  
<script setup lang='ts'>
import { computed, ref, inject } from 'vue'
import router from '@/router/guard'
const $api: any = inject('$api')
const tabs_list = ref([
	{ label: '全部状态', value: '' },
	{ label: '等待审核', value: '0' },
	{ label: '审核通过', value: '1' },
	{ label: '审核未通过', value: '2' },  
]) 
const state = ref(''); 
const customParams = computed(() => {
	return {
		state: state.value, 
	}
})
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>
<!--  -->
<template>
	<div class="u-p-10 box">
		<div class="u-flex u-flex-between u-m-b-20">
			<div class="item"></div>
			<div class="item">
				<el-select v-model="value" placeholder="状态筛选" size="large">
					<el-option
						v-for="item in tabs_list"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						/>
					<template #prefix><i-ep-search /></template>
				</el-select>
			</div>
		</div>
		<table-order-bank
			:customParams="customParams"
			></table-order-bank>
	</div>
</template>
  
<script setup lang='ts'>
import { computed, ref, inject } from 'vue'
const $api: any = inject('$api')
const tabs_list = ref([
	{ label: '全部', value: '' },
	{ label: '融资申请中', value: '1' },
	{ label: '流程暂停', value: '2' },
	{ label: '财务已拒绝', value: '3' },
	{ label: '放款机构已同意', value: '4' },
	{ label: '放款机构已拒绝', value: '5' },
	{ label: '提款成功', value: '6' },
	{ label: '提款失败', value: '7' }, 
])
const value = ref('');
const customParams = computed(() => {
	return {
		rz_status: value.value
	}
})
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>
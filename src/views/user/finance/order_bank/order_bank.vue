<!--  -->
<template>
	<div class="u-p-10 box">
		<div class="u-flex u-flex-between u-m-b-20">
			<div class="item"></div>
			<div class="item">
				<el-select v-model="value" placeholder="授信状态筛选" size="large">
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
		<table-query
			:customParams="customParams"
			></table-query>
	</div>
</template>
  
<script setup lang='ts'>
import { computed, ref, inject } from 'vue'
const $api: any = inject('$api')
const tabs_list = ref([
	{ label: '全部', value: '' },
	{ label: '授信申请中', value: '1' },
	{ label: '授信已递交', value: '2' },
	{ label: '授信签约取消中', value: '3' },
	{ label: '授信失败', value: '4' },
	{ label: '授信通过，签约中', value: '5' },
	{ label: '授信通过，贷款企业已签约', value: '6' },
	{ label: '授信通过，签约通过', value: '7' },
	{ label: '授信通过，贷款账户已激活', value: '8' },
])
const value = ref('');
const customParams = computed(() => {
	return {
		status: value.value
	}
})
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>
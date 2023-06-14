<!--  -->
<template>
	<div class="u-p-20 box">
		<el-card class="box-card" shadow="hover">
			<template #header>
				<div class="card-header">
					<span>个人认证信息</span>
					<el-button class="button" text> </el-button>
				</div>
			</template>
			<el-row :gutter="10">
				<el-col :span="5">
					<div class="grid-content label">姓名</div>
				</el-col>
				<el-col :span="19">
					<div class="grid-content content">{{ account_info.name }}</div>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="5">
					<div class="grid-content label">{{ $filters.idType2Str(account_info.idType) }}</div>
				</el-col>
				<el-col :span="19">
					<div class="grid-content content">{{ account_info.idNumber }}</div>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="5">
					<div class="grid-content label">手机</div>
				</el-col>
				<el-col :span="19">
					<div class="grid-content content">{{ account_info.mobile }}</div>
				</el-col>
			</el-row>
		</el-card>
		
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useFinanceStore } from "@/stores/finance";
import router from "@/router/guard";
const finance = useFinanceStore();
const {
	account_info,
	account_loading,
	organizations_info,
	organizations_loading
} = toRefs(finance);
const $api: any = inject("$api");
const list = ref<any>({});
const props = defineProps({
	id: String,
});

onMounted(async () => {
	await finance.getAccountData();
});

async function getData() {
	const res = await $api.query_product_detail({
		params: { product_id: props.id },
	});
	if (res.code == 1) {
		list.value = res.list;
	}
}
</script>
<style lang="scss" scoped>
.box {
	@extend %box-sizing;
}
.el-row {
	// margin-bottom: 6px;
	padding: 6px;
	border-radius: 5px;
	transition: all 0.3s;
	&:hover {
		background-color: #f8f8f8;
		.grid-content.content {
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
	}
}
.grid-content {
	height: 35px;
	line-height: 35px;
	border-radius: 4px;
	font-size: 15px;
	&.label {
		color: #666;
		// text-align: right;
	}
	&.content {
		@extend %box-sizing;
		background-color: #f9fafc;
		padding: 0px 20px;
		transition: all 0.3s;
	}
}
</style>

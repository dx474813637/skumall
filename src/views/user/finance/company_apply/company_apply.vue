<!--  -->
<template>
	<div class="u-p-10 forms-w">
		<el-form
			:model="formData"
			:rules="rules"
			ref="forms"
			label-position="top"
		>
			<el-form-item label="企业名称" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="社会统一信用代码" prop="idNumber">
				<el-input v-model="formData.idNumber"></el-input>
			</el-form-item>
			<el-form-item label="法人姓名" prop="orgLegalName">
				<el-input v-model="formData.orgLegalName"></el-input>
			</el-form-item>
			<el-form-item label="法人身份证" prop="orgLegalIdNumber">
				<el-input v-model="formData.orgLegalIdNumber"></el-input>
			</el-form-item>
			<el-form-item label="对公账户开户行总行名称" prop="bank">
				<el-cascader
					style="width: 100%"
					placeholder="请选择（可输入关键字筛选）"
					:options="bank_list"
					v-model="formData.bank"
					:props="{
						label: 'name',
						value: 'name',
					}"
					filterable
				/>
			</el-form-item>
			<el-form-item label="对公账号开户行所在地" prop="regional">
				<el-cascader
					style="width: 100%"
					placeholder="请选择（可输入关键字筛选）"
					v-model="formData.regional"
					:options="regional_list"
					filterable
				/>
			</el-form-item>
			<el-form-item label="对公账户开户行支行名称全称" prop="subbranch">
				<el-select
					style="width: 100%"
					v-model="formData.subbranch" 
					filterable
					remote 
					clearable
					placeholder="输入银行关键字筛选列表，如：“平安 杭州” 地区名+空格+银行关键字的组合"
					remote-show-suffix
					:remote-method="(query:String) => debounce(remoteMethod, 800, false, query)"
					:loading="loading"
					loading-text="正在请求数据中"
					no-data-text="无匹配数据"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="银行卡号" prop="cardNo">
				<el-input v-model="formData.cardNo"></el-input>
			</el-form-item>
			<el-form-item label="通知短信手机号" prop="mobile">
				<el-input v-model="formData.mobile"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(forms)"
					>提交</el-button
				>
				<!-- <el-button @click="resetForm('userInfo')">重置</el-button> -->
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs, watch } from "vue";
import { useFinanceStore } from "@/stores/finance";
import { ElNotification, ElMessage } from "element-plus";
import router from "@/router/guard";
import debounce from "@/utils/debounce"
const finance = useFinanceStore();
const { idTypeList, bank_list, regional_list } = toRefs(finance);
const $api: any = inject("$api");
interface ListItem {
	value: string;
	label: string;
}
 
const options = ref<ListItem[]>([]); 
const loading = ref(false);

onMounted(() => {
	// user.getUserData(true);
	if (bank_list.value.length == 0) {
		finance.getBankListData();
	}
	if (regional_list.value.length == 0) {
		finance.getRegionalData();
	}
});
const formData = reactive({
	name: "",
	idType: "CRED_ORG_USCC",
	idNumber: "",
	orgLegalName: "",
	orgLegalIdNumber: "",
	bank: "",
	regional: "", 
	mobile: "",
	subbranch: "",
	cardNo: "",
});
const forms = ref();
const rules = {
	name: [
		{
			required: true,
			message: "企业名称不能为空",
			trigger: "blur",
		},
	],
	idNumber: [
		{
			required: true,
			message: "社会统一信用代码不能为空",
			trigger: "blur",
		},
	],
	orgLegalName: [
		{
			required: true,
			message: "法人姓名不能为空",
			trigger: "blur",
		},
	],
	orgLegalIdNumber: [
		{
			required: true,
			message: "法人身份证号不能为空",
			trigger: "blur",
		},
	],
	bank: [
		{
			required: true,
			message: "对公账号开户行总行名称不能为空",
			trigger: "blur",
		},
	],
	regional: [
		{
			required: true,
			message: "对公账号开户行所在地不能为空",
			trigger: "blur",
		},
	],
	mobile: [
		{
			required: true,
			message: "手机号不能为空",
			trigger: "blur",
		},
	],
	subbranch: [
		{
			required: true,
			message: "对公账号开户行支行名称全称不能为空",
			trigger: "blur",
		},
	],
	cardNo: [
		{
			required: true,
			message: "银行卡号不能为空",
			trigger: "blur",
		},
	],
};
function submitForm() { 
	forms.value.validate(async (valid) => {
		if (valid) {
			let res = await $api.transfer_random_amount({ 
				...formData, 
				bank: formData.bank[0],
				regional: formData.regional[formData.regional.length - 1],
			});
			if (res.code != 1) return;
			ElMessage.success(res.msg);
			await finance.getAccountData();
			await finance.getCpyData();
			router.replace({
				name: "company_verify",
			});
		} else {
			console.log("error submit!!");
			return false;
		}
	});
} 
const remoteMethod = async (query: string) => { 
	query = query.trim()
	if (query) {
		loading.value = true;
		const res = await $api.get_bank_name({params: {term: query}, loading: false})
		loading.value = false;
		if(res.code == 1) {
			options.value = res.list.map(ele => ({...ele, label: ele.bank_name, value: ele.bank_name}))
		}
	} else {
		options.value = [];
	}
};
</script>
<style lang="scss" scoped>
.forms-w {
	@extend %box-sizing;
	max-width: 700px;
}
</style>

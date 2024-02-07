<!--  -->
<template>
	<div class="u-p-20 box" v-if="list.bank_zxrz_product">
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">
					{{ list.bank_zxrz_product.bank_name }}
				</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					{{ list.bank_zxrz_product.name }}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.bank_zxrz_product.zxrz_remark">
			<el-col :span="5">
				<div class="grid-content label">银行备注</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					{{ list.bank_zxrz_product.zxrz_remark }}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">授信期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					{{ list.bank_zxrz_product.credit_term }}
					{{ $filters.en2cn(list.bank_zxrz_product.credit_mode) }}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">单户最高额度</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					{{ list.bank_zxrz_product.max_amount }} 元
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">贷款期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					{{ list.bank_zxrz_product.loan_term }}
					{{ $filters.en2cn(list.bank_zxrz_product.credit_mode) }}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">费率(年化)</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					{{ list.bank_zxrz_product.annualized }}
				</div>
			</el-col>
		</el-row>
	</div>
	<div class="u-p-l-20">
		<el-button type="primary" @click="getData">刷新数据</el-button>
	</div>
	<div class="u-p-20 forms-w">
		<el-form
			:model="formData"
			:rules="rules"
			ref="forms"
			label-position="top"
		>
			<el-form-item label="公司名称" prop="platform_company" >
				<el-input
					v-model="formData.platform_company"
					readonly
				></el-input>
			</el-form-item>
			<el-form-item label="社会统一信用代码" prop="platform_reg" >
				<el-input v-model="formData.platform_reg" readonly></el-input>
			</el-form-item>
			<el-form-item label="法人姓名" prop="platform_person" >
				<el-input
					v-model="formData.platform_person"
					readonly
				></el-input>
			</el-form-item>
			<el-form-item label="法人身份证" prop="platform_is_card" >
				<el-input
					v-model="formData.platform_is_card"
					readonly
				></el-input>
			</el-form-item>
			<div class="u-p-t-10 u-p-b-10">
				<el-divider content-position="left"
					>以下内容需手动输入</el-divider
				>
			</div>
			<el-form-item label="法人手机" prop="platform_mobile">
				<el-input v-model="formData.platform_mobile"></el-input>
			</el-form-item>
			<el-form-item label="申请金额（元）" prop="amount">
				<el-input v-model="formData.amount"></el-input>
			</el-form-item>
			<el-form-item label="与核心企业合作月数" prop="termMonth">
				<el-input v-model="formData.termMonth"></el-input>
			</el-form-item>
			<el-form-item label="上年度销售收入（元）" prop="transAmt">
				<el-input v-model="formData.transAmt"></el-input>
			</el-form-item>
			<el-form-item label="经营场所所在省份" prop="businessProvince">
				<el-select v-model="formData.businessProvince" placeholder="请选择省份" style="width: 100%;" >
					<el-option
						v-for="item in province_data"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						/>
				</el-select>
			</el-form-item>
			<el-form-item label="联系地址(公司具体联系地址)" prop="address">
				<el-input v-model="formData.address"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="formData.remark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(forms)"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router/guard";
import utilsTest from '@/utils/test'
const $api: any = inject("$api");
const list = ref<any>({});
const props = defineProps({
	id: String,
});

const formData = reactive({
	platform_company: "",
	platform_reg: "",
	platform_person: "",
	platform_is_card: "",
	platform_mobile: "",
	imtoken: "",
	amount: "",
	termMonth: "",
	transAmt: "",
	businessProvince: "",
	address: "",
	remark: "",
});
const forms = ref();
const rules = { 
	platform_company: {
		required: true,
		message: '公司名称不能为空',
		trigger: ['blur', 'change']
	}, 
	platform_reg: {
		required: true,
		message: '社会统一信用代码不能为空',
		trigger: ['blur', 'change']
	},
	platform_person: {
		required: true,
		message: '法人姓名不能为空',
		trigger: ['blur', 'change']
	},  
	platform_mobile: {
		required: true,
		validator: (rule, value, callback) => {
			return utilsTest.mobile(value);
		},
		message: "输入正确的手机号",
		trigger: ["blur", "change"],
	},
	platform_is_card: {
		required: true,
		validator: (rule, value, callback) => {
			return utilsTest.idCard(value);
		},
		message: "输入正确的身份证号",
		trigger: ["blur", "change"],
	},
	amount: {
		required: true,
		validator: (rule, value, callback) => {
			return utilsTest.amount(value);
		},
		message: "输入正确的金额",
		trigger: ["blur", "change"],
	},
	businessProvince: {
		required: true,
		message: "省份不能为空",
		trigger: ["blur", "change"],
	},
	termMonth: {
		required: true, 
		message: "与核心企业合作月数不能为空",
		trigger: ["blur", "change"],
	},
	transAmt: {
		required: true,
		validator: (rule, value, callback) => {
			return utilsTest.amount(value);
		},
		message: "输入正确的金额",
		trigger: ["blur", "change"],
	},
};
const province_data = ref([])
onMounted(async () => {
	if (!props.id) {
		ElMessage.error("参数有误");
		return;
	}
	getProvinceData()
	await getData();
});

async function getProvinceData() {
	const res = await $api.pacc_businessProvince();
	if (res.code == 1) {
		province_data.value = res.list.map(ele => ({label: ele, value: ele})); 
	}
}
async function getData() {
	const res = await $api.pacc_detail({ params: {  product_id: props.id } });
	if (res.code == 1) {
		list.value = res.list;
		formData.platform_company = res.list.platform_company;
		formData.platform_reg = res.list.platform_reg;
		formData.platform_person = res.list.platform_person;
		formData.platform_is_card = res.list.platform_is_card;
		formData.imtoken = res.list.imtoken;
	}
}
function submitForm() {
	forms.value.validate(async (valid) => {
		if (valid) {
			let res = await $api.pacc({
				...formData, 
				product_id: props.id
			});
			if (res.code != 1) return;
			ElMessage.success(res.msg); 
			router.replace({
				name: "pacc_query_list",
			});
		} else {
			console.log("error submit!!");
			return false;
		}
	});
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

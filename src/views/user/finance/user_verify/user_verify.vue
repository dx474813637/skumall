<!--  -->
<template> 
	<div class="u-p-10 forms-w" v-show="!verifyStatus" >
		<el-form :model="formData" :rules="rules" ref="forms" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="手机号码" prop="mobile">
				<el-input v-model="formData.mobile"></el-input>
			</el-form-item> 
			<el-form-item label="验证码" prop="code">
				<div class="phone-code">
					<div class="item u-flex-1">
						<el-input clearable v-model="formData.code" />
					</div>
					<div class="item">
						<el-button type="primary" plain @click="getCodeBtn" :disabled="getCodeDisabled">
							<div class="getcode-btn-text" v-show="getCodeDisabled">
								<el-countdown 
									format="ss" 
									:value="countValue" 
									value-style="color: #007aff; font-size: 16px" 
									@finish="countDownFinish"
								/>
								<span class="u-p-l-2">S重新获取</span>
							</div>
							<div class="getcode-btn-text" v-show="!getCodeDisabled">
								<span>获取验证码</span>
							</div>

						</el-button>
					</div>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(forms)">提交</el-button>
				<!-- <el-button @click="resetForm('userInfo')">重置</el-button> -->
			</el-form-item>
		</el-form>
	</div> 
	<div class="u-flex u-flex-center u-p-t-30" v-show="verifyStatus">
		<el-result
			icon="success"
			title="个人认证成功"
			sub-title=""
		>
			<template #extra>
				<div class="u-flex u-flex-center">
					<el-button type="primary" plain>返回认证中心</el-button>
					<el-button type="primary">认证企业信息</el-button>
				</div>
				
			</template>
      	</el-result>
	</div>
	
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs, watch, computed } from "vue";
import { useFinanceStore } from "@/stores/finance";
import { ElNotification, ElMessage } from "element-plus"; 
import router from '@/router/guard'
const finance = useFinanceStore();
const $api: any = inject("$api");
onMounted(() => { 
}); 
const formData = reactive({
	name: "",
	mobile: "",
	code: "", 
});
const verifyStatus = ref(false)
const countValue = ref(0)
const getCodeDisabled = computed(() => { 
	return countValue.value > Date.now()
})
const forms = ref();
const rules = {
	name: [
		{
			required: true,
			message: "请输入您的姓名",
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
	code: [
		{
			required: true,
			message: "验证码不能为空",
			trigger: "blur",
		},
	],
};
function submitForm(formName) {
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.verify_account({ params: {...formData} });
			if (res.code != 1) return;
			ElMessage.success(res.msg); 
			verifyStatus.value = true 
			// router.replace({
			// 	name: 'finance_account'
			// })
		} else {
			console.log("error submit!!");
			return false;
		}
	});
}
async function getCodeBtn() {
	let res = await forms.value.validateField('name') 
	res = await forms.value.validateField('mobile')
	// console.log(res)
	if(res !== true) return 
	await getCode()
	setCountValue()
}
function setCountValue() {
	countValue.value = Date.now() + 1000 * 60 
} 
function countDownFinish() {
	countValue.value = 0
}
async function getCode() {
	const res = await $api.get_mobile_code({
		params: {
			name: formData.name,
			mobile: formData.mobile
		}
	})
	if(res.code == 1) {
		ElMessage.success(res.msg)
	}
}
</script>
<style lang="scss" scoped>
.forms-w {
	@extend %box-sizing;
	max-width: 700px; 
}
.phone-code {
	width: 100%;
	@include flex(x, between);
	.getcode-btn-text {
		
		@include flex(x);
		::v-deep .el-statistic {
			--el-statistic-content-font-size: 16px;
		}
	}
	.item {
		.el-button {
			width: 120px;
			margin-left: 12px;
		}
	}
}
</style>

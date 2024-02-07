<!--  -->
<template> 
	<div class="u-p-10 forms-w"  v-show="!verifyStatus">
		<el-form :model="formData" :rules="rules" ref="forms" label-width="100px">
			<el-form-item label="校验金额" prop="amount">
				<el-input v-model="formData.amount"></el-input>
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
			title="企业认证成功"
			sub-title=""
		>
			<template #extra>
				<div class="u-flex u-flex-center">
					<el-button type="primary" plain>返回认证中心</el-button> 
				</div>
				
			</template>
      	</el-result>
	</div>
	
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs, watch } from "vue";
import { useFinanceStore } from "@/stores/finance";
import { ElNotification, ElMessage } from "element-plus"; 
import router from '@/router/guard'
const finance = useFinanceStore();
const { idTypeList } = toRefs(finance);
const $api: any = inject("$api");
onMounted(() => {
	// user.getUserData(true);
}); 
const verifyStatus = ref(false)
const formData = reactive({
	amount: "", 
});
const forms = ref();
const rules = {
	amount: [
		{
			required: true,
			message: "请输入金额",
			trigger: "blur",
		},
	], 
};
function submitForm(formName) {
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.verify_random_amount({ params: {...formData} });
			if (res.code != 1) return;
			ElMessage.success(res.msg);  
			verifyStatus.value = true  
			finance.getCpyData()
			router.replace({
				name: 'user_verify'
			})
		} else {
			console.log("error submit!!");
			return false;
		}
	});
}
</script>
<style lang="scss" scoped>
.forms-w {
	@extend %box-sizing;
	max-width: 700px; 
}
</style>

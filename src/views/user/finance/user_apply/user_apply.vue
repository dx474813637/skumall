<!--  -->
<template> 
	<div class="u-p-10 forms-w" >
		<el-form :model="formData" :rules="rules" ref="forms" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="证件类型" prop="idType">
				<el-select v-model="formData.idType" placeholder="Select" style="width: 100%;" >
					<el-option
						v-for="item in idTypeList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						/>
				</el-select>
			</el-form-item>
			<el-form-item label="证件号" prop="idNumber">
				<el-input v-model="formData.idNumber"></el-input>
			</el-form-item>
			<el-form-item label="手机号码" prop="mobile">
				<el-input v-model="formData.mobile"></el-input>
			</el-form-item>
			<el-form-item label="电子邮箱" prop="email">
				<el-input v-model="formData.email"></el-input>
			</el-form-item> 
			<el-form-item>
				<el-button type="primary" @click="submitForm(forms)">提交</el-button>
				<!-- <el-button @click="resetForm('userInfo')">重置</el-button> -->
			</el-form-item>
		</el-form>
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
const formData = reactive({
	name: "",
	idType: "",
	idNumber: "",
	mobile: "",
	email: "",
});
const forms = ref();
const rules = {
	name: [
		{
			required: true,
			message: "请输入您的姓名",
			trigger: "blur",
		},
	],
	idType: [
		{
			required: true,
			message: "请选择证件类型",
			trigger: "blur",
		},
	],
	idNumber: [
		{
			required: true,
			message: "证件号不能为空",
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
};
function submitForm(formName) {
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.create_account({ ...formData });
			if (res.code != 1) return;
			ElMessage.success(res.msg); 
			finance.getAccountData()
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

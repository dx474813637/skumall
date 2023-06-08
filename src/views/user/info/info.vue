<!--  -->
<template>
	<div class="u-p-10" style="box-sizing: border-box;">
		<el-form
			:model="userInfo"
			:rules="rules"
			ref="userForm"
			label-width="100px"
		>
			<el-form-item label="您的姓名" prop="name">
				<el-input v-model="userInfo.name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="phone">
				<el-input v-model="userInfo.phone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="userInfo.email"></el-input>
			</el-form-item>
			<el-form-item label="公司" prop="company">
				<el-input v-model="userInfo.company"></el-input>
			</el-form-item>
			<el-form-item label="公司地址" prop="address">
				<el-input v-model="userInfo.address"></el-input>
			</el-form-item>
			<el-form-item label="职位" prop="position">
				<el-input v-model="userInfo.position"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="tel">
				<el-input v-model="userInfo.tel"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(userForm)"
					>提交</el-button
				>
				<!-- <el-button @click="resetForm('userInfo')">重置</el-button> -->
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs, watch } from "vue";
import { userStore } from "@/stores/user";
import { ElNotification, ElMessage } from "element-plus";
const user = userStore();
const { user_info } = toRefs(user);
const $api: any = inject("$api");
onMounted(() => {
	user.getUserData(true);
});
watch(
	() => user.user_info,
	(val) => {
		console.log(val);
		userInfo.name = val.name;
		userInfo.phone = val.phone;
		userInfo.email = val.email;
		userInfo.company = val.company;
		userInfo.tel = val.tel;
		userInfo.position = val.position;
		userInfo.address = val.address;
	},
	{ deep: true }
);
const userInfo = reactive({
	name: "",
	phone: "",
	email: "",
	company: "",
	tel: "",
	position: "",
	address: "",
});
const userForm = ref();
const rules = {
	name: [
		{
			required: true,
			message: "请输入您的姓名",
			trigger: "blur",
		},
	],
	phone: [
		{
			required: true,
			message: "请输入您的手机",
			trigger: "blur",
		},
	],
};
function submitForm(formName) {
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.edit_card({ ...userInfo });
			if (res.code != 1) return;
			ElMessage.success(res.msg);
			user.getUserData();
		} else {
			console.log("error submit!!");
			return false;
		}
	});
}
</script>
<style lang="scss" scoped>
//
</style>

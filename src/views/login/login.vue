<template>
	<header-help></header-help>
	<div class="login-main">
		<!-- <img src="https://doudian.y.netsun.com/Public/login-bg.jpg" alt="" /> -->
		<div class="bg-swiper">
			<el-carousel height="100%" :interval="5000">
				<el-carousel-item >
					<el-image class="bg-swiper-img" src="/bg-login2.jpg"></el-image>
				</el-carousel-item>
				<el-carousel-item >
					<el-image class="bg-swiper-img" src="/bg-login1.jpg"></el-image>
				</el-carousel-item>
			</el-carousel>
		</div>
		
		<div class="home-w">
			<div class="login-box">
				<div class="login-tabs u-p-10">
					<el-tabs v-model="activeName" class="demo-tabs" @tabClick="handleClick">
						<el-tab-pane :label="`${roleName}账户${pageName}`" name="account_login" v-if="router.currentRoute.value.name != 'reg'"></el-tab-pane>
						<el-tab-pane :label="`${roleName}免密${pageName}`" name="phone_login"></el-tab-pane>
					</el-tabs>
				</div>

				<div class="login-form-w">
					<div class="login-form">
						<el-form label-position="top" :model="formData" :rules="rules" ref="form" style="max-width: 460px"
							:validate-on-rule-change="false">
							<div v-show="activeName == 'account_login' && router.currentRoute.value.name != 'reg'">
								<el-form-item label="账号" prop="login">
									<el-input clearable v-model="formData.login" />
								</el-form-item>
								<el-form-item label="密码" prop="passwd">
									<el-input clearable v-model="formData.passwd" showPassword type="password" />
								</el-form-item>

							</div>
							<div v-show="activeName == 'phone_login'">
								<el-form-item label="手机" prop="phone">
									<el-input clearable v-model="formData.phone" />
								</el-form-item>
								<el-form-item label="验证码" prop="code">
									<div class="phone-code">
										<div class="item">
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
							</div>
							<!-- <el-form-item prop="agree">
								<el-checkbox-group v-model="formData.agree">
									<el-checkbox size="large">
										<div>dsadasdas</div>
									</el-checkbox>
								</el-checkbox-group>

							</el-form-item> -->
						</el-form>
					</div>

					<div class="login-btn">
						<el-button type="primary" @click="submitForm(form)">{{ pageName }}</el-button>
						<!-- <div class="u-p-t-10">
							<a class="reg-link" href="https://element-plus.org" target="_blank">立即注册</a> 
						</div> -->
						<div class="u-p-t-5 u-flex u-flex-between">
							<el-link :underline="false" :href="`#/login?role=${role == '13' ? '14' : '13'}`" target="_blank" >
								<el-text size="small" type="danger">我是{{ roleName2 }}</el-text>
							</el-link>
							<el-link :underline="false" :href="`#/${pageName == '注册' ? 'login' : 'reg'}?role=${role}`" >
								<el-text size="small" type="danger">去{{ pageName == '注册' ? '登录' : '注册' }}</el-text>
							</el-link>
							
						</div>
					</div>
					
				</div>

				<div class="login-desc">
					登录即代表同意
					<a href="https://element-plus.org" target="_blank">用户协议</a>
					和
					<a href="https://element-plus.org" target="_blank">隐私条款</a>
				</div>
			</div>

		</div>
	</div>
	<footer-help></footer-help>
	<Vcode :show="isShow" @success="success" @close="close" @fail='fail'></Vcode>
</template>

<script setup lang="ts">
import Vcode from "vue3-puzzle-vcode";
import type { TabsPaneContext, FormRules, FormInstance } from "element-plus";
import { ref, reactive, computed, inject, toRefs, onMounted, watch } from "vue"; 
import {useSettingsStore} from '@/stores/settings';
import {userStore} from '@/stores/user';
import { ElLoading, ElMessage  } from "element-plus";
const props = defineProps({
	role: {
		type: String,
		default: '13'
	}
})
import router from "@/router";
const useSettings = useSettingsStore()
const user = userStore()
const { login:loginStore, role, roleName, roleName2 } = toRefs(user);
// console.log(router)
// import { createLoadingComponent } from "element-plus/es/components/loading/src/loading";
const $api: any = inject('$api')
const activeName = ref("account_login");
const formData = reactive({
	login: "",
	passwd: "",
	phone: "",
	code: "",
});
const params = computed(() => {
	let obj:any = {
		login: formData.login,
	}
	if(activeName.value == 'account_login') {
		obj.passwd = formData.passwd 
	}
	else {
		obj.msgcode = formData.code ;
		obj.login = formData.phone
	}

	if(router.currentRoute.value.name == 'reg') {
		obj.role = role.value
	}
	return obj
})
const form = ref<FormInstance>()
const countValue = ref(0)
const getCodeDisabled = computed(() => { 
	return countValue.value > Date.now()
})
onMounted(async () => {
	if(props.role) role.value = props.role  
	console.log(router_name.value)
	if(router_name.value == 'reg') {
		activeName.value = 'phone_login'
	}
})
const router_name = computed(() => {
	return router.currentRoute.value.name;   
}) 
const pageName = computed(() => {  
	if(router_name.value == 'reg') return '注册'
	return '登录'
})
const rules = computed<FormRules>(() => {
	let obj = {
		// agree: [
		// 	{
		// 		type: 'array',
		// 		required: true,
		// 		message: '请先阅读并同意用户协议',
		// 		trigger: 'change',
		// 	},
		// ],
	}
	if (activeName.value == 'account_login') {
		return {
			...obj,
			login: [
				{
					required: true,
					message: '账号不得为空',
					trigger: ['change', 'blur'],
				}
			],
			passwd: [
				{
					required: true,
					message: '密码不得为空',
					trigger: ['change', 'blur'],
				}
			],
		}
	}
	return {
		...obj,
		phone: [
			{
				required: true,
				message: '手机不得为空',
				trigger: ['change', 'blur'],
			}
		],
		code: [
			{
				required: true,
				message: '验证码不得为空',
				trigger: ['change', 'blur'],
			}
		],
	}
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
	// console.log(tab, event);
	form.value.clearValidate()
};
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid) => {
		if (valid) {
			console.log('submit!')
			if (activeName.value == 'account_login') {
				PuzzleIsOpen()
			}
			else {
				login()
			}
		} else {
			console.log('error submit!')
			return false
		}
	})
}
function PuzzleIsOpen() {
	isShow.value = true;

}
function setCountValue() {
	countValue.value = Date.now() + 1000 * 60 
}
async function getCodeBtn() {
	const res = await form.value.validateField('phone')
	console.log(res)
	if(res !== true) return
	PuzzleIsOpen()
}
const isShow = ref(false)
// 用户通过了验证
async function success(msg) {
	console.log('验证通过' + msg);
	isShow.value = false; // 通过验证后，需要手动隐藏模态框
	if (activeName.value == 'phone_login') {
		await getCode()
		setCountValue()
		return
	}
	login()
}
async function getCode() {
	const res = await $api.msgcode({
		params: {
			login: formData.phone
		}
	})
	if(res.code == 1) {
		ElMessage.success(res.msg)
	}
}
// 用户点击遮罩层，应该关闭模态框
function close() {
	isShow.value = false;
}
// 用户验证失败
function fail() {
	console.log('验证失败');
} 
function countDownFinish() {
	countValue.value = 0
}
async function login() {
	const res = await $api.syblogin({
		params: {
			...params.value
		}
	})
	if(res.code == 1) {
		// loginname.value = res.login
		ElMessage.success('登录成功')
		useSettings.loginSuccessRoute()
		user.getUserData(true)
	}
}
</script>
<style lang="scss" scoped>
::v-deep {
	.el-tabs__nav {
		justify-content: center;
		width: 100%;

		.el-tabs__item {
			font-size: 16px;

			&.is-active {
				font-weight: bold;
			}
		}
	}

	.el-tabs__nav-wrap::after {
		display: none;
	}
}

.login-main {
	position: relative;
	height: 600px;

	.home-w {
		height: 100%;
	}

	>img,
	.bg-swiper {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		.el-carousel {
			width: 100%;
			height: 100%;
		}
		.bg-swiper-img {
			width: 100%;
			height: 100%
		}
	}
}

.phone-code {
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

.login-box {
	height: 400px;
	width: 360px;
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	overflow: hidden;

	.login-desc {
		font-size: 12px;
		color: #999;
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 10px 10%;
		background-color: #f7f7ff;
		@extend %box-sizing
	}
}

.login-form-w {
	@include flex(y, start, center);


	.login-form {
		width: 80%;
		padding-bottom: 20px;
	}

	.login-btn {
		width: 80%;
		.reg-link {
			color: #ff0000;
			font-size: 14px; 
		}
		::v-deep .el-button {
			width: 100%;
		}
	}
}
</style>

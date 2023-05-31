<template>
	<header-help></header-help>
	<div class="login-main">
		<img src="http://zc.toocle.com/Public/pc/img/login-bg.jpg" alt="" />
		<div class="home-w">
			<div class="login-box">
				<div class="login-tabs u-p-10">
					<el-tabs v-model="activeName" class="demo-tabs" @tabClick="handleClick">
						<el-tab-pane label="账户登录" name="account_login"></el-tab-pane>
						<el-tab-pane label="短信登录" name="phone_login"></el-tab-pane>
					</el-tabs>
				</div>

				<div class="login-form-w">
					<div class="login-form">
						<el-form label-position="top" :model="formData" :rules="rules" ref="form" style="max-width: 460px"
							:validate-on-rule-change="false">
							<div v-show="activeName == 'account_login'">
								<el-form-item label="账号" prop="account">
									<el-input clearable v-model="formData.account" />
								</el-form-item>
								<el-form-item label="密码" prop="password">
									<el-input clearable v-model="formData.password" showPassword type="password" />
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
						<el-button type="primary" @click="submitForm(form)">登 录</el-button>
						<div class="u-p-t-10">
							<a class="reg-link" href="https://element-plus.org" target="_blank">立即注册</a> 
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
	<footer-base></footer-base>
	<Vcode :show="isShow" @success="success" @close="close" @fail='fail'></Vcode>
</template>

<script setup lang="ts">
import Vcode from "vue3-puzzle-vcode";
import type { TabsPaneContext, FormRules, FormInstance } from "element-plus";
import { ref, reactive, computed } from "vue";
const activeName = ref("account_login");
const formData = reactive({
	account: "",
	password: "",
	phone: "",
	code: "",
});
const form = ref<FormInstance>()
const countValue = ref(0)
const getCodeDisabled = computed(() => { 
	return countValue.value > Date.now()
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
			account: [
				{
					required: true,
					message: '账号不得为空',
					trigger: ['change', 'blur'],
				}
			],
			password: [
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
			if (activeName.value = 'account_login') {
				PuzzleIsOpen()
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
function success(msg) {
	if (activeName.value == 'phone_login') {
		setCountValue()
	}
	isShow.value = false; // 通过验证后，需要手动隐藏模态框
	console.log('验证通过' + msg);

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

	>img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
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

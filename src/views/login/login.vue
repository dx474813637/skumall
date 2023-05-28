<template>
	<header-help></header-help>
	<div class="login-main">
		<img src="http://zc.toocle.com/Public/pc/img/login-bg.jpg" alt="" />
		<div class="home-w">
			<div class="login-box">
				<div class="login-tabs u-p-10">
					<el-tabs
						v-model="activeName"
						class="demo-tabs"
						@tab-click="handleClick"
					>
						<el-tab-pane label="账户登录" name="account_login"> 
							<div class="login-form-w">
								<div class="login-form">
									<el-form
										label-position="top"
										:model="formData"
										style="max-width: 460px"
									>
										<el-form-item label="账号">
											<el-input
												v-model="formData.account"
											/>
										</el-form-item>
										<el-form-item label="密码">
											<el-input
												v-model="formData.password"
												showPassword
												type="password"
											/>
										</el-form-item>
									</el-form>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="短信登录" name="phone_login"
							>短信登录</el-tab-pane
						>
					</el-tabs>
				</div>
			</div>
		</div>
	</div>
	<footer-base></footer-base>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
import { ref, reactive } from "vue";
const activeName = ref("account_login");
const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
const formData = reactive({
	account: "",
	password: "",
});
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
	> img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
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
}
.login-form-w {
	@include flex(y, start, center);
  padding-top: 20px;
  .login-form {
    width: 80%;
  }
}
</style>

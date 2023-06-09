<template>
	<header class="header" id="header"> 
		<div class="header-main">
			<div class="home-w">
				<div class="main-logo">
					<a href="/" title="衢链通"
						><img
							src="logo.png"
							class="logo"
							alt="衢链通"
					/></a>
				</div>
				<div class="main-nav">
					<div class="nav-item">
						<el-link  type="primary" href="https://element-plus.org" target="_blank">首页</el-link> 
					</div>
					<div class="nav-item">
						<el-link  type="primary" href="https://element-plus.org" target="_blank">买家指南</el-link> 
					</div>
					<div class="nav-item">
						<el-link  type="primary" href="https://element-plus.org" target="_blank">交收规则</el-link> 
					</div>
					<div class="nav-item">
						<el-link  type="primary" href="https://element-plus.org" target="_blank">平台规则</el-link> 
					</div> 
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
</script>
<style lang="scss" scoped>
::v-deep .input-with-select {
	background-color: transparent;
	.el-input__wrapper {
		box-shadow: none;
	}
}
.input-with-select {
	height: 40px;
}

.search-in-select {
	width: 115px;
}

header {
	color: $uni-text-color-grey;
	background: #fff;
	border-bottom: 1px solid #f8f8f8;
	&.header {
		.header-top {
			background-color: #fafafa;
			font-size: 12px;
			border-bottom: 1px solid #e7e7e7;

			.home-w {
				@include flex(x, between);
				height: 40px;

				.top-left {
					@include flex(x);

					.login {
						cursor: pointer;
						color: $uni-color-primary;
					}

					.reg {
						border-left: 1px solid #ddd;
						cursor: pointer;
					}
				}

				.top-right {
					& > a,
					> span {
						padding: 0 5px;
					}
				}
			}
		}

		.header-main {
			.home-w {
				@include flex(x, between);
				height: 80px;
			}

			.main-logo {
				flex: 0 0 300px;

				.logo {
					height: 55px;
				}
			}
			.main-nav {
				@include flex(x);
				.nav-item {
					padding: 0 8px;
					margin-left: 15px;
					font-size: 14px;
					cursor: pointer;
				}
			}
 
		} 
	}
}
</style>

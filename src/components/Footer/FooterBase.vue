<template>
	<footer class="footer">
		<div class="home-w">
			<div class="footer-main">
				<div class="item-left u-p-t-20">
					<a href="/" title="衢链通"
						><img
							src="http://zc.toocle.com//Public/attached/2022/08/22/6302e8d2c9965.jpg"
							width="80%"
							alt="衢链通"
					/></a>
					<div
						class="item-left-title u-p-l-10 u-m-t-10"
					>
						15957197946
					</div>
					<div class="item-left-sub u-p-l-10">工作日9:00-18:00</div>
				</div>
				<div class="item-center u-p-t-20">
					<div class="footer-list-wrap">
						<div class="item u-flex-1">
							<ul>
								<li>
									<p class="list-item-title">买家指南</p>
								</li>
								<li>
									<a
										href="/help.html"
										target="_blank"
										class="u-font-14 list-item-a"
										>用户注册</a
									>
								</li>
								<li>
									<a
										href="/help.html?id=2"
										target="_blank"
										class="u-font-14 list-item-a"
										>购买流程</a
									>
								</li>
								<li>
									<a
										href="/help.html?id=3"
										target="_blank"
										class="u-font-14 list-item-a"
										>支付方式</a
									>
								</li>
							</ul>
						</div>
						<div class="item u-flex-1">
							<ul>
								<li>
									<p class="list-item-title">交收规则</p>
								</li>
								<li>
									<a
										href="/help.html?id=4"
										target="_blank"
										class="u-font-14 list-item-a"
										>自提方式</a
									>
								</li>
							</ul>
						</div>
						<div class="item u-flex-1">
							<ul>
								<li>
									<p class="list-item-title">平台规则</p>
								</li>
								<li>
									<a
										href="/help.html?id=5"
										target="_blank"
										class="u-font-14 list-item-a"
										>用户注册协议</a
									>
								</li>
								<li>
									<a
										href="/help.html?id=6"
										target="_blank"
										class="u-font-14 list-item-a"
										>隐私政策</a
									>
								</li>
							</ul>
						</div>
						<div class="item u-flex-1">
							<ul>
								<li>
									<p class="list-item-title">售后服务</p>
								</li>
								<li>
									<a
										href="/help.html?id=7"
										target="_blank"
										class="u-font-14 list-item-a"
										>争议处理</a
									>
								</li>
								<li>
									<a
										href=""
										target="_blank"
										class="u-font-14 list-item-a"
										>退换货处理</a
									>
								</li>
								<li>
									<a
										href=""
										target="_blank"
										class="u-font-14 list-item-a"
										>发票事项</a
									>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="item-right u-p-20">
					<div class="img-box ml-3">
						<div class="item">
							<div class="img-name u-m-b-10">市场H5</div>
							<img
								src="http://zc.toocle.com//Public/attached/2022/08/22/6302ea63b7353.png"
								width="100"
								height="100"
								alt=""
							/>
						</div>
					</div>
					<div class="img-box ml-3">
						<div class="item">
							<div class="img-name u-m-b-10">市场小程序</div>
							<img
								src="http://zc.toocle.com//Public/attached/2022/08/22/6302ea5e97ba4.png"
								width="100"
								height="100"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="footer-a"></div>
			<div class="footer-c">
				<div class="item">
					<p>
						© 衢链通 版权所有 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
							href="https://beian.miit.gov.cn/"
							target="_blank"
							>浙ICP证：浙B2-20090134</a
						>
					</p>
				</div>
				<div class="item">　　</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.footer-list-wrap {
	@include flex(x, between, start);
	.list-item-title {
		font-weight: bold;
	}
	a.list-item-a {
		color: $uni-color-subtitle;
	}
}
.footer {
	min-height: 120px;
	background-color: #fff;
	border-top: 1px solid #f8f8f8;
}

@media (max-width: 768px) {
	.footer {
		display: none;
	}
}

.footer .footer-main {
	padding: 40px 20px;
	@include flex(x, start, start);
}

.footer .footer-main .item-left {
	-webkit-box-flex: 0;
	-ms-flex: 0 0 260px;
	flex: 0 0 260px;
	width: 260px;
  .item-left-title {
    font-weight: bold;
    color: $uni-color-primary;
    font-size: 22px;
  }
  .item-left-sub { 
    color: $uni-text-color-grey;
    font-size: 14px;
  }
}

.footer .footer-main .item-center {
	-webkit-box-flex: 1;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
}

.footer .footer-main .item-center p {
	font-size: 15px;
}

.footer .footer-main .item-right {
	-webkit-box-flex: 0;
	-ms-flex: 0 1 auto;
	flex: 0 1 auto;
	border-left: 1px solid #eee;
	@include flex(x, start, start);
}

.footer .footer-a {
	background-color: #fff;
	border-top: 1px solid #e7e7e7;
}

.footer .footer-a .home-w {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.footer .footer-a .a-list {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 40px;
}

.footer .footer-a .a-list .item {
	padding: 10px;
	color: #000;
}

.footer .footer-c {
	/* display: flex; */
	/* justify-content: center; */
	/* align-items: center; */
	padding: 10px 0 20px;
	/* border-top: 1px solid #e7e7e7; */
	font-size: 12px;
}

.footer .footer-c .item {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 25px;
}

.footer .footer-c p {
	margin-right: 8px;
}

.footer .footer-c p,
.footer .footer-c a {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.m-footer {
	display: none;
}

@media (max-width: 768px) {
	.m-footer {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		padding: 20px 0;
		font-size: 12px;
	}
}
</style>

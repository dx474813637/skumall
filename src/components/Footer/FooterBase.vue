<template>
	<div class="ad-box u-p-b-10">
		<div class="home-w">
			<el-image  loading="lazy" src="/ad-banner1.jpg"  alt="" />
		</div>
	</div>
	
	<footer class="footer">
		<div class="home-w">
			 <div class="footer-link u-flex u-flex-center u-m-b-10">
				<el-link type="primary" >
					<router-link 
						tag="a"  
						:to="{
							name: 'web_danye',
							params: {
								id: '21'
							}
						}"
						>关于我们</router-link> 
				</el-link>
				<el-divider direction="vertical" class="u-m-l-20 u-m-r-20" />
				<el-link type="primary" >
					<router-link 
						tag="a"  
						:to="{
							name: 'web_danye',
							params: {
								id: '22'
							}
						}"
						>联系我们</router-link> 
				</el-link>
				<el-divider direction="vertical" class="u-m-l-20 u-m-r-20" />
				<el-link type="primary" >
					<router-link 
						tag="a"  
						:to="{
							name: 'web_danye',
							params: {
								id: '23'
							}
						}"
						>商务合作</router-link> 
				</el-link>
				<el-divider direction="vertical" class="u-m-l-20 u-m-r-20" />
				<el-link type="primary" >
					<router-link 
						tag="a"  
						:to="{
							name: 'web_danye',
							params: {
								id: '24'
							}
						}"
						>隐私政策</router-link> 
				</el-link>
				<el-divider direction="vertical" class="u-m-l-20 u-m-r-20" />
				<el-link type="primary" >
					<router-link 
						tag="a"  
						:to="{
							name: 'web_danye',
							params: {
								id: '25'
							}
						}"
						>供应商入驻</router-link> 
				</el-link> 
			 </div>
			 <div class="footer-link footer-link-sub u-flex u-flex-center" style="color: #999">
				<el-link type="info" :underline="false" href="/" target="_blank">增值电信业务经营许可证：浙B2-2023</el-link>
				<el-divider direction="vertical" class="u-m-l-20 u-m-r-20" />
				<el-link type="info" :underline="false" href="/" target="_blank">经营性网站备案信息: 浙1CP备2023000-1 </el-link>
				<el-link type="info" class="u-m-l-20 " :underline="false" href="#/" > Copyright @ 2023我要选品 版权所有</el-link> 
			 </div>
		</div>
	</footer>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped>
.ad-box {
	background-color: #fff;
	img {
		display: block;
		width: 100%
	}
} 
.footer {
	min-height: 120px;
	background-color: #fff; 
}
.footer-link-sub {
	.el-link {
		color: #999;
	}
}

 </style>
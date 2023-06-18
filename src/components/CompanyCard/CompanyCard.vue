<template>
	<div class="company-card u-p-10">
		<div class="card-header">
			<div class="header-main ">
				<el-row :gutter="10" align="middle">
					<el-col :span="18">
						<div class="item u-flex">
							<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
							<el-text class="u-font-18 u-m-l-10">某家店的大名</el-text>
						</div>
					</el-col>
					<el-col :span="6"> 
						<el-link href="">
							<span class="u-m-r-5">某个跳转</span>
							<el-icon>
								<i-ep-DArrowRight />
							</el-icon>
						</el-link> 
					</el-col>
				</el-row>   
			</div>
			<div class="header-sub u-m-b-15 u-m-t-10">
				<el-row :gutter="10">
					<el-col :span="12" class="u-line-1">
						<el-text type="info">地址：</el-text>
						<el-text >浙江省杭州市西湖区文三路独家卡了Dansk等金卡时间啊</el-text>
					</el-col>
					<el-col :span="12" class="u-line-1">
						<el-text type="info">主营：</el-text>
						<el-text >服饰</el-text>
					</el-col>
				</el-row> 

			</div>
		</div>
		<div class="card-content">
			<el-row :gutter="10" class="imgs">
				<el-col :span="8">
					<el-image lazy src="https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg" fit="cover" />
				</el-col>
				<el-col :span="8">
					<el-image lazy src="https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg" fit="cover" />
				</el-col>
				<el-col :span="8">
					<el-image lazy src="https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg" fit="cover" />
				</el-col>
			</el-row>
			
			<el-row :gutter="10" class="u-p-10 infos" style="background-color: #f8f8f8;">
				<el-col :span="6">
					<div class="u-line-1">
						<el-text>介绍value</el-text>
					</div>
					<div class=" ">
						<el-text type="info">介绍value</el-text>
					</div>
				</el-col>  
				<el-col :span="6">
					<div class="u-line-1">
						<el-text>介绍value</el-text>
					</div>
					<div class=" ">
						<el-text type="info">介绍value</el-text>
					</div>
				</el-col> 
				<el-col :span="6">
					<div class="u-line-1">
						<el-text>介绍value</el-text>
					</div>
					<div class=" ">
						<el-text type="info">介绍value</el-text>
					</div>
				</el-col> 
				<el-col :span="6">
					<div class="u-line-1">
						<el-text>介绍value</el-text>
					</div>
					<div class=" ">
						<el-text type="info">介绍value</el-text>
					</div>
				</el-col> 
			</el-row>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.company-card {
	width: 100%;
	border-radius: 5px;
	background-color: #fff;
	transition: all .2s;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0); 
	@extend %box-sizing;
	
	&:hover {
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		.company-img {
			img {
				transform: scale(1.2);
				transition-duration: .2s;
			}
			.company-btns {
				transform: translateY(0);
			}
		}
			
	}
	.imgs {
		.el-image {
			width: 100%;
			height: 100px;
		}
	}
	.infos {
		margin: 0!important;
		.el-text {
			font-size: 12px;
		}
	}
}
</style>

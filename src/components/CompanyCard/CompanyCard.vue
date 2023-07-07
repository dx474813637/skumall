<template>
	<div class="company-card u-p-10" @click="router.push({name: 'shop', params: {login: origin.login}})">
		<div class="card-header">
			<div class="header-main ">
				<el-row :gutter="10" align="middle">
					<el-col :span="24">
						<div class="item u-flex">
							<el-avatar v-if="origin.img" class="u-m-r-10" :src="origin.img" />
							<el-text class="u-font-18 " tag="b">{{ origin.company }}</el-text>
						</div>
					</el-col>
					<!-- <el-col :span="6"> 
						<el-link>
							<span class="u-m-r-5">进店逛逛</span>
							<el-icon>
								<i-ep-DArrowRight />
							</el-icon>
						</el-link> 
					</el-col> -->
				</el-row>   
			</div>
			<div class="header-sub u-m-b-15 u-m-t-10">
				<el-row :gutter="10">
					<el-col :span="24" class="u-line-1">
						<el-text type="info">地址：</el-text>
						<el-text >{{ origin.address }}</el-text>
					</el-col>
					<!-- <el-col :span="12" class="u-line-1">
						<el-text type="info">联系人：</el-text>
						<el-text >{{ origin.contacts }}</el-text>
					</el-col> -->
				</el-row> 

			</div>
		</div>
		<div class="card-content">
			<el-row :gutter="10" class="imgs">
				<el-col :span="8" v-for="item in products" :key="item.id">
					<el-image :lazy="lazy" :src="item.pic?.split('|')[0]" fit="cover" style="border-radius: 5px;" >
						<template #placeholder>
							<div class="u-flex u-flex-center"> 
								<el-image src="/logo.png" class="logo" fit="contain" /> 
							</div>
						</template>
						<template #error>
							<div class="u-flex u-flex-center"> 
								<el-image src="/logo.png" class="logo" fit="contain" /> 
							</div>
						</template>
					</el-image>
				</el-col> 
			</el-row>
			
			<el-row :gutter="10" class="u-p-10 infos" style="background-color: #f8f8f8;">
				<el-col :span="24">
					<!-- <div class="u-line-1">
						<el-text>介绍value</el-text>
					</div> -->
					<div class="info u-line-2">
						<el-text type="info">{{ origin.info }}</el-text>
					</div>
				</el-col>  
				<!-- <el-col :span="6">
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
				</el-col>  -->
			</el-row>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router/guard'
const props = defineProps({ 
	lazy: {
		type: Boolean,
		default: false
	},
	origin: {
		type: Object,
		default: () => ({})
	},
	products: {
		type: Object,
		default: () => []
	},
})
</script>
<style lang="scss" scoped>
.company-card {
	cursor: pointer;
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
		height: 70px;
		.el-text {
			font-size: 12px;
		}
	}
}
</style>

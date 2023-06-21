<template> 
	<Header-base />
	<div class="main">
		<div class="home-w u-flex u-flex-items-start u-p-t-20 u-p-b-20">
			
			<div class="item silder u-p-20">
				<div class="silder-items u-p-l-10 u-m-b-10" v-for="item in menuList1" :key="item.name">
					<div class="silder-title">{{item.name}}</div>
					<div class="silder-list ">
						<div class="list-item u-font-14 " 
							:class="{
								active: menuActive1 == ele.value
							}" 
							v-for="ele in item.children" 
							:key="item.name">
							<span>{{ ele.name }}</span> 
						</div>
					</div>
				</div>
				<div class="silder-items u-p-l-10 u-m-b-10" v-for="item in menuList2" :key="item.name">
					<div class="silder-title">{{item.name}}</div>
					<div class="silder-list ">
						<div class="list-item u-font-14 " 
							:class="{
								active: menuActive2 == ele.value
							}" 
							v-for="ele in item.children" 
							:key="item.name">
							<span>{{ ele.name }}</span> 
						</div>
					</div>
				</div>
			</div>
			<div class="item content u-flex-1 u-m-l-20 u-p-20">
				<div class="content-title u-m-b-30">
					<div>
						<el-text class="u-font-18">排行总榜（动态数据）</el-text> 
					</div>
					<div>
						<el-text type="info" class="u-font-12">排名由档口于 04/18 - 06/17 的代发销售额、上传量、关注量、收藏量、实拍商品等数据计算得出</el-text> 
					</div>
				</div>
				<!-- <el-divider class="u-m-t-15" /> -->
				<div class="content-rank">
					<div class="rank-item" v-for="(item, index) in 10" :key="index">
						<el-divider class="u-m-0" />
						<el-row align="middle" class="rank-row u-p-r-20">
							<el-col :span="4" class="u-flex u-flex-center">
								<el-image class="rank-img" lazy src="https://gz.17zwd.com/shop/public/img/top1.351597d0.png" fit="fill" />
							</el-col>
							<el-col :span="8">
								<div class="rank-company u-flex-y u-flex-items-start u-flex-center">
									<div class="company-name">
										<el-link @click="$router.push({name: 'shop', params: {id: 1}})">
											<el-text class="u-font-18">日韩屋</el-text>
										</el-link>
										
									</div>
									<div class="company-address">
										<el-text type="info" class="u-font-12">地址：新金马 网批2F B131-A</el-text>
									</div>
									<div class="company-data">
										<el-text class="u-font-12 u-m-r-10">人气值：99789</el-text>
										<el-text class="u-font-12">上传量：51955</el-text>
									</div>
									<div class="company-btns u-flex u-p-t-20">
										<div class="item u-p-r-20">
											<el-button type="danger" plain size="small">关注供应商</el-button>
										</div>
										<div class="item u-p-r-20">
											<el-button type="danger" plain size="small">进入供应商</el-button>
										</div> 
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<el-row :gutter="10" class="imgs">
									<el-col :span="8">
										<el-image lazy src="https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg" fit="contain" />
									</el-col>
									<el-col :span="8">
										<el-image lazy src="https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg" fit="contain" />
									</el-col>
									<el-col :span="8">
										<el-image lazy src="https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg" fit="contain" />
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>	
	<Footer-help /> 
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, onBeforeMount } from "vue";
const menuActive1 = ref('1')
const menuActive2 = ref('1')
const menuList1 = ref([
	{
		name: '排行榜对象',
		children: [
			{
				name: '供应商排行榜',
				value: '1'
			},
			{
				name: '商品排行榜',
				value: '2'
			},
		]
	},  
	
])

const menuList2 = ref([ 
	{
		name: '排行榜品类',
		children: [
			{
				name: '连衣裙',
				value: '1'
			},
			{
				name: 'T恤',
				value: '2'
			},
			{
				name: '大码女装',
				value: '3'
			},
			{
				name: '套装',
				value: '4'
			},
			{
				name: '休闲裤/打底裤',
				value: '5'
			},
			{
				name: '牛仔裤',
				value: '6'
			},
			{
				name: '衬衫',
				value: '7'
			},
			{
				name: '半身裙',
				value: '8'
			},
			{
				name: '卫衣',
				value: '9'
			},
			{
				name: '男装',
				value: '10'
			},
		]
	},
	
])

const rankList = ref([
	{
		id: '1',
		rank: '1',
		img: 'https://gz.17zwd.com/shop/public/img/top1.351597d0.png',
		name: ''
	}
])

onBeforeMount(() => {
	console.log("2.组件挂载页面之前执行----onBeforeMount");
});
onMounted(() => {
	console.log("3.-组件挂载到页面之后执行-------onMounted");
});
</script>
<style lang="scss" scoped>
$rank-line-h: 180px;
.rank-item {	
	// border-top: 1px solid $uni-border-color;
	.el-row.rank-row {
		background-image: url('https://gz.17zwd.com/shop/public/img/beijing.fadfc2ad.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	&:first-child {
		border-top: 0;
	}
	.rank-img {
		width: 100px;
		height: 100px
	}
	.rank-company {
		height: $rank-line-h;
		.company-name {
			.el-text {
				color: #000
			}
			
		}
	}
	.imgs {
		.el-image {
			width: 100%;
			height: $rank-line-h * 0.7;
			background-color: rgba(0,0,0,.1);
		}
	}
}

.main {
	.item {
		&.silder {
			@extend %box-sizing;
			width: $slider-screen-w;
			flex: 0 0 $slider-screen-w;
			background-color: $uni-bg-color;
			min-height: 500px;
			.silder-items {
				.silder-title {
					line-height: 35px;
					color: #333;
					position: relative;
					font-weight: bold;
					&:after {
						content: '';
						position: absolute;
						left: -10px;
						top: 50%;
						transform: translateY(-50%);
						height: 18px;
						background-color:  $uni-color-primary;
						width: 3px;
					}
				}
				.silder-list {
					.list-item { 
						padding: 5px 0;
						color: #666;
						>span {
							padding: 0 15px;
							display: inline-block;
							line-height: 28px;
							border-radius: 15px;
							cursor: pointer;
							&:hover { 
								color: $uni-color-primary ;
								background-color: $uni-bg-color-grey;
							}
						}
						&.active {
							
							>span {
								color: #fff;
								background-color: $uni-color-primary;
							}
						}
						
					}
				}
			}
		}
		&.content {
			@extend %box-sizing;
			width: calc(100% - $slider-screen-w);
			flex: 0 0 calc(100% - $slider-screen-w);
			min-height: 500px;
			background-color: $uni-bg-color;
		}
	}
}
</style>

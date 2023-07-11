<template>
	<Header-base></Header-base>
	<div class="main-wrapper" v-infinite-scroll="load">
		<div class="home-w">
			<div class="header-screen u-flex u-m-b-20">
				<div class="item item-left">
					<el-scrollbar >
						<menu-cate height="100%"></menu-cate>
					</el-scrollbar>
					
				</div>
				<div class="item item-main u-flex-column"> 
					<div class="main-swiper u-flex-1">
						<el-carousel height="100%" >
							<el-carousel-item v-for="item in base_home_swiper" :key="item.id">
								<el-image class="swiper-img" :src="item.img" fit="fill" @click="gotoUrl(item.url)"></el-image>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="main-bottom u-flex u-flex-between">
						<div class="item" v-for="item in base_home_list" :key="item.id">
							<img :src="item.img" alt="" @click="gotoUrl(item.url)">
						</div> 
					</div>
				</div>
				<div class="item item-right u-flex-column">
					<div class="login-box u-flex-column  u-flex-1 u-p-10 u-p-l-20 u-p-r-20">
						<div class="login-top u-p-t-10 u-m-b-30">
							<div class="login-info u-flex u-m-b-10">
								<el-avatar  :src="cpy_info.img || user_info.mem_pic || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
								<div class="u-flex-1 u-m-l-20">
									<div>
										<el-text tag="b">Hi</el-text>
										<el-text tag="b" v-if="login">，{{ cpy_info.company || user_info.name }}</el-text>
									</div>
									<div>
										<el-text type="info">欢迎来到 51选品网</el-text>
									</div> 
								</div>
							</div>
							<div class="login-btns">
								<div class="u-m-b-8">
									<el-button type="danger" plain v-if="login" @click="user.logout()">登出</el-button>
									<el-button type="primary" v-else @click="router.push({name: 'login'})">登录</el-button>
								</div>
								<div class="u-flex"  v-if="!login">
									<div class="item u-p-r-4 u-flex-1">
										<el-button type="primary" plain @click="router.push({name: 'login'})">注册</el-button> 
									</div>
									<div class="item u-p-l-4 u-flex-1">
										<el-button type="primary" plain @click="router.push({name: 'user_index'})">供应商中心</el-button>
									</div> 
								</div>
							</div>
						</div>
						<div class="login-bottom u-p-b-20">
							<el-row>
								<el-col :span="12" class="u-flex u-flex-center">
									<el-link :underline="false">
										<div class=" u-flex-column" @click="router.push({name: 'cart'})">
											<el-icon size="24">
												<i-ep-ShoppingCart />
											</el-icon>
											<el-text size="large" class="u-m-t-5">我的选品车</el-text>
										</div>
									</el-link>
									
								</el-col>
								<el-col :span="12" class="u-flex u-flex-center">
									<el-link :underline="false" @click="router.push({name: 'user_index'})">
										<div class=" u-flex-column">
											<el-icon size="24">
												<i-ep-ChatDotSquare />
											</el-icon>
											<el-text size="large" class="u-m-t-5">消息管理</el-text>
										</div>
									</el-link>
									
								</el-col>
							</el-row>
						</div>
					</div>
					<div class="main-bottom">
						<div class="news-box">
							<div class="box-title u-flex u-flex-between u-p-l-10 u-p-r-10 u-p-t-10">
								<div class="item">
									<el-text type="primary">近期公告</el-text>
								</div> 
								<div class="item">
									<el-link href="#/news_list">
										<el-text type="info" size="small">更多</el-text>
									</el-link>
									
								</div> 
							</div>
							<div class="box-main u-p-10" v-loading="news_list_loading">
								<template v-if="news_list.length == 0 || !news_list">
									<div class="u-flex u-flex-center" style="width: 100%; background-color: #fff;">
										<el-empty :image-size="50" description="公告为空" style="--el-empty-padding: 0px; font-size: 14px" />
									</div>
								</template>
								<div class="news-item u-m-b-5 " v-for="item in news_list" :key="item.id">
									<el-link class="u-line-1 u-flex-start" @click="router.push({name: 'news', params: {id: item.id}})">{{ item.title }}</el-link>
								</div>  
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="tj-box index-box u-m-b-30">
				<div class="box-title u-flex u-flex-between u-p-b-20">
					<div class="item">
						<span class="title u-font-18">优选店铺</span>
						<span class="sub u-m-l-10 u-font-14">品质好商，生产实力领先</span>
					</div>
					<div class="item"></div>
				</div>
				<div class="box-main">
					<el-tabs v-model="tjActive" type="card" @tab-change="handleTjClick">
						<el-tab-pane 
							:label="item.name" 
							:name="item.login"
							v-for="(item, index) in tj_shop_tabs"
							:key="item.id"
							v-loading="tj_shop_loading"
							>
							<div class="tj-list u-p-20 u-flex u-flex-between u-flex-items-start">
								<div class="tj-img u-p-r-10">
									<el-image :src="item.img" fit="fill" />
								</div>
								<div class="tj-prods u-flex u-flex-wrap u-flex-1 ">
									<div class="prods u-p-l-10 u-p-r-10"
										v-for="item in tj_shop_products"
										:key="item.id"
										>
										<product-card-simple :origin="item" ></product-card-simple>
									</div>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs> 
				</div>
			</div>
			<div class="company-box index-box u-m-b-30">
				<div class="box-title u-flex u-flex-between u-flex-items-end u-p-b-20">
					<div class="item u-flex-1"></div>
					<div class="item u-flex-1">
						<el-divider>
							<span class="title u-font-18">推荐店铺</span>
						</el-divider>
					</div>
					<div class="item u-flex u-flex-1 u-flex-end">
						<!-- <el-link href="">
							<span>查看更多</span>
							<el-icon>
								<i-ep-DArrowRight />
							</el-icon>
						</el-link> -->
					</div>
				</div>
				<div class="box-main u-flex u-flex-wrap "> 
					<div class="item cpy-card u-m-b-20" v-for="item in tj_shop_list" :key="item.id">
						<company-card :origin="item.company" :products="item.product"></company-card>
					</div>



				</div>
			</div>

			


			<div v-loading="base_list_loading">
				<el-tabs v-model="tabsActive" >
					<el-tab-pane label="全部" name="" key="all"></el-tab-pane>
					<el-tab-pane 
						:label="item.name" 
						:name="item.id"
						v-for="(item, index) in cate_list"
						:key="item.id"
						>
					</el-tab-pane>
				</el-tabs> 
				
				<template v-if="!base_list || base_list.length == 0">
					<div class="u-flex u-flex-center u-p-t-30" style="width: 100%; background-color: #fff;">
						<el-empty description="列表为空" />
					</div> 
				</template>
				<template v-else>
					<div class="base-list" >
						<div class="base-list-item u-m-b-20"
							v-for="item in base_list"
							:key="item.id"
							>
							<product-card :origin="item" :lazy="true" @uploadPlatformShowEvent="uploadPlatformShowEvent"></product-card>
						</div>
					</div>
					<div class="u-m-b-40">
						<el-button size="large" plain style="width: 100%;" @click="router.push({path: 'list', query: {cate: tabsActive}})">查看全部</el-button>
					</div>
				</template>
				
			</div>
			
		</div>
	</div>
	<Footer-base></Footer-base>
	
	<UploadShopControl
		v-model:show="flowShow"
		:product="flowProduct" 
		></UploadShopControl>
</template>

<script setup lang="ts">
import { onMounted, inject, ref, toRefs, watch } from "vue"; 
import router from '@/router/guard'
import {userStore} from '@/stores/user'
const $api = inject('$api');  
const user = userStore();
const {login, user_info, cpy_info} = toRefs(user)
import {cateStore} from '@/stores/cate' 
const cate = cateStore();
const { cate_list } = toRefs(cate)
const base_home_list = ref([])
const base_home_swiper = ref([])
const base_list_loading = ref(false)
const base_list = ref([]) 
// 优选店铺 by login
const tj_shop_tabs = ref([]) 
const tj_shop_products = ref([])
const tj_shop_loading = ref(false)
// 推荐店铺 list
const tj_shop_list = ref([]) 
const tj_shop_list_loading = ref(false)
const news_list = ref([]) 
const news_list_loading = ref(false)
const swiperList = ref([
	{
		id: '1',
		img: 'https://statics-master.xiebutou.com/admin/static/2e9ef0c81dbce4252ab9c16563d4f1b6.jpg',
	},
	{
		id: '2',
		img: 'https://statics-master.xiebutou.com/admin/static/cdd8542513cf3d3ca9e343282b542778.jpg',
	},
	{
		id: '3',
		img: 'https://statics-master.xiebutou.com/admin/static/f0708678f3077e58b2b5437687877cc5.jpg',
	},
	{
		id: '4',
		img: 'https://statics-master.xiebutou.com/admin/static/34b93324d680636081a48c62a864b01e.jpg',
	},
	{
		id: '5',
		img: 'https://statics-master.xiebutou.com/admin/static/59df4c5c5e6c9f55ee19ec00fb641f27.jpg',
	},
])
const flowShow = ref(false)
const flowProduct = ref({})
const load = () => { 
	// console.log(2)
}

const tjActive = ref('')
const tjList = ref([
	{
		name: '豪新鞋行', 
		value: '0',
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/9d5dc100fc796ad16517c4a8aabba991.jpg',
	},
	{
		name: '足上潮流',
		value: '1', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/651bc7de3ec7039de9d473b78d4b97e2.jpg',
	},
	{
		name: '五 间',
		value: '2', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/5c6711bd7e267c753a6b005f8b526f5c.jpg',
	},
	{
		name: '隆钦工厂记',
		value: '3', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/c0e6198131a8b0f17d90d891a8b45e86.jpg',
	},
	{
		name: '友盟鞋业',
		value: '4', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/901887b3850db68bf9d2ab7a452ab872.jpg',
	},
	{
		name: '鑫风尚',
		value: '5', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/910b147a6071ffa37dcb00ccddc394cb.jpg',
	},
	{
		name: '众赢真皮鞋厂',
		value: '6', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/2c7759e0ca7ec81555bc30285f549985.jpg',
	},
	{
		name: '森雅鞋业',
		value: '7', 
		loading: false,
		img: 'https://statics-master.xiebutou.com/admin/static/c6fe2f9fff4d36accacdb6d95639a5dd.jpg',
	},
])

const tabsActive = ref('')
 
onMounted(async () => {
	getHome()
})
watch(
	() => tabsActive.value,
	() => {
		base_list.value = []
		getProdListData()
	},
	{
		immediate: true
	}
)
function uploadPlatformShowEvent(data) {
	flowProduct.value = data
	flowShow.value = true
}
// watch(
// 	() => tjActive.value,
// 	() => {
// 		tj_shop.value = {}
// 		getTjShopByLogin()
// 	}
// )
async function getHome() {
	getHomeData() 
	getTjShopByLogin()
	getTjShopData()  
	getNewsData() 
}
function gotoUrl(url) {
	if(!url) return
	window.location.href = url
}
async function getTjShopByLogin() {
	tj_shop_loading.value = true
	const res = await $api.web_tuijian({params: {
		login: tjActive.value
	}});
	tj_shop_loading.value = false
	if(res.code == 1) {
		if(!tjActive.value) {
			tjActive.value = res.list[0].login
		}
		tj_shop_products.value = res.product
		tj_shop_tabs.value = res.list
	}
}
async function getNewsData() {
	news_list_loading.value = true
	const res = await $api.web_news({params: {
		num: 3
	}});
	news_list_loading.value = false
	if(res.code == 1) {
		news_list.value = res.list 
	}
}
async function getTjShopData() {
	tj_shop_list_loading.value = true
	const res = await $api.web_tuijian2({params: {
		num: 6
	}});
	tj_shop_list_loading.value = false
	if(res.code == 1) {
		tj_shop_list.value = res.list 
	}
}
async function getHomeData() {
	const res = await $api.web_home();
	if(res.code == 1) {
		base_home_swiper.value = res.swiper
		base_home_list.value = res.list
	}
}
async function getProdListData() {
	base_list_loading.value = true
	const res = await $api.web_product({
		params: {
			cate: tabsActive.value,
			p: 1,
			num: 18
		},
		loading: false
	});
	base_list_loading.value = false
	if(res.code == 1) {
		base_list.value = res.list 
	}
} 
function handleTjClick(tab ) { 
	getTjShopByLogin()
} 
</script>
<style lang="scss" scoped>
.main-wrapper {
	padding-top: 20px;
	.home-w {

	}
	.header-screen {
		height: $header-screen-h;
		.item {
			height: 100%;
			&.item-left {
				width: $header-menus-w;
				flex: 0 0 $header-menus-w;
				border-radius: 8px;
				background-color: $uni-bg-color; 
			}
			&.item-main {
				flex: 1;
				// flex: 0 0 calc(100% - $header-menus-w - $header-screen-right-w);
				// width: calc(100% - $header-menus-w - $header-screen-right-w);
				margin-left: 1%;
				margin-right: 1%;
				.main-swiper {
					width: 100%; 
					height: 100%;
					.swiper-img {
						width: 100%;
						height: 100%;
						border-radius: 8px;
					}
					.el-carousel {
						height: 100%;
					}
				}
				.main-bottom {
					width: 100%;
					margin-top: 2%;
					.item {
						flex: 0 0 32%;
						width: 32%;
						height: 90px;
						border-radius: 2px;
						overflow: hidden;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			&.item-right {
				width: $header-screen-right-w;
				flex: 0 0 $header-screen-right-w;
				border-radius: 8px;
				background-color: $uni-bg-color;
				.login-box {
					width: 100%;
					@extend %box-sizing;
					.login-top {
						width: 100%;
						.login-info {

						}
						.login-btns {
							.el-button {
								width: 100%;
							}
						}
					}
					.login-bottom {
						width: 100%; 
						.el-text {
							--el-text-color: #000;
						}
						
						
					}
				}
				.main-bottom {
					width: 100%;
					.news-box {
							width: 100%;
							.box-title { 
								border-top: 1px solid var(--el-border-color);
							}
							.box-main {
								width: 100%;
								@extend %box-sizing;
								.news-item {
									width: 100%;
									.el-link {
										width: 100%;
									}
									::v-deep {
										.el-link__inner {
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;
											display: block; 
										}
									} 
								}
							}
						}
				}
			}
		}
	}
	.tabs-w {
		background-color: $uni-bg-color;
		@extend %box-sizing;
		border-radius: 4px;
		.item {
			cursor: pointer;
			&.active {
				color: $uni-color-primary;
			}
		}
	}
	.base-list {
		@include flex(x, start, start);
        flex-wrap: wrap;
		.base-list-item {
			flex: 0 0 15%;
			width: 15%;
			margin-right: 2%;
			&:nth-of-type(6n) {
				margin-right: 0;
			}
		}
	}
	.index-box {
		::v-deep {
			.el-divider__text {
				background-color: #f8f8f8;
			}
		}
		.box-title {
			.title {
				color: #000;
			}
			.sub {
				color: $uni-text-color-grey;
			}
		}
		
		.el-tabs {
			::v-deep {
				.el-tabs__header {
					margin-bottom: 0;
					border: 0;
				}
				.el-tabs__nav {
					border: 0;
					// border-top-color: transparent;
					// border-left: 0;
					// border-right: 0;
				}
				.el-tabs__item {
					// background-color: $uni-bg-color;
					margin-right: 10px;
					border: 0;
					border-radius: 3px 3px 0 0;
					padding: 0 30px;
					background-color: #F9FAFB;
					box-shadow: 0 0 10px rgba(0,0,0,.05);
					&:last-child {
						margin-right: 0;
					}
					&.is-active {
						background-color: $uni-bg-color; 
					}
				}
			}
		}
	}
	.tj-list {
		height: auto;
		min-height: 460px;
		background-color: $uni-bg-color; 
		@extend %box-sizing;
		.tj-img {
			@extend %box-sizing;
			flex: 0 0 20%;
			width: 20%;
			height: 460px;
			position: relative;
			.el-image {
				height: 100%;
				width: 100%; 
				border-radius: 5px
			}
		}
		.tj-prods {
			@extend %box-sizing;
			height: 100%;
			.prods {
				flex: 0 0 20%;
				height: 230px;
				width: 20%;
				@extend %box-sizing;
			}
		}
	}
	.cpy-card {
		flex: 0 0 32%;
		width: 32%;
		margin-right: 2%;
		&:nth-of-type(3n) {
			margin-right: 0;
		}
	}
}
</style>

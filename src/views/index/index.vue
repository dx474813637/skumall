<template>
	<Header-base></Header-base>
	<div class="main-wrapper" v-infinite-scroll="load">
		<div class="home-w">
			<div class="header-screen u-flex u-m-b-20">
				<div class="item item-left">
					<menu-cate height="100%"></menu-cate>
				</div>
				<div class="item item-main u-flex-column"> 
					<div class="main-swiper u-flex-1">
						<el-carousel height="100%" >
							<el-carousel-item v-for="item in swiperList" :key="item.id">
								<el-image class="swiper-img" :src="item.img" fit="fill"></el-image>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="main-bottom u-flex u-flex-between">
						<div class="item">
							<img src="/bg-login1.jpg" alt="">
						</div>
						<div class="item">
							<img src="/bg-login1.jpg" alt="">
						</div>
						<div class="item">
							<img src="/bg-login1.jpg" alt="">
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
							<div class="box-title u-flex u-flex-between u-p-l-10 u-p-t-10">
								<div class="item">
									<el-text type="primary">近期公告</el-text>
								</div> 
							</div>
							<div class="box-main u-p-10">
								<div class="news-item u-m-b-5">
									<el-link class="u-line-1">进口量达四级裸考几啊深度克隆贾老师觉得亏拉屎开了多久</el-link>
								</div>
								<div class="news-item u-m-b-5">
									<el-link class="u-line-1">进口量达四级裸考几啊深度克隆贾老师觉得亏拉屎开了多久</el-link>
								</div>
								<div class="news-item u-m-b-5">
									<el-link class="u-line-1">进口量达四级裸考几啊深度克隆贾老师觉得亏拉屎开了多久</el-link>
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
					<el-tabs v-model="tjActive" type="card" @tab-click="handleTjClick">
						<el-tab-pane 
							:label="item.name" 
							:name="item.value"
							v-for="(item, index) in tjList"
							:key="item.value"
							>
							<div class="tj-list u-p-20 u-flex u-flex-between" v-loading="item.loading">
								<div class="tj-img u-p-r-10">
									<el-image loading="lazy" :src="item.img" fit="fill" />
								</div>
								<div class="tj-prods u-flex u-flex-wrap ">
									<div class="prods u-p-l-10 u-p-r-10"
										v-for="prod in 10"
										:key="prod"
										>
										<product-card-simple></product-card-simple>
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
						<el-link href="">
							<span>查看更多</span>
							<el-icon>
								<i-ep-DArrowRight />
							</el-icon>
						</el-link>
					</div>
				</div>
				<div class="box-main u-flex u-flex-wrap "> 
					<div class="item cpy-card u-m-b-20" v-for="item in 6">
						<company-card></company-card>
					</div>



				</div>
			</div>

			


			<el-tabs v-model="tabsActive" @tab-click="handleTabsClick">
				<el-tab-pane 
					:label="item.name" 
					:name="item.value"
					v-for="(item, index) in tabsList"
					:key="item.value"
					>
				</el-tab-pane>
			</el-tabs> 
			<div class="base-list">
				<div class="base-list-item u-m-b-20"
					v-for="item in base_list_total"
					:key="item"
					>
					<product-card></product-card>
				</div>
			</div>
		</div>
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, inject, ref, toRefs } from "vue"; 
import router from '@/router/guard'
import {userStore} from '@/stores/user'
const user = userStore();
const {login, user_info, cpy_info} = toRefs(user)
const base_list_loading = ref(false)
const base_list = ref([])
const base_list_total = ref(30)
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
const load = () => { 
	console.log(2)
}

const tjActive = ref('0')
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

const tabsActive = ref('0')
const tabsList = ref([
	{
		name: '全部推荐', 
		value: '0',
	},
	{
		name: '男鞋',
		value: '1', 
	},
	{
		name: '女鞋',
		value: '2', 
	},
	{
		name: '运动鞋',
		value: '3', 
	}, 
	{
		name: '全部推荐',
		value: '4', 
	},
	{
		name: '男鞋',
		value: '5', 
	},
	{
		name: '女鞋',
		value: '6', 
	},
	{
		name: '运动鞋',
		value: '7', 
	}, 
	{
		name: '全部推荐',
		value: '8', 
	},
	{
		name: '男鞋',
		value: '9', 
	},
	{
		name: '女鞋',
		value: '10', 
	},
	{
		name: '运动鞋',
		value: '11', 
	}, 
	{
		name: '运动鞋',
		value: '12', 
	}, 
	{
		name: '运动鞋',
		value: '13', 
	}, 
	{
		name: '运动鞋',
		value: '14', 
	}, 
	{
		name: '运动鞋',
		value: '15', 
	}, 
	{
		name: '运动鞋',
		value: '16', 
	}, 
])


function handleTabsClick(tab ) { 
	tabsActive.value = tab.value
} 
function handleTjClick(tab ) { 
	tjActive.value = tab.paneName
	let i = tjList.value.findIndex(ele => ele.value == tab.paneName) 
	tjList.value[i].loading = true;
	setTimeout(() => {
		tjList.value[i].loading = false
	}, 1000)
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

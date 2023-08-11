<!--  -->
<template>
	<header-user></header-user>
	<div class="user-wrap">
		<div class="home-w u-flex u-flex-items-start u-p-t-15 u-p-b-15">
			<div class="item item-menus u-radius-5 u-p-5">
				<el-menu
					:default-active="menuActive"
					class="el-menu-vertical-demo"
					router
					@open="handleOpen"
					@close="handleClose"
					>
					<template  v-for="item in menuList" >
						<el-sub-menu  
							v-if="item.children && item.children.length > 0" 
							:index="item.index" 
							:key="item.index"
							>
							<template #title>
								<el-icon>
									<component :is="item.icon"></component>
								</el-icon>
								
								<span class="menu-title" >{{item.label}}</span>
							</template>
							<el-menu-item 
								v-for="ele in item.children" 
								:index="ele.index" 
								:key="ele.index"
								:route="ele.route" 
								>
								
								<!-- <i class="custom-icon" :class="ele.icon" v-if="ele.icon" ></i>
								<span slot="title">{{ele.label}}</span> -->
								<template #title>
									<view class="u-flex u-flex-between" >
										<view class="item-left">
											<i class="custom-icon" :class="ele.icon" v-if="ele.icon" ></i>
											<span>{{ele.label}}</span>
										</view>
										<!-- <view class="item-right">
											<template v-if="ele.active == 'cart'">
												<text class="num" v-if="cartNumTotal > 0">{{cartNumTotal}}</text>
											</template>
											
										</view> -->
									</view>
								</template>
								
							</el-menu-item>
						</el-sub-menu>
						<el-menu-item v-else @click="logout" class="logout">
							<el-icon>
								<component :is="item.icon"></component>
							</el-icon>
							<span >{{item.label}}</span>
						</el-menu-item>
					</template> 
				</el-menu>
			</div>
			<div class="item item-main u-m-l-15 u-radius-5">
				<el-page-header class="u-p-10 u-p-t-20" title="后退"  @back="onBack"> 
					<template #icon >
						<el-icon>
							<i-ep-ArrowLeft></i-ep-ArrowLeft>
						</el-icon>
					</template>
					<template #content>
						<el-text class="u-font-18" tag="b"> {{ useSettings.title }} </el-text>
						<el-text class="u-font-14 u-m-l-20" type="info"> {{ subTitle }} </el-text>
					</template>
					<template #extra>
						<el-button 
							type="primary" 
							plain 
							v-if="btnActive" 
							@click="router.push({name: btnActive.to.name})"
							>{{ btnActive.title }}</el-button>
					</template>
					<!-- <div class="mt-4 text-sm font-bold">
						Your additional content can be added with default slot, You may put as
						many content as you want here.
					</div> -->
				</el-page-header>
				<router-view style="width: 100%;" :key="routerPath"></router-view>
			</div>
		</div>
	</div>
	
	<footer-help></footer-help>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, toRefs  } from "vue";
// import menuList from "@/utils/menuList"
import router from "@/router/guard" 
import {useSettingsStore} from '@/stores/settings'
import {cateStore} from '@/stores/cate'
import {userStore} from '@/stores/user'
import {useFinanceStore} from '@/stores/finance'
const useSettings = useSettingsStore()
const cate = cateStore()
const finance = useFinanceStore()
const {menuList} = toRefs(cate)
const { account_info, organizations_info } = toRefs(finance)
const user = userStore() 
const menuActive = ref('user_index')
const routerPath = computed(() => {
	return router.currentRoute.value.fullPath
})
const addBtnList = [
	// {
	// 	name: 'address_list',
	// 	title: '新增地址',
	// 	to: {
	// 		name: 'address_add'
	// 	}
	// },
	{
		name: 'product_list',
		title: '新增商品',
		to: {
			name: 'product_add'
		}
	},
]
onMounted(() => {
	
	user.getRoleData()
})
 
const btnActive = computed(() => { 
	return addBtnList.filter(ele => ele.name == menuActive.value)[0]
})
const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath);
};
const subTitle = computed(() => {
	return menuList.value.filter(ele => {
		return ele.children && ele.children.some(item => {
			return item.index == menuActive.value
		})
	})[0]?.label
})
// const subTitle = computed(() => menuList.filter(ele => ele?.children.some(item => item.index == menuActive.value))[0].label)

watch(
	() => router.currentRoute.value,
	(newValue:any) => {
		console.log(newValue.name) 
		menuActive.value = newValue.name
	},
	{immediate: true, deep: true}
)

const logout = () => {
	user.logout()
	useSettings.goLogin()
}

const onBack = () => {
	router.go(-1) 
}

</script>
<style lang="scss" scoped> 
 
.el-menu {
	border-right: 0;
}
.user-wrap {
	width: 100%;
	::v-deep {
		.el-menu-item {
			color: #888;
			&.is-active {
				color: $uni-color-primary;
			}
		}
		.el-sub-menu__title,
		.logout {
			font-weight: bold;
			color: #333;
		}
	}
}
.item-menus {
	background-color: #fff;	
	width: $user-menus-w;
}
.item-main {
	background-color: #fff;
	flex: 0 0 calc(100% - $user-menus-w);
	width: calc(100% - $user-menus-w);
	min-height: 80vh;
	// padding-left: 10px;
	// padding-right: 10px;
	@extend %box-sizing;
}
.el-page-header {
	::v-deep {
		.el-page-header__title {
			color: #999;
		}
	}
}
</style>

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
					<template  v-for="item in menuListRef" >
						<el-sub-menu  
							v-if="item.children && item.children.length > 0" 
							:index="item.index" 
							:key="item.index"
							>
							<template #title>
								<el-icon>
									<component :is="item.icon"></component>
								</el-icon>
								
								<span class="menu-title" slot="title">{{item.label}}</span>
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
									<view class="u-flex u-row-between" >
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
							<span slot="title">{{item.label}}</span>
						</el-menu-item>
					</template> 
				</el-menu>
			</div>
			<div class="item item-main u-m-l-15 u-radius-5">
				<router-view style="width: 100%;"></router-view>
			</div>
		</div>
	</div>
	
	<footer-base></footer-base>
</template>

<script setup lang="ts">
import { ref, watch  } from "vue";
import menuList from "@/utils/menuList"
import router from "@/router/guard" 
import {useSettingsStore} from '@/stores/settings'
const useSettings = useSettingsStore()
const menuListRef = ref(menuList)
const menuActive = ref('user_index')
const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath);
};

watch(
	() => router.currentRoute.value,
	(newValue:any) => {
		console.log(newValue)
		menuActive.value = newValue.name
	},
	{immediate: true}
)

const logout = () => {
	useSettings.logout()
	useSettings.goLogin()
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
	
}
</style>

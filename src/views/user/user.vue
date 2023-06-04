<!--  -->
<template>
	<header-user></header-user>
	<div class="user-wrap">
		<div class="home-w u-flex u-flex-items-start u-p-t-15 u-p-b-15">
			<div class="item item-menus u-radius-5 u-p-5">
				<el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
				>
					<el-sub-menu index="1">
						<template #title>
							<el-icon><location /></el-icon>
							<span>Navigator One</span>
						</template>
						<el-menu-item-group title="Group One">
							<el-menu-item index="1-1">item one</el-menu-item>
							<el-menu-item index="1-2">item two</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="Group Two">
							<el-menu-item index="1-3">item three</el-menu-item>
						</el-menu-item-group>
						<el-sub-menu index="1-4">
							<template #title>item four</template>
							<el-menu-item index="1-4-1">item one</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-menu-item index="2">
						<el-icon><icon-menu /></el-icon>
						<span>Navigator Two</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<el-icon><document /></el-icon>
						<span>Navigator Three</span>
					</el-menu-item>
					<el-menu-item index="4">
						<el-icon><setting /></el-icon>
						<span>Navigator Four</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="item item-main u-m-l-15 u-radius-5 ">
				<router-view style="width: 100%;"></router-view>
			</div>
		</div>
	</div>
	
	<footer-base></footer-base>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
} from "@element-plus/icons-vue"; 
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>
<style lang="scss" scoped> 
.user-wrap {
	width: 100%;
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

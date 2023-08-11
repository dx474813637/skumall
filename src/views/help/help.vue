<!--  -->
<template>
	<header-help></header-help>
	<div class="user-wrap">
		<div class="home-w u-flex u-flex-items-start u-p-t-15 u-p-b-15">
			<div class="item item-menus u-radius-5 u-p-5">
				<el-menu :default-active="menuActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
					@select="handleSelect">
					<template v-for="item in list">
						<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.index" :key="item.index">
							<template #title>
								<!-- <el-icon>
									<component :is="item.icon"></component>
								</el-icon> -->

								<span class="menu-title">{{ item.label }}</span>
							</template>
							<el-menu-item v-for="ele in item.children" :index="ele.index" :key="ele.index">

								<!-- <i class="custom-icon" :class="ele.icon" v-if="ele.icon" ></i>
								<span slot="title">{{ele.label}}</span> -->
								<template #title>
									<view class="u-flex u-flex-between">
										<view class="item-left">
											<i class="custom-icon" :class="ele.icon" v-if="ele.icon"></i>
											<span>{{ ele.label }}</span>
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
						<el-menu-item v-else :index="item.index" :key="item.index">
							<!-- <el-icon>
								<component :is="item.icon"></component>
							</el-icon> -->
							<span>{{ item.label }}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</div>
			<div class="item item-main u-m-l-15 u-radius-5 u-p-15">
				<div v-html="detailInfo"></div>
			</div>
		</div>
	</div>

	<footer-help></footer-help>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, inject } from "vue";
// import menuList from "@/utils/menuList"
import router from "@/router/guard"
const props = defineProps({
	id: {
		type: String,
		default: '1'
	},
})
const menuActive = ref('1')
const $api = inject('$api')
const loading = ref(false)
const list = ref([])
const routerPath = computed(() => {
	return router.currentRoute.value.fullPath
})
onMounted(async () => {
	loading.value = true
	await getData()
	loading.value = false
})
const detailInfo = computed(() => {
	if(list.value.length == 0) return ''
	let info = ''
	list.value.some(ele => {
		if(ele.children && ele.children.length > 0) {
			return ele.children.some(item => {
				if(item.index == menuActive.value) {
					info = item.info
					return true
				}
				return false
			})
		}
		else {
			if(ele.index == menuActive.value) {
				info = ele.info
				return true
			}
			return false
		}
	})
	console.log(info)
	return info
})
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
	router.push({
		name: 'help',
		query: {
			id: key
		}
	})
}
const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath);
}; 
// watch(
// 	() => router.currentRoute.value,
// 	(newValue:any) => {
// 		console.log(newValue.name) 
// 		menuActive.value = newValue.name
// 	},
// 	{immediate: true, deep: true}
// )
watch(
	() => props.id,
	(n) => {
		console.log(n)
		menuActive.value = n
	},
	{
		immediate: true
	}
)

async function getData() {
	const res = await $api.web_help()
	if (res.code == 1) {
		list.value = webHelpData2Arr(res.list)
	}
}
function webHelpData2Arr(data) {
	let arr = [];
	for (let name in data) {
		let obj = {
			label: '',
			id: '',
		};
		obj.label = name;
		obj.id = name;
		obj.index = name;
		if (data[name] instanceof Array) {
			obj.children = data[name].map(ele => ({ ...ele, index: ele.id, label: ele.cate }))
		}
		else if (data[name] instanceof Object) {
			obj = { ...obj, ...data[name], index: data[name].id }
		}
		arr.push(obj)
	}
	console.log(arr)
	return arr
}

</script>
<style lang="scss" scoped> .el-menu {
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

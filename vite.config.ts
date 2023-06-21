import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import path from 'path'; //导入已经安装的@type/node

// import { viteMockServe } from 'vite-plugin-mock' 
// https://vitejs.dev/config/

export default (({ mode }) => {
	// console.log(mode, loadEnv(mode, process.cwd()))
	// const VITE_BASE_URL: string = loadEnv(mode, process.cwd()).VITE_BASE_URL;
	// console.log(VITE_BASE_URL)
	// const VITE_RES_URL_CHILD: string = loadEnv(mode, process.cwd()).VITE_RES_URL_CHILD;
	return defineConfig({
		server: {
			hmr: true,
			proxy: {
				'/Userapi': { // 匹配请求路径，
					target: 'https://doudian.y.netsun.com/', // 代理的目标地址
					// 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
					changeOrigin: true,
					// secure: true, // 是否https接口
					// ws: true, // 是否代理websockets

					// 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
					//简单来说，就是是否改路径 加某些东西
					// rewrite: (path) => path.replace(/^\/tqapi/, '')
				},
			}
		},
		css: {
			preprocessorOptions: {
				// 全局样式引入
				scss: {
					// 文件路径，注意最后需要添加 ';'
					additionalData: '@import "@/styles/global.scss";',
					javascriptEnabled: true
				}
			}
		},
		envDir: './src',
		resolve: {
			alias: {
				'@': path.resolve('./src'), // @代替src
			},
		},
		build: {
			rollupOptions: {
				output: {
					// 在这里修改静态资源路径
					chunkFileNames: `assets/js/[name]-[hash].js`,
					entryFileNames: `assets/js/[name]-[hash].js`,
					assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
				}
			}
		},
		// base: '/skumall',
		plugins: [
			vue(),
			// viteMockServe({
			//   mockPath: './mock', // 设置模拟.ts 文件的存储文件夹 
			// }),
			vueSetupExtend(),
			AutoImport({
				resolvers: [
					ElementPlusResolver(),
					// Auto import icon components
					// 自动导入图标组件
					IconsResolver({
						prefix: 'Icon',
					}),
				],
			}),
			Components({
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						enabledCollections: ['ep'],
					}),
				],
			}),
			Icons({
				autoInstall: true,
			}),
		],
	})

})
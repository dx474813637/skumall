// import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import {defineStore} from "pinia";
import router from "@/router/guard" 
 
// const { dynamicTitle } = defaultSettings
 
const storageSetting = JSON.parse(localStorage.getItem('storageSetting')) || ''
 
export const useSettingsStore = defineStore(
    'settings',
    {
        state: () => ({
            loginToPage: null,
            title: '',
            dynamicTitle: storageSetting.dynamicTitle === undefined ? import.meta.env.VITE_APP_TITLE : storageSetting.dynamicTitle
        }),
        actions: {
            // 设置网页标题
            setTitle(title) {
                this.title = title
                useDynamicTitle();
            },
            logout() {
                console.log('清除token 登录过期')
                localStorage.removeItem('token')
                localStorage.removeItem('login')
            },
            goLogin() {
                router.push({ name: 'login' }) 
            },
            setPrevPage(route) { 
                this.loginToPage = route 
            }, 
            loginSuccessRoute() { 
                if(this.loginToPage) {
                    router.push({ 
                        name: this.loginToPage.name, 
                        params: this.loginToPage.params 
                    })  
                } else {
                    router.push({ 
                        name: 'user_index', 
                        params: {} 
                    }) 
                }
                this.loginToPage = null
                
            }, 
        }
    })
 
// export default useSettingsStore
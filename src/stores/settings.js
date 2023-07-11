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
            goLogin() {
                router.push({ name: 'login' }) 
            },
            setPrevPage(route) { 
                console.log(route)
                if(route.name == 'login') return
                this.loginToPage = route 
            }, 
            loginSuccessRoute() { 
                if(this.loginToPage) {
                    router.push({ 
                        ...this.loginToPage
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
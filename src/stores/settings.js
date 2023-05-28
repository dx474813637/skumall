// import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import {defineStore} from "pinia";
 
// const { dynamicTitle } = defaultSettings
 
const storageSetting = JSON.parse(localStorage.getItem('storageSetting')) || ''
 
export const useSettingsStore = defineStore(
    'settings',
    {
        state: () => ({
            title: '',
            dynamicTitle: storageSetting.dynamicTitle === undefined ? import.meta.env.VITE_APP_TITLE : storageSetting.dynamicTitle
        }),
        actions: {
            // 设置网页标题
            setTitle(title) {
                this.title = title
                useDynamicTitle();
            }
        }
    })
 
// export default useSettingsStore
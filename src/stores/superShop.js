 
import {defineStore} from "pinia";
import apis from '@/apis/index'
import router from "@/router/guard"  
 
export const useSuperShopStore = defineStore(
    'superShop',
    {
        state: () => ({
            upload_platform: [],
            upload_platform_loading: false,
        }),
        actions: { 
            async getToPlatform(showGlobalShow = false) {
                this.upload_platform_loading = true
                const res = await apis.toplatform({loading: showGlobalShow});
                this.upload_platform_loading = false
                if (res.code == 1) {
                    this.upload_platform = res.list
                }
            }
        }
    }
)
 
// export default useSuperShopStore
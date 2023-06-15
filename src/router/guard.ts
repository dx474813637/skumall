import router from '@/router'
import {toRefs} from 'vue'
// 导入进度条
import { start, close } from "@/utils/nporgress";
import pinia from '@/stores/index';  
import {useSettingsStore} from '@/stores/settings'
import {useFinanceStore} from '@/stores/finance'
router.beforeEach(async (to, from, next) => {
    const useSettings = useSettingsStore(pinia)
    const finance = useFinanceStore(pinia)
    const {account_info} = toRefs(finance)
    
    start()
    // console.log(to, from)
    if(to?.meta?.isAuth && to.matched.some(ele => ele.meta.isAuth) && !localStorage.getItem('token')) {
        // router.push({ name: 'login' })
        useSettings.goLogin()
        useSettings.setPrevPage(to)
        return
    }
    else{

    }
    // if(to?.meta?.isFinanceAuth && to.matched.some(ele => ele.meta.isFinanceAuth) && !account_info.hasOwnProperty('state')) {
    //     await finance.getAccountData(true);
    //     if(account_info.value.organizations_id) { 
    //         finance.getCpyData();
    //     } 
    // }

    if(to?.meta?.title) {
        // document.title = to?.meta?.title
        useSettings.setTitle(to.meta.title)
    }
    next()
})

router.afterEach(() => {
    close()
})

export default router
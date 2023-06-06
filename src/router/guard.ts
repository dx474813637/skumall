import router from '@/router'
// 导入进度条
import { start, close } from "@/utils/nporgress";
import pinia from '@/stores/index'; 
import {useSettingsStore} from '@/stores/settings'
const useSettings = useSettingsStore(pinia)
router.beforeEach(async (to, from, next) => {
    start()
    // console.log(to, from)
    if(to?.meta?.isAuth && to.matched.some(ele => ele.meta.isAuth) && !localStorage.getItem('token')) {
        // router.push({ name: 'login' })
        useSettings.goLogin()
        useSettings.setPrevPage(to)
        return
    }
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
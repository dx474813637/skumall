import router from '@/router'
// 导入进度条
import { start, close } from "@/utils/nporgress";
import {useSettingsStore} from '@/stores/settings'
 
router.beforeEach(async (to, from, next) => {
    start()
    console.log(to, from)
    if(to?.meta?.title) {
        // document.title = to?.meta?.title
        useSettingsStore().setTitle(to.meta.title)
    }
    next()
})

router.afterEach(() => {
    close()
})

export default router
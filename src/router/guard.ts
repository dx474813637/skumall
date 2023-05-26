import router from '@/router'
// 导入进度条
import { start, close } from "@/utils/nporgress";
 
router.beforeEach(async (to, from, next) => {
    start()
    console.log(to, from)
    next()
})

router.afterEach(() => {
    close()
})

export default router
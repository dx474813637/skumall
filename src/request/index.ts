
import { createAxiosByinterceptors } from '@/request/net' 
const axios = createAxiosByinterceptors({
    // baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'appid': 10001,
        'appsecret': '66f7iMFW6859I2reEiTsm7wIZQWhevpdvu2XggRIuUnH/zEbybV1fMs',
    }
})

export default axios
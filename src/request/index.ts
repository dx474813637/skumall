
import { createAxiosByinterceptors } from '@/request/net'
const axios = createAxiosByinterceptors({
    // baseURL: import.meta.env.VITE_BASE_URL
})

export default axios
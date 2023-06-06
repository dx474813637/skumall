import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElMessage, ElLoading  } from "element-plus";
import { downloadFile, toGuid } from "@/utils"; 

import router from "@/router/guard" 
import {useSettingsStore} from '@/stores/settings'
const useSettings = useSettingsStore()
// import { ElLoadingComponent } from "element-plus";
// import vm from "@/main";  
let loadingInstance:any = null;
let requestNum = 0;

const addLoading = () => {
    // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
    requestNum++;
    if (requestNum == 1) {
        loadingInstance = ElLoading.service({
            text: "正在努力加载中....",
            background: "rgba(255,255,255,.6)",
        });
    }
};

const cancelLoading = () => {
    // 取消loading 如果pending请求数量等于0，关闭loading
    requestNum--;
    if (requestNum === 0) loadingInstance?.close();
};

//设置唯一设备标识符 
const setGuid = () => {
    let guid = localStorage.getItem('guid')
    if(!guid) {
        guid = toGuid()
        localStorage.setItem('guid', guid)
    }
    return guid
}

export const createAxiosByinterceptors = (
    config?: AxiosRequestConfig
): AxiosInstance => { 
    
    config.headers.guid = setGuid()
    const instance = axios.create({
        timeout: 1000,    //超时配置
        withCredentials: true,  //跨域携带cookie 
        // contentType: 'application/x-www-form-urlencoded',
        ...config,   // 自定义配置覆盖基本配置
    });

    // 添加请求拦截器
    instance.interceptors.request.use(
        function (config: any) {
            // 在发送请求之前做些什么
            config.headers = {
                ...config.headers, 
                token: localStorage.getItem('token'),
                login: localStorage.getItem('login'),
            } 
            const { loading = true } = config;
            // console.log("config:", config);
            // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
            if (loading) addLoading();
            return config;
        },
        function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
        function (response) {
            // 对响应数据做点什么
            // console.log("response:", response);
            // const { loading = true } = response.config;
            // if (loading) cancelLoading();
            cancelLoading();
            const { code, list, msg } = response.data;
            // config设置responseType为blob 处理文件下载 
            if (response.data instanceof Blob) {
                return downloadFile(response);
            } else {
                if (code === 1) {
                    if(response.data.hasOwnProperty('token')) {
                        localStorage.setItem('token', response.data.token)
                    }
                    if(response.data.hasOwnProperty('login')) {
                        localStorage.setItem('login', response.data.login)
                    }
                    return response.data
                }
                else if (code === 9) {
                    // jumpLogin();
                    useSettings.logout() 
                    useSettings.setPrevPage(router.currentRoute.value)
                    ElMessage.error(msg);
                    useSettings.goLogin()
                    return Promise.reject(response.data);
                } else {
                    ElMessage.error(msg);
                    return Promise.reject(response.data);
                }
            }
        },
        function (error) {
            // 对响应错误做点什么
            console.log("error-response:", error.response);
            console.log("error-config:", error.config);
            console.log("error-request:", error.request);
            const { loading = true } = error.config;
            if (loading) cancelLoading();
            if (error.response) {
                if (error.response.status === 401) {
                    // jumpLogin(); 
                    console.log('401需要登陆权限 跳登录') 
                }
            }
            ElMessage.error(error?.response?.data?.msg || "服务端异常");
            return Promise.reject(error);
        }
    );
    return instance;
};

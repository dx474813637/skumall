
import test from './test.js'
import { ElMessage } from "element-plus";
import { AxiosResponse } from "axios";

/**
 * 下载文件
 * @param response
 * @returns
 */
export const downloadFile = (response: AxiosResponse) => {
    console.log("response.data.type:", response.data.type);
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            try {
                console.log("result:", this.result);
                const jsonData = JSON.parse((this as any).result); // 成功 说明是普通对象数据
                if (jsonData?.code !== 200) {
                    ElMessage.error(jsonData?.message ?? "请求失败");
                    reject(jsonData);
                }
            } catch (err) {
                // 解析成对象失败，说明是正常的文件流
                const blob = new Blob([response.data]);
                // 本地保存文件
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                const filename = response?.headers?.["content-disposition"]
                    ?.split("filename*=")?.[1]
                    ?.substr(7);
                link.setAttribute("download", decodeURI(filename));
                document.body.appendChild(link);
                link.click();
                resolve(response.data);
            }
        };
        fileReader.readAsText(response.data);
    });
};



/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        // 原始类型直接返回
        return obj
    }
    const o = test.array(obj) ? [] : {}
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }
    return o
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
export function deepMerge(target = {}, source = {}) {
    target = deepClone(target)
    if (typeof target !== 'object' || typeof source !== 'object') return false
    for (const prop in source) {
        if (!source.hasOwnProperty(prop)) continue
        if (prop in target) {
            if (typeof target[prop] !== 'object') {
                target[prop] = source[prop]
            } else if (typeof source[prop] !== 'object') {
                target[prop] = source[prop]
            } else if (target[prop].concat && source[prop].concat) {
                target[prop] = target[prop].concat(source[prop])
            } else {
                target[prop] = deepMerge(target[prop], source[prop])
            }
        } else {
            target[prop] = source[prop]
        }
    }
    return target
}


/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export function toGuid(len = 32, firstU = true, radix = null) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length

    if (len) {
        // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
        for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        let r
        // rfc4122标准要求返回的uuid中,某些位为固定的字符
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
        uuid.shift()
        return `u${uuid.join('')}`
    }
    return uuid.join('')
}

export function exchangeRegionalData(keyname, origin) {
    let arr = deepClone(origin[keyname]).map(ele => ({ label: ele.name, value: ele.code }));
    arr.forEach(ele => {
        let key = 'items' + ele.value
        let item = origin[key]
        if (item) {
            ele.children = exchangeRegionalData(key, origin)
        }
    });

    return arr

}


export function isObjectEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (let key of obj1Keys) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}


/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
export function timeFormat(dateTime = null, formatStr = 'yyyy-mm-dd') {
    let date
    // 若传入时间为假值，则取当前时间
    if (!dateTime) {
        date = new Date()
    }
    // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
    else if (/^\d{10}$/.test(dateTime.toString().trim())) {
        date = new Date(dateTime * 1000)
    }
    // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
    else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
        date = new Date(Number(dateTime))
    }
    // 其他都认为符合 RFC 2822 规范
    else {
        // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
        date = new Date(
            typeof dateTime === 'string'
                ? dateTime.replace(/-/g, '/')
                : dateTime
        )
    }

    const timeSource = {
        'y': date.getFullYear().toString(), // 年
        'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
        'd': date.getDate().toString().padStart(2, '0'), // 日
        'h': date.getHours().toString().padStart(2, '0'), // 时
        'M': date.getMinutes().toString().padStart(2, '0'), // 分
        's': date.getSeconds().toString().padStart(2, '0') // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }

    for (const key in timeSource) {
        const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
        if (ret) {
            // 年可能只需展示两位
            const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
            formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
        }
    }

    return formatStr
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format 
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
export function timeFrom(timestamp:any = null, format:any = 'yyyy-mm-dd') {
    if (timestamp == null) timestamp = Number(new Date())
    timestamp = parseInt(timestamp)
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000
    let timer = (new Date()).getTime() - timestamp
    timer = parseInt(timer / 1000) 
    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = ''
    switch (true) {
        case timer < 300:
            tips = '刚刚'
            break
        case timer >= 300 && timer < 3600:
            tips = `${parseInt(timer / 60)}分钟前`
            break
        case timer >= 3600 && timer < 86400:
            tips = `${parseInt(timer / 3600)}小时前`
            break
        case timer >= 86400 && timer < 2592000:
            tips = `${parseInt(timer / 86400)}天前`
            break
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = `${parseInt(timer / (86400 * 30))}个月前`
                } else {
                    tips = `${parseInt(timer / (86400 * 365))}年前`
                }
            } else {
                tips = timeFormat(timestamp, format)
            }
    }
    return tips
}

export function isNumber (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}
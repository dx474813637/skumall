// spec_prices的格式
// [
//     {
//         "sku": {
//             "颜色": "红色",
//             "尺码": "S"
//         },
//         "img": "图片地址",
//         "stock": 11,
//         "price": 100,
//     },
//     {
//         "sku": {
//             "颜色": "红色",
//             "尺码": "M"
//         },
//         "img": "图片地址",
//         "stock": 12,
//         "price": 120,
//     }
// ]
import {deepClone} from '@/utils/index';
export default function toSpecPrices(Spec: any, index: any, SpecPrices: any, result: any) { 
    for (var i = 0; i < Spec[index].length; i++) { 
        result[Spec[index][i].title] = Spec[index][i].value 
        let keyArr = `${Spec[index][i].parentKey},${Spec[index][i].key}`
        if(result.hasOwnProperty('keys')) {
            result.keys[index] = keyArr
        }else {
            result.keys = [keyArr]
        }
        if(Spec[index][i].hasOwnProperty('filesList')) {
            result.filesList = Spec[index][i].filesList
        }

        if (index != Spec.length - 1) { 
            SpecPrices = toSpecPrices(Spec, index + 1, SpecPrices, result)
        } else {   
            SpecPrices.push(deepClone(result))
        } 
    }  
    return SpecPrices
}
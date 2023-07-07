export enum NotifyMessageType {
    OUTSIDE = 'outside',
    DISTRIBUTION = 'distribution'
}
export type Lifecycle = 'ready' | 'destroyed'

/**
 * cmd: 统一使用 notify
 * target: 由铺货项目向外发送则使用 outside , 接受消息 distribution
 * from: 外部向铺货发消息 outside , 铺货向外部发消息 distribution
 * data: 传输数据
 */
export const send = (params: { [propsname: string]: any } = {}) => { 
    window.parent.postMessage(
        {
            cmd: 'notify',
            target: NotifyMessageType.OUTSIDE,
            from: NotifyMessageType.DISTRIBUTION,
            hash: location.hash.replace('#', ''),
            data: {
                ...params
            }
        },
        '*'
    )
}

// // 项目销毁消息发送示例
// send({ lifecycle: 'destroyed' })

// //项目就绪消息发送示例
// send({ lifecycle: 'ready' })

// // 铺货成功
// send({ distribution: true })

// // 铺货想要唤起浏览器
// send({ openBrowser: '目标网页地址' })

// // 唤起设置
// send({ popupDistributionSetting: true })
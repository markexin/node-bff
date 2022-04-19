import { Schema, model } from 'mongoose'

const interfaceSchema = new Schema({
    /**
     * 规则地址
     */
    path: {
        type: String,
        required: true
    },

    /**
     * 所属域名ID
     */
    originId: {
        type: Schema.Types.ObjectId,
        ref: 'origin'
    },

    /**
     * 转发类型
     */
    type: {
        type: Number,
        required: true
    },

    /**
     * 转发域名
     */
    origin: {
        type: String,
        required: true
    },

    /**
     * 根路径
     */
    rootPath: {
        type: String,
        required: true
    },

    /**
     * 端口
     */
    port: {
        type: Number,
    },
    
    /**
     * ipv4
     */
    ipv4: {
        type: String,
    },

    /**
     * ipv6
     */
    ipv6: {
        type: String,
    },

    /**
     * 代理请求头
     */
    proxySetHeader: {
        type: String,
    },

    /**
     * 代理地址
     */
    proxyPass: {
        type: String,
    },

    /**
     * 状态
     */
    status: {
        type: String,
        required: true
    },

    /**
     * 更新时间
     */
    updateTime: {
        type: Date,
        default: Date.now
    },

    /**
     * 操作人
     */
    updater: {
        type: String
    }
})

export default interfaceSchema;

export type InterfaceSchemaType = typeof interfaceSchema;

export const InterfaceModel = model('interface', interfaceSchema, 'interfaces');



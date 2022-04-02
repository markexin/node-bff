import { Schema, model } from 'mongoose'

const interfaceSchema = new Schema({
    /**
     * 接口地址
     */
    apiPath: {
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
      * 状态
      */
      status: {
        type: Number,
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


export const InterfaceModel = model('interface', interfaceSchema, 'interfaces');



import { Schema, model } from 'mongoose'

const originSchema = new Schema({
    /**
     * 域名地址
     */
    originPath: {
        type: String,
        required: true
    },

    /**
     * 所属项目ID
     */
     projectId: {
         type: Schema.Types.ObjectId,
         ref: 'project'
     },

     /**
      * 更新时间
      */
     updateTime: {
         type: Date,
         default: Date.now
     },

     /**
      * 协议
      */
      protocol: {
          type: String,
      },

      /**
        * 环境
        */
       environment: {
        type: String,
      },

     /**
      * 操作人
      */
     updater: {
        type: String
     }
})

export default originSchema;


export const OriginModel = model('origin', originSchema, 'origins');



import { Schema, model } from 'mongoose'

const projectSchema = new Schema({
    /**
     * 项目名称
     */
    projectName: {
        type: String,
        required: true
    },

    /**
     * 项目描述
     */
     projectDesc: {
         type: String
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

export default projectSchema;

export const ProjectModel = model('project', projectSchema, 'projects');
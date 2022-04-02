/**
 * 项目管理
 */

import { Context } from 'koa'
import { model } from 'mongoose'
import { HttpMethod, route } from '../../utils/router-decorator'
import { ProjectModel } from '../schemas/project'

 @route('/project')
 export default class ProjectCtrl {

  // 查询
   @route('/list', HttpMethod.GET)
   async list(ctx: Context) {
    const { page = 0, pageSize = 10, query = '' } = ctx.request.query;
    const res = await ProjectModel.find({
      // TODO:类型优化
      projectName: new RegExp(query as any)
    })
    .skip(+page * +pageSize)
    .limit(+pageSize)
    .sort({'_id':-1});
    ctx.body = {
      code: 0,
      data: res,
      msg: "查询成功~"
    };
   }

  //  查询详情
   @route('/detail', HttpMethod.GET)
   async detail(ctx: Context) {
    const { id = '' } = ctx.request.query;
    const res = await ProjectModel.findById(id)
    ctx.body = {
      code: 0,
      data: res,
      msg: "查询成功~"
    };
   }

   // 增加
   @route('/create', HttpMethod.POST)
   async create(ctx: Context) {
     const { projectName, projectDesc } = ctx.request.body;
     if (!projectName) {
      return ctx.body = {
        code: -1,
        data: {},
        msg: "缺少参数：projectName"
      };
     }
     // todo: 修改人
     const project = new ProjectModel({
      projectName,
      projectDesc,
      updater: '未知'
     })
     try {
      const res = await project.save();
      ctx.body = {
        code: 0,
        data: res,
        msg: "创建成功~"
      };
     } catch (error) {
      ctx.body = {
        code: 0,
        data: {},
        msg: "创建失败，数据库保存异常~"
      };
     }
   }

   // 修改
   @route('/update', HttpMethod.PUT)
   async update(ctx: Context) {
    const { id, projectName, projectDesc } = ctx.request.body;
    if (!id) {
      return ctx.body = {
        code: -1,
        data: {},
        msg: "缺少参数：id"
      };
     }
     try {
       // todo: 修改人
      const res = await ProjectModel.findByIdAndUpdate(id, {
        projectName,
        projectDesc,
      });
      ctx.body = {
        code: 0,
        data: res,
        msg: "修改成功~"
      };
     } catch (error: any) {
      ctx.body = {
        code: 0,
        data: {},
        msg: error && error.message
      };
     }
   }

   // 删除
   @route('/delete/:id', HttpMethod.DELETE)
   async delete(ctx: Context) {
     const { id } = ctx.params;
     if (!id) {
      return ctx.body = {
        code: -1,
        data: {},
        msg: "缺少参数：id"
      };
     }
     try {
      const res = await ProjectModel.findByIdAndDelete(id);
      ctx.body = {
         code: 0,
         data: res,
         msg: "删除成功~"
       };
     } catch (error: any) {
      ctx.body = {
        code: 0,
        data: {},
        msg: error && error.message
      };
     }
   }
 }
/**
 * 项目管理
 */
import { Context } from 'koa'
import { model } from 'mongoose'
import { HttpMethod, route } from '../../utils/router-decorator'
import { OriginModel } from '../schemas/origin'

 @route('/origin')
 export default class OriginCtrl {

  // 查询
   @route('/list', HttpMethod.GET)
   async list(ctx: Context) {
    const { page = 0, pageSize = 10, query = '' } = ctx.request.query;
    const res = await OriginModel.find({
      originPath: new RegExp(query as any)
    })
    .populate('projectId', 'projectName')
    .skip(+page * +pageSize)
    .limit(+pageSize)
    .sort({'_id':-1})
    .transform(function (doc) {
      const res: any = []
      doc.forEach(item => {
        res.push({
          _id: item._id,
          originPath: item.originPath,
          updater: item.updater,
          updateTime: item.updateTime,
          environment: item.environment,
          projectName: item.projectId && item.projectId.projectName,
        })
      })
      return res;
    })
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
    const res = await OriginModel.findById(id)
    ctx.body = {
      code: 0,
      data: res,
      msg: "查询成功~"
    };
   }

   // 增加
   @route('/create', HttpMethod.POST)
   async create(ctx: Context) {
     const { originPath, projectId, protocol, environment } = ctx.request.body;
     if (!projectId || !originPath) {
      return ctx.body = {
        code: -1,
        data: {},
        msg: "缺少参数"
      };
     }
     // todo: 修改人
     const origin = new OriginModel({
      originPath,
      projectId,
      protocol, 
      environment,
      updater: '未知'
     })
     try {
      const res = await origin.save();
      ctx.body = {
        code: 0,
        data: res,
        msg: "创建成功~"
      };
     } catch (error) {
       console.log(error);
      ctx.body = {
        code: -1,
        data: {},
        msg: "创建失败，数据库保存异常~"
      };
     }
   }

   // 修改
   @route('/update', HttpMethod.PUT)
   async update(ctx: Context) {
    const { id, projectId, originPath } = ctx.request.body;
    if (!projectId || !originPath) {
      return ctx.body = {
        code: -1,
        data: {},
        msg: "缺少参数"
      };
     }
     try {
       // todo: 修改人
      const res = await OriginModel.findByIdAndUpdate(id, {
        projectId,
        originPath,
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
      const res = await OriginModel.findByIdAndDelete(id);
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
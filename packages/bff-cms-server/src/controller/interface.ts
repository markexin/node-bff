/**
 * 项目管理
 */
 import { Context } from 'koa'
 import { HttpMethod, route } from '../../utils/router-decorator'
 import { InterfaceModel } from '../schemas/interface'
 
  @route('/interface')
  export default class InterfaceCtrl {
 
   // 查询
    @route('/list', HttpMethod.GET)
    async list(ctx: Context) {
     const { page = 0, pageSize = 10, query = '' } = ctx.request.query;
     const res = await InterfaceModel.find({
        apiPath: new RegExp(query as any)
     })
     .populate('originId', 'originPath')
     .skip(+page * +pageSize)
     .limit(+pageSize)
     .sort({'_id':-1})
     .transform(function (doc) {
       const res: any = []
       doc.forEach(item => {
         res.push({
          originName: item.originId && item.originId.originPath,
          ...item._doc
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
 
    // //  查询详情
    // @route('/detail', HttpMethod.GET)
    // async detail(ctx: Context) {
    //  const { id = '' } = ctx.request.query;
    //  const res = await OriginModel.findById(id)
    //  ctx.body = {
    //    code: 0,
    //    data: res,
    //    msg: "查询成功~"
    //  };
    // }
 
    // 增加
    @route('/create', HttpMethod.POST)
    async create(ctx: Context) {
      const { apiPath, originId, type, status } = ctx.request.body;
      if (!apiPath) {
       return ctx.body = {
         code: -1,
         data: {},
         msg: "缺少参数"
       };
      }
      // todo: 修改人
      const interfaces = new InterfaceModel({
        apiPath,
        originId,
        type,
        status,
        updater: '未知'
      })
      try {
       const res = await interfaces.save();
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
 
    // // 修改
    // @route('/update', HttpMethod.PUT)
    // async update(ctx: Context) {
    //  const { id, projectId, originPath } = ctx.request.body;
    //  if (!projectId || !originPath) {
    //    return ctx.body = {
    //      code: -1,
    //      data: {},
    //      msg: "缺少参数"
    //    };
    //   }
    //   try {
    //     // todo: 修改人
    //    const res = await OriginModel.findByIdAndUpdate(id, {
    //      projectId,
    //      originPath,
    //    });
    //    ctx.body = {
    //      code: 0,
    //      data: res,
    //      msg: "修改成功~"
    //    };
    //   } catch (error: any) {
    //    ctx.body = {
    //      code: 0,
    //      data: {},
    //      msg: error && error.message
    //    };
    //   }
    // }
 
    // // 删除
    // @route('/delete/:id', HttpMethod.DELETE)
    // async delete(ctx: Context) {
    //   const { id } = ctx.params;
    //   if (!id) {
    //    return ctx.body = {
    //      code: -1,
    //      data: {},
    //      msg: "缺少参数：id"
    //    };
    //   }
    //   try {
    //    const res = await OriginModel.findByIdAndDelete(id);
    //    ctx.body = {
    //       code: 0,
    //       data: res,
    //       msg: "删除成功~"
    //     };
    //   } catch (error: any) {
    //    ctx.body = {
    //      code: 0,
    //      data: {},
    //      msg: error && error.message
    //    };
    //   }
    // }
  }
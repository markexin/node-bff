/**
 * 项目管理
 */
 import { Context } from 'koa'
//  import * as fetch from 'node-fetch'
 import { HttpMethod, route } from '../../utils/router-decorator'
 import { InterfaceModel, InterfaceSchemaType } from '../schemas/interface'
 import { spawn } from 'child_process'
 import { NGINX_BIN_PATH } from '../../config/config'

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
      const params: InterfaceSchemaType = ctx.request.body;
      if (!params.path) {
       return ctx.body = {
         code: -1,
         data: {},
         msg: "缺少参数"
       };
      }
      // todo: 修改人
      const interfaces = new InterfaceModel({
        updater: '未知',
        status: 'offline',
        ...params,
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
       const res = await InterfaceModel.findByIdAndDelete(id);
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

    // 测试请求
    @route('/test/api', HttpMethod.POST)
    async test(ctx: Context) {
      const params = ctx.request.body;
      if (!params.apiPath || !params.method) {
       return ctx.body = {
         code: -1,
         data: {},
         msg: "缺少参数"
       };
      }
      try {
        // const response = await fetch(params.apiPath, {
        //   method: params.method, 
        //   body: params.bodyContent
        // });
        // const data = await response.json();
        // ctx.body = {
        //   code: 0,
        //   data: data,
        //   msg: 'success'
        // };
      } catch (error: any) {
       ctx.body = {
         code: 0,
         data: {},
         msg: error && error.message
       };
      }
    }

    // 检查nginx配置
   @route('/check/nginx', HttpMethod.GET)
   async check(ctx: Context) {

    const std = async () => new Promise(function (resolve) {
      const nginx = spawn(`${NGINX_BIN_PATH}/nginx`, ['-t']);
      const res: string[] = [];
      nginx.stdout.on('data', (data) => {
        res.push(`${data}`);
      })
      nginx.stderr.on('data', (data) => {
        res.push(`${data}`);
      })
      nginx.on('close', (code) => {
        resolve(res);
      })
    })

    try {
      const res: any = await std() || [];
      if (res[1].includes('successful')) {
        ctx.body = {
          code: 0,
          data: await std(),
          msg: "检验成功~"
        };
      } else {
        ctx.body = {
          code: -1,
          data: await std(),
          msg: "检验失败~"
        };
      }
    } catch (error: any) {
      ctx.body = {
        code: -1,
        data: {},
        msg: error && error.message
      }; 
    }
    
    //  const { id } = ctx.params;
    //  if (!id) {
    //   return ctx.body = {
    //     code: -1,
    //     data: {},
    //     msg: "缺少参数：id"
    //   };
    //  }
    //  try {
    //   const res = await ProjectModel.findByIdAndDelete(id);
    //   ctx.body = {
    //      code: 0,
    //      data: res,
    //      msg: "删除成功~"
    //    };
    //  } catch (error: any) {
    //   ctx.body = {
    //     code: 0,
    //     data: {},
    //     msg: error && error.message
    //   };
    //  }
   }
  }
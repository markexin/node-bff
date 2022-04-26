import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import { handleErr } from './utils/error-handler'
import { load } from './utils/router-decorator'
import mongoose from 'mongoose'
import { MONGODB_CONFIG } from './config/config';

// 抓取全局异常
process.on('uncaughtException', function (err) {
    handleErr(err, 'caught_by_uncaughtException');
    throw err;
});

// 抓取异步异常
process.on('unhandledRejection', function (err) {
    handleErr(err, 'caught_by_unhandledRejection');
});

const app = new Koa();
const apiRouter = load(path.resolve(__dirname, './src/controller'), '.ts');

apiRouter.prefix('/api');
app.use(bodyParser());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

async function start () {
    try {
        // 数据链路
        await mongoose.connect(MONGODB_CONFIG);
    } catch (error) {
        console.log(error);
    }
    app.listen(3001);
}

start();
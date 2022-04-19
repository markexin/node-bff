import Koa from 'koa'
import path from 'path'
import http from 'http'
// import wss from './utils/ws';
import bodyParser from 'koa-bodyparser'
import { handleErr } from './utils/error-handler'
import { load } from './utils/router-decorator'
import mongoose from 'mongoose'
import config from './src/config/staging';


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
        await mongoose.connect(config.mongodbConfig);
        // socket链路
        // await new wss(server);
    } catch (error) {
        console.log(error);
    }
    app.listen(3001);
}

start();


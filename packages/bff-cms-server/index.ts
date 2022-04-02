import Koa, { Context } from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import { load } from './utils/router-decorator'
import mongoose from 'mongoose'
import config from './src/config/staging';


const app = new Koa();
const apiRouter = load(path.resolve(__dirname, './src/controller'), '.ts');

apiRouter.prefix('/api');

app.use(bodyParser());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

async function start () {
    try {
        await mongoose.connect(config.mongodbConfig);
        console.log("--- 数据库连接成功！---");
    } catch (error) {
        console.log(error);
    }
    app.listen(3001);
}

start();


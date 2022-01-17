import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import { dbSync } from './middleware/db';


const { MONGO_URI } = JSON.parse(fs.readFileSync(
  path
  .resolve(__dirname, `../env/.env.${process.env.ENV_NAME}`)
).toString());

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

dbSync(MONGO_URI).then(async () => {
  console.log('=====>>> mongoDb 建立连接 <<<======');
  await app.listen(3000);
  console.log('=====>>> bff-proxy 服务启动， 端口：3000 <<<======');
});


// const exitHandler = () => {
//   if (server) {
//     server.close(() => {
//       console.info('Server closed');
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// };

// const unexpectedErrorHandler = (error: Error) => {
//   console.error(error);
//   exitHandler();
// };

// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', (reason) => {
//   console.error(reason);
// });

// process.on('SIGTERM', () => {
//   console.info('SIGTERM received');
//   if (server) {
//     server.close();
//   }
// });


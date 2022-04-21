const  { WebSocketServer } = require('ws');
const gatherOsMetrics = require('./gather-os-metrics');

let io;

module.exports = (server, config) => {
  if (io === null || io === undefined) {
    if (config.websocket !== null) {
      io = config.websocket;
    } else {
      io = new WebSocketServer({
        server
      });
    }
    let interval;
    // 收到来自客户端的连接请求后，开始给客户端推消息
    io.on('connection', socket => {
      console.log("----客户端建立socket连接----");
      socket.on('message', function message(data) {
        console.log('received: %s', data);
      });
      if (interval) {
        clearInterval(interval);
      }
      // 轮询上报
      interval = setInterval(() => gatherOsMetrics(socket, config), config.socketInterval * 1000);
    });
  }
};
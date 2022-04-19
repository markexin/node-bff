const  { WebSocketServer } = require('ws');
const gatherOsMetrics = require('./gather-os-metrics');

let io;

const addSocketEvents = (socket, config) => {
  socket.emit('esm_start', config.spans);
  socket.on('esm_change', () => {
    socket.emit('esm_start', config.spans);
  });
};

module.exports = (server, config) => {
  if (io === null || io === undefined) {
    if (config.websocket !== null) {
      io = config.websocket;
    } else {
      io = new WebSocketServer({
        server
      });
    }

    io.on('connection', socket => {
      if (config.authorize) {
        // config
        //   .authorize(socket)
        //   .then(authorized => {
        //     if (!authorized) socket.disconnect('unauthorized');
        //     else addSocketEvents(socket, config);
        //   })
        //   .catch(() => socket.disconnect('unauthorized'));
      } else {
        addSocketEvents(socket, config);
      }
    });

    // 轮询上报
    const interval = setInterval(() => gatherOsMetrics(io, config), config.socketInterval * 1000);
    // Don't keep Node.js process up
    // interval.unref();

    // config.spans.forEach(span => {
    //   span.os = [];
    //   span.responses = [];
    //   const interval = setInterval(() => gatherOsMetrics(io, span), span.interval * 1000);

    //   // Don't keep Node.js process up
    //   interval.unref();
    // });
  }
};
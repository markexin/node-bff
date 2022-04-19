const pidusage = require('pidusage');
const os = require('os');
const v8 = require('v8');
const debug = require('debug')('express-status-monitor');

let eventLoopStats; // eslint-disable-line

try {
  eventLoopStats = require('event-loop-stats'); // eslint-disable-line
} catch (error) {
  console.warn('event-loop-stats not found, ignoring event loop metrics...');
}

module.exports = (io, config) => {
  const defaultResponse = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    count: 0,
    mean: 0,
    timestamp: Date.now(),
  };

  pidusage(process.pid, (err, stat) => {
    if (err) {
      debug(err);
      return;
    }

    // Convert from B to MB
    stat.memory = stat.memory / 1024 / 1024;
    stat.load = os.loadavg();
    stat.timestamp = Date.now();
    stat.heap = v8.getHeapStatistics();

    if (eventLoopStats) {
      stat.loop = eventLoopStats.sense();
    }

    if ((stat.timestamp + config.socketRetention) * 1000 < Date.now()) {
      stat = defaultResponse;
    }

    // socket emit
    io.emit('esm_stats', stat);
  });
};

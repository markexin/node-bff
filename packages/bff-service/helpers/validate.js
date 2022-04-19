const defaultConfig = require('./default-config');

module.exports = config => {
  if (!config) {
    return defaultConfig;
  }

  const mungeChartVisibility = configChartVisibility => {
    Object.keys(defaultConfig.chartVisibility).forEach(key => {
      if (configChartVisibility[key] === false) {
        defaultConfig.chartVisibility[key] = false;
      }
    });
    return defaultConfig.chartVisibility;
  };

  config.title =
    typeof config.title === 'string' ? config.title : defaultConfig.title;
  config.theme =
    typeof config.theme === 'string' ? config.theme : defaultConfig.theme;
  config.socketInterval =
    typeof config.socketInterval === 'number' ? config.socketInterval : defaultConfig.socketInterval;
  config.socketRetention =
    typeof config.socketRetention === 'number' ? config.socketRetention : defaultConfig.socketRetention;
  config.path =
    typeof config.path === 'string' ? config.path : defaultConfig.path;
  config.socketPath =
    typeof config.socketPath === 'string' ? config.socketPath : defaultConfig.socketPath;
  config.port =
    typeof config.port === 'number' ? config.port : defaultConfig.port;
  config.websocket =
    typeof config.websocket === 'object'
      ? config.websocket
      : defaultConfig.websocket;
  config.iframe =
    typeof config.iframe === 'boolean' ? config.iframe : defaultConfig.iframe;
  config.chartVisibility =
    typeof config.chartVisibility === 'object'
      ? mungeChartVisibility(config.chartVisibility)
      : defaultConfig.chartVisibility;
  config.ignoreStartsWith =
    typeof config.path === 'string'
      ? config.ignoreStartsWith
      : defaultConfig.ignoreStartsWith;

  config.healthChecks =
    Array.isArray(config.healthChecks)
      ? config.healthChecks
      : defaultConfig.healthChecks

  return config;
};

/**
 * nginx语言转换码表
 */

export default {
  // 域名
  origin: (params) => `server_name ${params};`,
  // 路径
  path: (params) => `root ${params};`,
  // 端口
  port: (params) => params,
  // ipv4
  ipv4: (port, ipv4) => `listen ${ipv4}:${port};`,
  // ipv6
  ipv6: (port, ipv6) => `listen [${ipv6}]:${port};`,
  // 代理地址
  proxyPassPath: (params) => `location ${params}`,
  // proxy header
  proxySetHeader: (params) => `proxy_set_header Host ${params}`,
  // proxy pass
  proxyPass: (params) => `proxy_pass ${params}`,
};

// 系统环境变量配置
const config = {
  development: {
    // env: 'dev',
    // hostname: '/api',
    // hostname: 'http://cloud.elianzhixiao.com/gateway',
    hostname: 'https://test.elianzhixiao.com/gateway',
    appid: 'dingoapa6ivd43fecgt9qr'
  },
  test: {
    env: 'test',
    hostname: 'https://test.elianzhixiao.com/gateway',
    appid: 'dingoapa6ivd43fecgt9qr'
  },
  production: {
    env: 'prod',
    hostname: 'http://cloud.elianzhixiao.com/gateway',
    appid: 'dingoawxabnhmeojpfn3yw'
  }
}
export default config[process.env.NODE_ENV || 'development']

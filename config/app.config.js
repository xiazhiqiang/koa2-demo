/**
 * 测试环境的配置内容
 */
const testConfig = {
  env: "test",        //环境名称
  port: 3002,         //服务端口号
  mongodb_url: "",    //数据库地址
  redis_url: "",      //redis地址
  redis_port: ""      //redis端口号
};

/**
 * 开发环境的配置内容
 */
const devConfig = {
  env: "dev",         //环境名称
  ip: "127.0.0.1",    //IP
  port: 3001,         //服务端口号
  mongodb_url: "",    //数据库地址
  redis_url: "",      //redis地址
  redis_port: "",     //redis端口号
  mysql: {
    host: "localhost",
    username: "koa2",
    password: "123456",
    database: "koa2"
  },
  webpack: {
    publicPath: "/build",
    devserver: {
      port: 6003
    }
  }
};

/**
 * 预发环境配置
 * @type {{}}
 */
const preConfig = {
  env: "pre",
  port: 6001,
  mysql: {
    host: "localhost",
    username: "koa2",
    password: "123456",
    database: "koa2"
  },
  webpack: {
    publicPath: "/build"
  }
};

/**
 * 生产环境配置
 */
const prdConfig = {
  env: "production",
  port: 6001,
  mysql: {
    host: "localhost",
    username: "koa2",
    password: "123456",
    database: "koa2"
  },
  webpack: {
    publicPath: "/build"
  }
};

const configMap = {
  // 开发环境
  dev: devConfig,
  develop: devConfig,

  // 预发环境
  pre: preConfig,

  // 测试环境
  test: testConfig,

  // 生产环境
  prd: prdConfig,
  production: prdConfig
};

//根据不同的NODE_ENV，输出不同的配置对象，默认输出prd的配置对象
const env = process.env.NODE_ENV || "prd";
const config = configMap[env];

// 透传到view模板
config.viewOptions = {
  // 设置资源路径
  staticPath: env === "dev"
    ? "http://127.0.0.1:" + config.webpack.devserver.port + config.webpack.publicPath + "/"
    : "",
  title: "Demo",
  link: []
};

module.exports = config;

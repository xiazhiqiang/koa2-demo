module.exports = {
  apps: [{
    name: "koa2",
    script: "./bin/www",
    watch: true,
    instances: 1,
    exec_mode: "cluster",
    env_dev: {
      "NODE_ENV": "dev"
    },
    env_pro: {
      "NODE_ENV": "pro"
    },
    env_test: {
      "NODE_ENV": "test"
    }
  }]
}
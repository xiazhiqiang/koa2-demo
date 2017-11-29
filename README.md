# 文档

## 项目说明

本项目利用Koa2+Webpack+React+Mysql进行项目开发和部署，旨在学习+实践+创新。

本项目后期改进点：

- Node和前端结合，MVC实践
- 加入ssr服务端渲染
- 利用gulp或grunt进行任务管理
- 优化项目初始化操作，配套脚手架

## 项目使用

> koa2对node版本有要求，本项目开发使用node>=7.6.0

```shell
# 初始化项目
git clone [gitRepo]
cd koa2-demo
npm i

# 本地开发
npm run hot-start
npm run dev-build
```
**其他脚本用法详见package.json script**

- 本地开发访问：http://127.0.0.1:3001/
- 修改不同环境的配置：app/config/app.config.js

## 项目目录

- app：应用目录
  - controllers：控制器目录
  - lib：扩展类目录
  - middleware：中间件目录
  - models：数据模型层目录
  - routers：路由
    - api.js：API路由汇总
    - index.js：除API外的所有页面路由汇总
    - home.js：home控制器的路由
    - test.js：test控制器的路由
  - services：业务层逻辑目录
  - sql：数据库操作相关文件目录
  - utils：通用工具 
  - views：视图
    - entry：webpack入口文件目录
    - layout：视图layout
    - test：test控制器对应的test页面视图目录
      - components：test页面的组件目录
      - container：React入口APP文件目录
      - index.ejs：基于ejs的页面视图
  - app.js：应用脚本
- bin：运行脚本目录
  - www：启动脚本
- build：编译后的静态资源路径
- config：配置目录
- log：日志目录
- public：静态文件目录
- test：测试脚本目录
- webpack：webpack配置目录，包含不同环境的webpack配置
- .editorconfig：编辑器配置，规范团队协作中不同编辑器的差异
- .gitignore：git忽略文件/目录
- gulpfile.js：gulp配置
- package.json：应用包依赖管理
- README.md

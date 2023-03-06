
平台简介
本仓库为前端技术栈 Vue3 + Element Plus + Vite 版本。
配套后端代码servers文件夹中。
前端技术栈（Vue2 + Element + Vue CLI），请移步RuoYi-Vue。
本仓库基于若依vue3前端框架用guiplan转可视化之后二次开发，配合自己的koa2 + mongodb 实现前后端分离。再次感谢若依团队。
配合guiplan软件，可以实现前端可视化开发，以及后端接口的可视化配置。自动生成前后端所有代码。
## 一.前端运行

```shell

# 克隆项目
git clone https://gitee.com/zhoushuigui/koajs-admin.git

# 进入项目目录
cd koajs-admin

# 安装依赖
yarn --registry=https://registry.npmmirror.com

# 启动服务
yarn dev

# 构建测试环境 yarn build:stage
# 构建生产环境 yarn build:prod
# 前端访问地址 http://localhost:3000

```

### 内置功能
用户管理：用户是系统操作者，该功能主要完成系统用户配置。
部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
岗位管理：配置系统用户所属担任职务。
菜单管理：配置系统菜单，操作权限，按钮权限标识等。
角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
字典管理：对系统中经常使用的一些较为固定的数据进行维护。
登录日志：系统登录日志记录查询包含登录异常。

## 一.后端步骤

### 1.安装后端插件

```shell

#打开这个servers文件夹目录，然后输入以下命令即可安装

npm install

```

### 2.启动后端服务

```sh
#后端服务启动需要nodemon插件支持，nodemon插件作用是每次修改后端代码即可自动重启后端服务。 可用以下命令全局安装nodemon npm install nodemon -g 启动后端服务输入以下命令 npm run dev

nodemon npm install nodemon -g

npm run dev
```

### 3.数据库连接配置

在.env文件夹中可以修改各种配置
详情请看以下注释:

```js

NODE_ENV=dev
SERVER_PORT=8086   // 服务端口号
DB_HOST=localhost  // 数据库地址
DB_NAME=koaadmin  // 数据库名称
DB_USER=   // 数据库用户名，无需密码登录可不填写
DB_PASSWORD= // 数据库密码  无需密码登录可不填写
DB_PORT=27017   // 数据库端口号
JWT_SECRET=245509608@qq.com // jwt校验码
JWT_EXPIRE=7d // jwt校验，目前用于登录的过期时间，d为天  7d则表示登录有效期为7天
STATIC_PATH=statics // 服务器静态资源地址
AUTH=HSKAHDJSODURUEE // 加密密钥，不同的项目可设置不同的加密方式
```

### 4.后端打包

```shell

# 很多node环境下的框架如：express,koa等都没考虑服务器部署问题，所以本人用webpack将后端代码打包也配置好了，开箱即用。注意要安装webpack。 servers文件夹输入打包命令为
webpack --config webpack.config.js
# .env.production 文件即可配置打包之后的数据库等配置信息。比如服务器的数据需要输入密码，本地的不需要密码，只需.evn与.env.production分别修改区分即可。
```

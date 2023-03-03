const dotenv = require('dotenv')

const koa = require('koa')
const mongoSanitize = require('koa-mongo-sanitize');
const path = require('path')

if(process.env.NODE_ENV == 'production'){ // 生产环境用另一个配置
	dotenv.config({ path: path.join(__dirname, '/.env.' + process.env.NODE_ENV) })
}else{
	dotenv.config()
}

const router = require('./router')
const routerWebsite = require('./router/website.js')
const routerApp = require('./router/appsite.js')
const accessLogMiddleware = require('./middleware/accessLogMiddleware')
const logger = require('./logger')
const koaBody = require('koa-body');
const koaValidate = require('koa-async-validator')
const app = new koa()
const koaStatic = require('koa-static')
const config = require('./config')
const session = require('koa-session');
const render = require('koa-art-template');
const moment = require('moment')


app.keys = ['sessionkoaadmin'];
const CONFIG = {
	key: 'koa:sessionkoaadmin',   //cookie key (default is koa:sess)
	maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
	overwrite: true,  //是否可以overwrite    (默认default true)
	httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
	signed: true,   //签名默认true
	rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
	renew: false,  //(boolean) renew session when session is nearly expired,
 }

 
 let rootPaht = ''
 if(process.env.NODE_ENV == 'production'){
	rootPaht = path.join(__dirname,'./', config.static.path,'view')
 }else{
	rootPaht = path.join(__dirname,'../', config.static.path,'view')
 }
 logger.info("当前环境为" + process.env.NODE_ENV)
 logger.info("地址~~：" + rootPaht)

render(app, {
  root: rootPaht,
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production',
  dateFormat:dateFormat=(value)=>{
	return moment(value).format('YYYY-MM-DD HH:mm');
 }
});
let staticPath = ''
if(process.env.NODE_ENV == 'production'){
	staticPath = path.join(__dirname,'./', config.static.path)
 }else{
	staticPath = path.join(__dirname,'../', config.static.path)
 }
app.use(session(CONFIG, app))
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*") // 允许跨域访问
  ctx.set("Access-Control-Allow-Headers", "authorization,content-type,token,identify") // 允许自定义头跨域访问
  await next()
})
// .use(async function (ctx) {
  // await ctx.render('user');
// })
.use(koaStatic(staticPath))
.use(koaBody({multipart:true , formidable:{keepExtensions:true}})) // 静态文件注意：地址后面不需要再带上admin
.use(mongoSanitize())
.use(koaValidate())
.use(accessLogMiddleware)
.use(routerWebsite.routes())
.use(routerApp.routes())
.use(routerApp.allowedMethods())
.use(router.routes())
.use(router.allowedMethods()) // 使用路由
const run = (port) =>{ // 监听端口并开启服务
	logger.info("启动完成" + port)
	return app.listen(port)
}
module.exports =  run
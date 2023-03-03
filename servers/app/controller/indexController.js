var logger = require('../logger')
var mongodb = require('../mongodb')
class indexController{
	async index(ctx){
		logger.info(`path:${ctx.path}`)  // 首页访问统计访问页面，观察用户更喜欢那个页面
		var result = await mongodb.save('dfTable',{type2:'自动添加创建日期与保存日期'})
		console.log(result)
		ctx.body = [1,2,113,632,5]
	}
}
module.exports =  new indexController
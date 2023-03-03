var { accessLogger} = require('../logger')
function accessLogMiddleware(ctx,next){
	const logStr = `path:${ctx.path} | method:${ctx.method} | userAgent:${ctx.headers['user-agent']}`
	accessLogger.info(logStr)
	return next()
}
module.exports = accessLogMiddleware
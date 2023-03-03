var { configure,getLogger } = require('log4js')
var config = require('../config')
configure(config.log)
var restult = getLogger()
restult.accessLogger = getLogger('access')
module.exports = restult
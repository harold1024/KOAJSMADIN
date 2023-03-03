const koaRouter = require('koa-router')
const indexController = require('../controller/indexController')
const uploadController = require('../controller/uploadController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new koaRouter({

}) // 接口地址默认后缀


// getInterface

// useNoAthInterface



router.use(authMiddleware)
// useInterface


router.post('/upload', uploadController.upload)

module.exports = router
const koaRouter = require('koa-router')
const indexController = require('../controller/indexController')
const uploadController = require('../controller/uploadController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new koaRouter({
    prefix: '/app'
}) // 接口地址默认后缀
// getInterface


// user require Start
const userController = require('../controller/userController')
// user require end


// useNoAthInterface
// findAppGetCodeImgApp router Start
router.get('/user/getimagecode', userController.findAppGetCodeImgApp)
// findAppGetCodeImgApp router end

// findOneAppLoginApp router Start
router.get('/login', userController.findOneAppLoginApp)
// findOneAppLoginApp router end

// saveAppRegisterApp router Start
router.post('/register', userController.saveAppRegisterApp)
// saveAppRegisterApp router end

// 82N0InwBnI router Start
router.get('/user/getimagecode', userController.findAppGetCodeImgApp)
// 82N0InwBnI router end

// rQDO9iiipp router Start
router.get('/login', userController.findOneAppLoginApp)
// rQDO9iiipp router end

// gJPD3wWAlh router Start
router.post('/register', userController.saveAppRegisterApp)
// gJPD3wWAlh router end

// GzXtBjuLj router Start
router.post('/register', userController.saveAppRegisterApp)
// GzXtBjuLj router end




































router.use(authMiddleware)
router.get('/', indexController.index)

router.post('/upload', uploadController.upload)
// useInterface
// findOneAppUserApp router Start
router.get('/user/info', userController.findOneAppUserApp)
// findOneAppUserApp router end

// qxrRlN386S router Start
router.get('/user/info', userController.findOneAppUserApp)
// qxrRlN386S router end
















module.exports = router
const koaRouter = require('koa-router')
const indexController = require('../controller/indexController')
const uploadController = require('../controller/uploadController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new koaRouter({
    prefix: '/admin'
}) // 接口地址默认后缀


// getInterface


// mongoData require Start
const mongoDataController = require('../controller/mongoDataController')
// mongoData require end

// system require Start
const systemController = require('../controller/systemController')
// system require end

// logininfor require Start
const logininforController = require('../controller/logininforController')
// logininfor require end

// post require Start
const postController = require('../controller/postController')
// post require end

// dept require Start
const deptController = require('../controller/deptController')
// dept require end

// role require Start
const roleController = require('../controller/roleController')
// role require end

// dictData require Start
const dictDataController = require('../controller/dictDataController')
// dictData require end

// dict require Start
const dictController = require('../controller/dictController')
// dict require end

// menu require Start
const menuController = require('../controller/menuController')
// menu require end

// siteManage require Start
const siteManageController = require('../controller/siteManageController')
// siteManage require end


// install require Start
const installController = require('../controller/installController')
// install require end



// user require Start
const userController = require('../controller/userController')
// user require end

// useNoAthInterface
// findGetCodeImg router Start
router.get('/user/getimagecode', userController.findGetCodeImg)
// findGetCodeImg router end

// findOneLogin router Start
router.get('/login', userController.findOneLogin)
// findOneLogin router end

// saveRegister router Start
router.post('/register', userController.saveRegister)
// saveRegister router end

// fxzJ4RSWKNQ router Start
router.get('/user/getimagecode', userController.findGetCodeImg)
// fxzJ4RSWKNQ router end



// uI-Lg4focC router Start
router.get('/login', userController.findOneLogin)
// uI-Lg4focC router end

// BLp8fOOW7Or router Start
router.post('/register', userController.saveRegister)
// BLp8fOOW7Or router end

// cR0Lucs6U router Start
router.post('/install/add', installController.saveInstall)
// cR0Lucs6U router end



router.use(authMiddleware) // 以下接口是需要登录校验判断才可访问的


router.post('/upload', uploadController.upload)

router.get('/', indexController.index)
// useInterface
// findOneMongoDirectory router Start
router.get('/get/mongodirectory', mongoDataController.findOneMongoDirectory)
// findOneMongoDirectory router end



// saveMongoDataBackup router Start
router.post('/mongoData/backup', mongoDataController.saveMongoDataBackup)
// saveMongoDataBackup router end



// saveMongoDataBackdown router Start
router.post('/mongoData/backdown', mongoDataController.saveMongoDataBackdown)
// saveMongoDataBackdown router end

// updateUser router Start
router.post('/user/update', userController.updateUser)
// updateUser router end

// findOneRole router Start
router.get('/role/data', roleController.findOneRole)
// findOneRole router end

// findWhereRole router Start
router.get('/role/list', roleController.findWhereRole)
// findWhereRole router end

// updateTokenUser router Start
router.post('/user/token/update', userController.updateTokenUser)
// updateTokenUser router end

// updateResetpasswordUser router Start
router.post('/user/resetpassword/update', userController.updateResetpasswordUser)
// updateResetpasswordUser router end

// saveSystemInit router Start
router.post('/system/init', systemController.saveSystemInit)
// saveSystemInit router end

// findOneTokenUser router Start
router.get('/user/token/data', userController.findOneTokenUser)
// findOneTokenUser router end



// findOneLogout router Start
router.get('/logout', userController.findOneLogout)
// findOneLogout router end





// findWhereGetRouters router Start
router.get('/getRouters', menuController.findWhereGetRouters)
// findWhereGetRouters router end

// updateRole router Start
router.post('/role/update', roleController.updateRole)
// updateRole router end

// saveRole router Start
router.post('/role/add', roleController.saveRole)
// saveRole router end

// removeRole router Start
router.post('/role/delete', roleController.removeRole)
// removeRole router end



// findOneGetMenuInfo router Start
router.get('/menu/infot', menuController.findOneGetMenuInfo)
// findOneGetMenuInfo router end

// findWhereGetMenu router Start
router.get('/system/menu/list', menuController.findWhereGetMenu)
// findWhereGetMenu router end

// saveAddMenu router Start
router.post('/menu/add', menuController.saveAddMenu)
// saveAddMenu router end

// removeDeleteMenu router Start
router.post('/menu/delete', menuController.removeDeleteMenu)
// removeDeleteMenu router end

// updateEditeMenu router Start
router.post('/menu/update', menuController.updateEditeMenu)
// updateEditeMenu router end



// findOneGetInfo router Start
router.get('/getinfo', userController.findOneGetInfo)
// findOneGetInfo router end

// removeLogininforAll router Start
router.post('/logininfor/delete/all', logininforController.removeLogininforAll)
// removeLogininforAll router end

// removeLogininfor router Start
router.post('/logininfor/delete', logininforController.removeLogininfor)
// removeLogininfor router end

// findWhereLogininfor router Start
router.get('/logininfor/list', logininforController.findWhereLogininfor)
// findWhereLogininfor router end









// findOneUser router Start
router.get('/user/data', userController.findOneUser)
// findOneUser router end



// saveUser router Start
router.post('/user/add', userController.saveUser)
// saveUser router end

// removeUser router Start
router.post('/user/delete', userController.removeUser)
// removeUser router end

// findWhereUser router Start
router.get('/user/list', userController.findWhereUser)
// findWhereUser router end

// findOneMongoData router Start
router.get('/mongoData/data', mongoDataController.findOneMongoData)
// findOneMongoData router end



// updateMongoData router Start
router.post('/mongoData/update', mongoDataController.updateMongoData)
// updateMongoData router end

// saveMongoData router Start
router.post('/mongoData/add', mongoDataController.saveMongoData)
// saveMongoData router end

// removeMongoData router Start
router.post('/mongoData/delete', mongoDataController.removeMongoData)
// removeMongoData router end

// findWhereMongoData router Start
router.get('/mongoData/list', mongoDataController.findWhereMongoData)
// findWhereMongoData router end





// findOnePost router Start
router.get('/post/data', postController.findOnePost)
// findOnePost router end

// updatePost router Start
router.post('/post/update', postController.updatePost)
// updatePost router end

// savePost router Start
router.post('/post/add', postController.savePost)
// savePost router end

// removePost router Start
router.post('/post/delete', postController.removePost)
// removePost router end

// findWherePost router Start
router.get('/post/list', postController.findWherePost)
// findWherePost router end

// findOneGetDictType router Start
router.get('/system/dict/info', dictController.findOneGetDictType)
// findOneGetDictType router end

// updateDict router Start
router.post('/system/dict/update', dictController.updateDict)
// updateDict router end

// saveAddDict router Start
router.post('/system/dict/add', dictController.saveAddDict)
// saveAddDict router end

// removeDict router Start
router.post('/system/dict/list/delete', dictController.removeDict)
// removeDict router end

// findWhereGetDictList router Start
router.get('/system/dict/list', dictController.findWhereGetDictList)
// findWhereGetDictList router end

// findOneDictDataInfo router Start
router.get('/dictData/data', dictDataController.findOneDictDataInfo)
// findOneDictDataInfo router end

// saveAddDictData router Start
router.post('/system/dict/data/add', dictDataController.saveAddDictData)
// saveAddDictData router end

// removeDictData router Start
router.post('/dictData/delete', dictDataController.removeDictData)
// removeDictData router end

// findWhereGetDictDataList router Start
router.get('/system/dict/data/list', dictDataController.findWhereGetDictDataList)
// findWhereGetDictDataList router end

// updateDictData router Start
router.post('/system/dict/data/update', dictDataController.updateDictData)
// updateDictData router end















// vnnMvBjlWSh router Start
router.get('/getRouters', menuController.findWhereGetRouters)
// vnnMvBjlWSh router end

// DErvaj1ngCV router Start
router.post('/role/update', roleController.updateRole)
// DErvaj1ngCV router end

// 8La3jN96PuI router Start
router.post('/role/add', roleController.saveRole)
// 8La3jN96PuI router end

// AL3KigDynBM router Start
router.post('/role/delete', roleController.removeRole)
// AL3KigDynBM router end

// 0mVUigd0cvA router Start
router.get('/role/list', roleController.findWhereRole)
// 0mVUigd0cvA router end

// IqhvNDGbh5B router Start
router.get('/menu/infot', menuController.findOneGetMenuInfo)
// IqhvNDGbh5B router end

// 8IrKSZHShWX router Start
router.get('/system/menu/list', menuController.findWhereGetMenu)
// 8IrKSZHShWX router end

// d-x-OE1UZJE router Start
router.post('/menu/add', menuController.saveAddMenu)
// d-x-OE1UZJE router end

// G0nOFykTXvO router Start
router.post('/menu/delete', menuController.removeDeleteMenu)
// G0nOFykTXvO router end

// gyrssR0v04Z router Start
router.post('/menu/update', menuController.updateEditeMenu)
// gyrssR0v04Z router end





// xXxgiDb59hM router Start
router.get('/getinfo', userController.findOneGetInfo)
// xXxgiDb59hM router end



// 9obS5t0BOS router Start
router.post('/logininfor/delete/all', logininforController.removeLogininforAll)
// 9obS5t0BOS router end

// tQcGcGMjpD router Start
router.post('/logininfor/delete', logininforController.removeLogininfor)
// tQcGcGMjpD router end

// AfB8fnOIhf router Start
router.get('/logininfor/list', logininforController.findWhereLogininfor)
// AfB8fnOIhf router end

// GHUphiG9dN router Start
router.get('/user/data', userController.findOneUser)
// GHUphiG9dN router end

// g6tiYUQqk0 router Start
router.post('/user/update', userController.updateUser)
// g6tiYUQqk0 router end

// 9HDvoTpQy9 router Start
router.post('/user/add', userController.saveUser)
// 9HDvoTpQy9 router end

// LoWflue5Uc router Start
router.post('/user/delete', userController.removeUser)
// LoWflue5Uc router end

// avxK1fmN_V router Start
router.get('/user/list', userController.findWhereUser)
// avxK1fmN_V router end




// QwTPKW692X1 router Start
router.get('/mongoData/data', mongoDataController.findOneMongoData)
// QwTPKW692X1 router end

// 3lWm6kxdgug router Start
router.get('/get/mongodirectory', mongoDataController.findOneMongoDirectory)
// 3lWm6kxdgug router end

// UxGVwe5jHko router Start
router.post('/mongoData/update', mongoDataController.updateMongoData)
// UxGVwe5jHko router end

// A7jnh1XWYVd router Start
router.post('/mongoData/add', mongoDataController.saveMongoData)
// A7jnh1XWYVd router end

// lSGxq9gUpdk router Start
router.post('/mongoData/delete', mongoDataController.removeMongoData)
// lSGxq9gUpdk router end

// U26FL6ymCK router Start
router.get('/mongoData/list', mongoDataController.findWhereMongoData)
// U26FL6ymCK router end

// 7nODEv9lX- router Start
router.post('/mongoData/backdown', mongoDataController.saveMongoDataBackdown)
// 7nODEv9lX- router end

// Ui6CyEbgvi router Start
router.post('/mongoData/backup', mongoDataController.saveMongoDataBackup)
// Ui6CyEbgvi router end

// qoeN6mY3el router Start
router.get('/post/data', postController.findOnePost)
// qoeN6mY3el router end

// 8VpPLwphSx router Start
router.post('/post/update', postController.updatePost)
// 8VpPLwphSx router end

// gnqPPd8es- router Start
router.post('/post/add', postController.savePost)
// gnqPPd8es- router end

// apEUtsxZu4 router Start
router.post('/post/delete', postController.removePost)
// apEUtsxZu4 router end

// ncT4KNkjoG router Start
router.get('/post/list', postController.findWherePost)
// ncT4KNkjoG router end

// ZYRz09lg0d router Start
router.get('/system/dict/info', dictController.findOneGetDictType)
// ZYRz09lg0d router end

// AMZUm5WWLu router Start
router.post('/system/dict/update', dictController.updateDict)
// AMZUm5WWLu router end

// J2IBG4WC7W router Start
router.post('/system/dict/add', dictController.saveAddDict)
// J2IBG4WC7W router end

// GUBsq7fzMz router Start
router.post('/system/dict/list/delete', dictController.removeDict)
// GUBsq7fzMz router end

// 8xGrLEeOZZ router Start
router.get('/system/dict/list', dictController.findWhereGetDictList)
// 8xGrLEeOZZ router end

// Bu5zcwB_yW router Start
router.get('/dictData/data', dictDataController.findOneDictDataInfo)
// Bu5zcwB_yW router end

// -YL70Cw6Zk router Start
router.post('/system/dict/data/add', dictDataController.saveAddDictData)
// -YL70Cw6Zk router end

// xZP8e-shKAd router Start
router.get('/system/dict/data/list', dictDataController.findWhereGetDictDataList)
// xZP8e-shKAd router end



// bJOZfCsPZ57 router Start
router.post('/system/dict/data/update', dictDataController.updateDictData)
// bJOZfCsPZ57 router end


// Udm-OzWg5n router Start
router.post('/system/init', systemController.saveSystemInit)
// Udm-OzWg5n router end



// kOW8UhLWI8 router Start
router.post('/user/resetpassword/update', userController.updateResetpasswordUser)
// kOW8UhLWI8 router end

// iG02YftXyL router Start
router.get('/user/token/data', userController.findOneTokenUser)
// iG02YftXyL router end

// 2tmMplBNFK router Start
router.post('/user/token/update', userController.updateTokenUser)
// 2tmMplBNFK router end




// WUTKNkOVU router Start
router.post('/dept/add', deptController.saveDept)
// WUTKNkOVU router end



// bwgp8entP router Start
router.get('/dept/data', deptController.findOneDept)
// bwgp8entP router end

// PQniiBHK8 router Start
router.post('/dept/update', deptController.updateDept)
// PQniiBHK8 router end



// E7WInGa7V router Start
router.post('/dept/delete', deptController.removeDept)
// E7WInGa7V router end

// spo4B_JKe router Start
router.get('/dept/list', deptController.findWhereDept)
// spo4B_JKe router end

// 2paQBcLM8 router Start
router.get('/role/data', roleController.findOneRole)
// 2paQBcLM8 router end


// -UuNs1qgs router Start
router.get('/getinfo', userController.findOneGetInfo)
// -UuNs1qgs router end


// eAyFfGP80 router Start
router.get('/logout', userController.findOneLogout)
// eAyFfGP80 router end




// findOneMongoData router Start
router.get('/siteManage/data', siteManageController.findOneSiteManage)
// findOneMongoData router end

// updateMongoData router Start
router.post('/siteManage/update', siteManageController.updateSiteManage)
// updateMongoData router end

// saveMongoData router Start
router.post('/siteManage/add', siteManageController.saveSiteManage)
// saveMongoData router end

// removeMongoData router Start
router.post('/siteManage/delete', siteManageController.removeSiteManage)
// removeMongoData router end

// findWhereMongoData router Start
router.get('/siteManage/list', siteManageController.findWhereSiteManage)
// findWhereMongoData router end






module.exports = router
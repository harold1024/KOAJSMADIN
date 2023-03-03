const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const menuData = require('../initData/menuData')

class gui {
    // addCode
    // re_0pBl-f Start
    findGetRouters = async (ctx) => { // 获取路由数据

        const saveMenu = async (where) => { //保存菜单

            return await mongodb.save('menu', where)
        }


        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}





        let result = await mongodb.find('routers', where)
        if (ctx.userInfo.admin && result.length < 1 && Object.keys(where).length < 1) { // 如果是超级管理员账号，且查询到的没有任何数据
            menuData.map(async item => { // 批量初始化数据
                await saveMenu(item)
            })
            result = menuData
        }
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // re_0pBl-f end


}
module.exports = new gui
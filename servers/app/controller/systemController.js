const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const dictData = require('../initData/dictData')
const dictContentData = require('../initData/dictContentData')
const deptData = require('../initData/deptData')
const menuData = require('../initData/menuData')
const postData = require('../initData/postData')
const roleData = require('../initData/role')
const webConfig = require('../config/website')


const {
    isPermission
} = require('../utils/permissions')
class gui {
    // addCode
    // saveSystemInit Start
    saveSystemInit = async (ctx) => { // 初始化数据

        const getSystemInit = async () => { //查询数据判断是否初始化

            let where = {
                type: 'init'
            }

            return await mongodb.findOne('system', where)
        }
        const saveDict = async (where) => { //保存字典类型

            return await mongodb.save('dict', where)
        }
        const saveDictContent = async (where) => { //保存字典内容

            return await mongodb.save('dictData', where)
        }

        const savePost = async (where) => { //保存岗位

            return await mongodb.save('post', where)
        }
        const saveDept = async (where) => { //保存部门内容

            return await mongodb.save('dept', where)
        }

        const saveRole = async (where) => { //保存角色内容

            return await mongodb.save('role', where)
        }

        let status = ctx.request.body.status
        let name = ctx.request.body.name
        let type = ctx.request.body.type
        let content = ctx.request.body.content
        let remark = ctx.request.body.remark

        if (!status) {
            status = '1'
        }
        if (!name) {
            name = '初始化'
        }
        if (!type) {
            type = 'init'
        }
        if (!content) {
            content = 'success'
        }
        if (!remark) {
            remark = '初始化后端数据'
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            status,
            name,
            type,
            content,
            remark
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        if (await getSystemInit()) {
            return response.error(ctx, '已经初始化了，无需重复初始化')
        }

        // 保存字典分类
        dictData.map(async item => {
            console.log(item)
            await saveDict(item)
        })
        // 保存字典内容数据
        dictContentData.map(async item => {
            await saveDictContent(item)
        })

        // 保存岗位数据
        postData.map(async item => {
            await savePost(item)
        })
        // 保存部门数据
        deptData.map(async item => {
            await saveDept(item)
        })

        // 保存角色数据
        roleData.map(async item => {
            await saveRole(item)
        })



        let result = await mongodb.save('system', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveSystemInit end



    // JKpOxGsZU Start
    findOneWebcoffig = async (ctx) => { // 获取网站信息




        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        return response.success(ctx, webConfig)



        let result = await mongodb.findOne('system', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // JKpOxGsZU end




}
module.exports = new gui
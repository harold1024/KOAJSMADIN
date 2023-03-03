const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const {
    isPermission
} = require('../utils/permissions')
const {
    randomStr
} = require('../utils/random')
let linkTypes = ''
class gui {
    // addCode








    // WbNW2S24p Start
    findOneWebsiteDeptPC = async (ctx) => { // 前台首页




        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}





        let result = {}
        result.data = await mongodb.findOne('dept', where)
        console.log(ctx.webCache.linksData)
        result.webCache = ctx.webCache
        if (result.data != false) {
            await ctx.render('index.html', result)
        } else {
            await ctx.render('404.html', result)
        }


    }
    // WbNW2S24p end

    // E7WInGa7V Start
    removeDept = async (ctx) => { // 部门表-删除
        if ((await isPermission(ctx.userInfo, 'system:dept:remove')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id

        ctx.checkBody('_id', '数据唯一id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }



        let isId = await mongodb.findById('dept', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('dept', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // E7WInGa7V end

    // WUTKNkOVU Start
    saveDept = async (ctx) => { // 部门表-新增
        if ((await isPermission(ctx.userInfo, 'system:dept:add')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let deptId = ctx.request.body.deptId
        let parentId = ctx.request.body.parentId
        let ancestors = ctx.request.body.ancestors
        let deptName = ctx.request.body.deptName
        let orderNum = ctx.request.body.orderNum
        let leader = ctx.request.body.leader
        let phone = ctx.request.body.phone
        let email = ctx.request.body.email
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let parentName = ctx.request.body.parentName
        let children = ctx.request.body.children

        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            searchValue,
            createBy,
            updateBy,
            remark,
            params,
            parentId,
            ancestors,
            deptName,
            orderNum,
            leader,
            phone,
            email,
            status,
            delFlag,
            parentName,
            children
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        where.deptId = randomStr(8)



        let result = await mongodb.save('dept', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // WUTKNkOVU end

    // bwgp8entP Start
    findOneDept = async (ctx) => { // 部门表-详细信息
        if ((await isPermission(ctx.userInfo, 'system:dept:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.query._id

        ctx.checkQuery('_id', '数据唯一id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }





        let result = await mongodb.findOne('dept', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // bwgp8entP end

    // PQniiBHK8 Start
    updateDept = async (ctx) => { // 部门表-更新
        if ((await isPermission(ctx.userInfo, 'system:dept:edit')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let deptId = ctx.request.body.deptId
        let parentId = ctx.request.body.parentId
        let ancestors = ctx.request.body.ancestors
        let deptName = ctx.request.body.deptName
        let orderNum = ctx.request.body.orderNum
        let leader = ctx.request.body.leader
        let phone = ctx.request.body.phone
        let email = ctx.request.body.email
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let parentName = ctx.request.body.parentName
        let children = ctx.request.body.children

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }

        let updateParams = {
            searchValue,
            createBy,
            updateBy,
            remark,
            params,
            deptId,
            parentId,
            ancestors,
            deptName,
            orderNum,
            leader,
            phone,
            email,
            status,
            delFlag,
            parentName,
            children
        }

        updateParams.updateTime = new Date()

        let isId = await mongodb.findById('dept', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('dept', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // PQniiBHK8 end

    // spo4B_JKe Start
    findWhereDept = async (ctx) => { // 部门表-分页查询
        if ((await isPermission(ctx.userInfo, 'system:dept:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }
        const addDept = async (where) => { //添加部门数据
            return await mongodb.save('dept', where)
        }

        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let createBy = ctx.query.createBy
        let updateBy = ctx.query.updateBy
        let remark = ctx.query.remark
        let params = ctx.query.params
        let deptId = ctx.query.deptId
        let parentId = ctx.query.parentId
        let ancestors = ctx.query.ancestors
        let deptName = ctx.query.deptName
        let orderNum = ctx.query.orderNum
        let leader = ctx.query.leader
        let phone = ctx.query.phone
        let email = ctx.query.email
        let status = ctx.query.status
        let delFlag = ctx.query.delFlag
        let parentName = ctx.query.parentName
        let children = ctx.query.children

        if (!start) {
            start = 0
        }
        if (!limit) {
            limit = 10
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let otherWhere = {
            limit: limit,
            skip: start,
            sort: {
                'createTime': -1
            }
        }
        otherWhere.limit = parseInt(limit)
        otherWhere.skip = parseInt(start)

        where.deptName = new RegExp(deptName)
        if (status) {
            where.status = status
        }
        let filerCode = {}




        let result = await mongodb.findWhere('dept', where, otherWhere, filerCode)
        if (ctx.userInfo.admin && result.list.length < 1 && Object.keys(where).length < 1) { // 首次启动没有数据则初始化数据
            deptData.map(async item => {
                await addDept(item)
            })
            result.list = deptData
        }
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // spo4B_JKe end


}
module.exports = new gui
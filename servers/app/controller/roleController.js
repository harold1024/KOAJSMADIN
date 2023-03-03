const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const {
    setPermissData,
    isPermission
} = require('../utils/permissions')

class gui {
    // addCode
    // findOneRole Start
    findOneRole = async (ctx) => { // 角色表-详细信息



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





        let result = await mongodb.findOne('role', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneRole end

    // updateRole Start
    updateRole = async (ctx) => { // 角色表-更新
        if ((await isPermission(ctx.userInfo, 'system:role:edit')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let roleId = ctx.request.body.roleId
        let roleName = ctx.request.body.roleName
        let roleKey = ctx.request.body.roleKey
        let roleSort = ctx.request.body.roleSort
        let dataScope = ctx.request.body.dataScope
        let menuCheckStrictly = ctx.request.body.menuCheckStrictly
        let deptCheckStrictly = ctx.request.body.deptCheckStrictly
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let flag = ctx.request.body.flag
        let menuIds = ctx.request.body.menuIds
        let deptIds = ctx.request.body.deptIds
        let admin = ctx.request.body.admin

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        if (!menuCheckStrictly) {
            menuCheckStrictly = true
        }
        if (!deptCheckStrictly) {
            deptCheckStrictly = true
        }
        if (!admin) {
            admin = false
        }
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
            roleId,
            roleName,
            roleKey,
            roleSort,
            dataScope,
            menuCheckStrictly,
            deptCheckStrictly,
            status,
            delFlag,
            flag,
            menuIds,
            deptIds,
            admin
        }

        updateParams.updateTime = new Date()

        let isId = await mongodb.findById('role', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('role', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateRole end

    // saveRole Start
    saveRole = async (ctx) => { // 角色表-新增
        if ((await isPermission(ctx.userInfo, 'system:role:add')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let roleId = ctx.request.body.roleId
        let roleName = ctx.request.body.roleName
        let roleKey = ctx.request.body.roleKey
        let roleSort = ctx.request.body.roleSort
        let dataScope = ctx.request.body.dataScope
        let menuCheckStrictly = ctx.request.body.menuCheckStrictly
        let deptCheckStrictly = ctx.request.body.deptCheckStrictly
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let flag = ctx.request.body.flag
        let menuIds = ctx.request.body.menuIds
        let deptIds = ctx.request.body.deptIds
        let admin = ctx.request.body.admin

        if (!menuCheckStrictly) {
            menuCheckStrictly = true
        }
        if (!deptCheckStrictly) {
            deptCheckStrictly = true
        }
        if (!admin) {
            admin = false
        }
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
            roleId,
            roleName,
            roleKey,
            roleSort,
            dataScope,
            menuCheckStrictly,
            deptCheckStrictly,
            status,
            delFlag,
            flag,
            menuIds,
            deptIds,
            admin
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        console.log("部门类型")
        console.log(deptIds)
        console.log(typeof(deptIds))



        let result = await mongodb.save('role', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveRole end

    // removeRole Start
    removeRole = async (ctx) => { // 角色表-删除
        if ((await isPermission(ctx.userInfo, 'system:role:remove')) == false) {
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



        let isId = await mongodb.findById('role', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('role', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeRole end

    // findWhereRole Start
    findWhereRole = async (ctx) => { // 角色表-分页查询
        if ((await isPermission(ctx.userInfo, 'system:role:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let createBy = ctx.query.createBy
        let updateBy = ctx.query.updateBy
        let remark = ctx.query.remark
        let params = ctx.query.params
        let roleId = ctx.query.roleId
        let roleName = ctx.query.roleName
        let roleKey = ctx.query.roleKey
        let roleSort = ctx.query.roleSort
        let dataScope = ctx.query.dataScope
        let menuCheckStrictly = ctx.query.menuCheckStrictly
        let deptCheckStrictly = ctx.query.deptCheckStrictly
        let status = ctx.query.status
        let delFlag = ctx.query.delFlag
        let flag = ctx.query.flag
        let menuIds = ctx.query.menuIds
        let deptIds = ctx.query.deptIds
        let admin = ctx.query.admin

        if (!start) {
            start = 0
        }
        if (!limit) {
            limit = 10
        }
        if (!menuCheckStrictly) {
            menuCheckStrictly = true
        }
        if (!deptCheckStrictly) {
            deptCheckStrictly = true
        }
        if (!admin) {
            admin = false
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
                'roleSort': 1
            }
        }
        otherWhere.limit = parseInt(limit)
        otherWhere.skip = parseInt(start)

        where.roleName = new RegExp(roleName)
        where.roleKey = new RegExp(roleKey)
        if (status) {
            where.status = status
        }

        if (params) {
            try {
                params = JSON.parse(params)
                if (params.beginTime && params.endTime) {
                    where.createTime = {
                        $gte: new Date(params.beginTime),
                        $lt: new Date(params.endTime)
                    }
                }

            } catch (err) {

            }
        }
        let filerCode = {
            menuIds: 0
        }




        let result = await mongodb.findWhere('role', where, otherWhere, filerCode)
        let result2 = await mongodb.findWhere('role', {
            start: 0,
            limit: 100
        }, otherWhere) // 查询所有数据不过滤并添加到缓存中
        setPermissData(result2.list) // 更新缓存
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereRole end






}
module.exports = new gui
const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const moment = require('moment')
const {
    isPermission
} = require('../utils/permissions')
class gui {
    // addCode
    // findOnePost Start
    findOnePost = async (ctx) => { // 岗位-详细信息



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





        let result = await mongodb.findOne('post', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOnePost end

    // updatePost Start
    updatePost = async (ctx) => { // 岗位-更新
        if ((await isPermission(ctx.userInfo, 'system:post:edit')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let postId = ctx.request.body.postId
        let postCode = ctx.request.body.postCode
        let postName = ctx.request.body.postName
        let postSort = ctx.request.body.postSort
        let status = ctx.request.body.status
        let flag = ctx.request.body.flag

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        if (!flag) {
            flag = false
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
            postId,
            postCode,
            postName,
            postSort,
            status,
            flag
        }

        updateParams.updateTime = new Date()

        let isId = await mongodb.findById('post', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('post', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updatePost end

    // savePost Start
    savePost = async (ctx) => { // 岗位-新增
        if ((await isPermission(ctx.userInfo, 'system:post:add')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let postId = ctx.request.body.postId
        let postCode = ctx.request.body.postCode
        let postName = ctx.request.body.postName
        let postSort = ctx.request.body.postSort
        let status = ctx.request.body.status
        let flag = ctx.request.body.flag

        if (!flag) {
            flag = false
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
            postId,
            postCode,
            postName,
            postSort,
            status,
            flag
        }

        where.createTime = new Date()
        where.updateTime = new Date()



        let result = await mongodb.save('post', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // savePost end

    // removePost Start
    removePost = async (ctx) => { // 岗位-删除
        if ((await isPermission(ctx.userInfo, 'system:post:remove')) == false) {
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



        let isId = await mongodb.findById('post', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('post', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removePost end

    // findWherePost Start
    findWherePost = async (ctx) => { // 岗位-分页查询
        if ((await isPermission(ctx.userInfo, 'system:post:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let createBy = ctx.query.createBy
        let updateBy = ctx.query.updateBy
        let remark = ctx.query.remark
        let params = ctx.query.params
        let postId = ctx.query.postId
        let postCode = ctx.query.postCode
        let postName = ctx.query.postName
        let postSort = ctx.query.postSort
        let status = ctx.query.status
        let flag = ctx.query.flag

        if (!start) {
            start = 0
        }
        if (!limit) {
            limit = 10
        }
        if (!flag) {
            flag = false
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

        if (postName) {
            where.postName = new RegExp(postName)
        }

        if (status) {
            where.status = status
        }
        let filerCode = {}




        let result = await mongodb.findWhere('post', where, otherWhere, filerCode)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWherePost end


}
module.exports = new gui
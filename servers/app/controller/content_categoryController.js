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
    // removeContent_category Start
    removeContent_category = async (ctx) => { // 框架与分类-删除



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



        where.userId = ctx.userInfo._id
        let isId = await mongodb.findById('content_category', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('content_category', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeContent_category end

    // findWhereContent_category Start
    findWhereContent_category = async (ctx) => { // 框架与分类-分页查询



        let startTime = ctx.query.startTime
        let endTime = ctx.query.endTime
        let start = ctx.query.start
        let limit = ctx.query.limit
        let uid = ctx.query.uid
        let name = ctx.query.name
        let keywords = ctx.query.keywords
        let sortId = ctx.query.sortId
        let parentID = ctx.query.parentID
        let state = ctx.query.state
        let date = ctx.query.date
        let contentTemp = ctx.query.contentTemp
        let defaultUrl = ctx.query.defaultUrl
        let homePage = ctx.query.homePage
        let sortPath = ctx.query.sortPath
        let comments = ctx.query.comments

        if (!start) {
            start = 0
        }
        if (!limit) {
            limit = 10
        }
        if (!uid) {
            uid = 0
        }
        if (!sortId) {
            sortId = 0
        }
        if (!parentID) {
            parentID = '0'
        }
        if (!state) {
            state = '1'
        }
        if (!date) {
            date = new Date()
        }
        if (!homePage) {
            homePage = 'ui'
        }
        if (!sortPath) {
            sortPath = '0'
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
        if (startTime && endTime) {
            where.createTime = {
                $gte: startTime,
                $lt: endTime
            }
        }
        let filerCode = {}




        let result = await mongodb.findWhere('content_category', where, otherWhere, filerCode)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereContent_category end

    // findOneContent_category Start
    findOneContent_category = async (ctx) => { // 框架与分类-详细信息



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





        let result = await mongodb.findOne('content_category', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneContent_category end

    // updateContent_category Start
    updateContent_category = async (ctx) => { // 框架与分类-更新



        let _id = ctx.request.body._id
        let uid = ctx.request.body.uid
        let name = ctx.request.body.name
        let keywords = ctx.request.body.keywords
        let sortId = ctx.request.body.sortId
        let parentID = ctx.request.body.parentID
        let state = ctx.request.body.state
        let date = ctx.request.body.date
        let contentTemp = ctx.request.body.contentTemp
        let defaultUrl = ctx.request.body.defaultUrl
        let homePage = ctx.request.body.homePage
        let sortPath = ctx.request.body.sortPath
        let comments = ctx.request.body.comments

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        if (!uid) {
            uid = 0
        }
        if (!sortId) {
            sortId = 0
        }
        if (!parentID) {
            parentID = '0'
        }
        if (!state) {
            state = '1'
        }
        if (!date) {
            date = new Date()
        }
        if (!homePage) {
            homePage = 'ui'
        }
        if (!sortPath) {
            sortPath = '0'
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
            uid,
            name,
            keywords,
            sortId,
            parentID,
            state,
            date,
            contentTemp,
            defaultUrl,
            homePage,
            sortPath,
            comments
        }

        updateParams.updateTime = new Date()

        where.userId = ctx.userInfo._id
        let isId = await mongodb.findById('content_category', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('content_category', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateContent_category end

    // saveContent_category Start
    saveContent_category = async (ctx) => { // 框架与分类-新增



        let uid = ctx.request.body.uid
        let name = ctx.request.body.name
        let keywords = ctx.request.body.keywords
        let sortId = ctx.request.body.sortId
        let parentID = ctx.request.body.parentID
        let state = ctx.request.body.state
        let date = ctx.request.body.date
        let contentTemp = ctx.request.body.contentTemp
        let defaultUrl = ctx.request.body.defaultUrl
        let homePage = ctx.request.body.homePage
        let sortPath = ctx.request.body.sortPath
        let comments = ctx.request.body.comments

        if (!uid) {
            uid = 0
        }
        if (!sortId) {
            sortId = 0
        }
        if (!parentID) {
            parentID = '0'
        }
        if (!state) {
            state = '1'
        }
        if (!date) {
            date = new Date()
        }
        if (!homePage) {
            homePage = 'ui'
        }
        if (!sortPath) {
            sortPath = '0'
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            uid,
            name,
            keywords,
            sortId,
            parentID,
            state,
            date,
            contentTemp,
            defaultUrl,
            homePage,
            sortPath,
            comments
        }

        where.createTime = new Date()
        where.updateTime = new Date()

        where.userId = ctx.userInfo._id


        let result = await mongodb.save('content_category', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveContent_category end


}
module.exports = new gui
const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const moment = require('moment')
const {
    getDirectoryList
} = require('../utils/guiGetFirectory')
const {
    spawn
} = require('child_process');
const path = require('path');
const fs = require('fs')
const {
    exec
} = require('child_process');
const {
    isPermission
} = require('../utils/permissions')
class gui {
    // addCode
    // findOneMongoData Start
    findOneSiteManage = async (ctx) => { // 数据库备份记录-详细信息
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

        let result = await mongodb.findOne('site', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneMongoData end

    // updateMongoData Start
    updateSiteManage = async (ctx) => { // 数据库备份记录-更新



        let _id = ctx.request.body._id
        let siteName = ctx.request.body.siteName
        // let pathDir = ctx.request.body.pathDir
        // let downNum = ctx.request.body.downNum
        // let downUrl = ctx.request.body.downUrl

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
            siteName,
            // pathDir,
            // downNum,
            // downUrl
        }

        updateParams.updateTime = new Date()

        where.userId = ctx.userInfo._id
        let isId = await mongodb.findById('site', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('site', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateMongoData end

    // saveMongoData Start
    saveSiteManage = async (ctx) => { // 数据库备份记录-新增



        let siteName = ctx.request.body.siteName
        // let pathDir = ctx.request.body.pathDir
        // let downNum = ctx.request.body.downNum
        // let downUrl = ctx.request.body.downUrl

        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            siteName,
            // pathDir,
            // downNum,
            // downUrl
        }

        where.createTime = new Date()
        where.updateTime = new Date()

        where.userId = ctx.userInfo._id


        let result = await mongodb.save('site', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveMongoData end

    // removeMongoData Start
    removeSiteManage = async (ctx) => { // 数据库备份记录-删除



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



        let isId = await mongodb.findById('site', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('site', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeMongoData end

    // findWhereMongoData Start
    findWhereSiteManage = async (ctx) => { // 数据库备份记录-分页查询
        let start = ctx.query.start
        let limit = ctx.query.limit
        // let name = ctx.query.name
        // let pathDir = ctx.query.pathDir
        // let downNum = ctx.query.downNum
        // let downUrl = ctx.query.downUrl

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
        // if (startTime && endTime) {
        //     where.createTime = {
        //         $gte: startTime,
        //         $lt: endTime
        //     }
        // }
        let filerCode = {}



        let result = await mongodb.findWhere('site', where, otherWhere, filerCode)
        
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereMongoData end






}
module.exports = new gui
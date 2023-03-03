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
    // findOneGetDictType Start
    findOneGetDictType = async (ctx) => { // 字典详细信息



        let _id = ctx.query._id

        ctx.checkQuery('_id', 'id来查询 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }





        let result = await mongodb.findOne('dict', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneGetDictType end

    // updateDict Start
    updateDict = async (ctx) => { // 字典更新
        if ((await isPermission(ctx.userInfo, 'system:dict:edit')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let dictId = ctx.request.body.dictId
        let dictName = ctx.request.body.dictName
        let dictType = ctx.request.body.dictType
        let status = ctx.request.body.status

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
            dictId,
            dictName,
            dictType,
            status
        }

        updateParams.updateTime = new Date()
        updateParams.updateBy = ctx.userInfo.username // 记录是谁更新的

        let isId = await mongodb.findById('dict', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('dict', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateDict end

    // saveAddDict Start
    saveAddDict = async (ctx) => { // 字典新增
        if ((await isPermission(ctx.userInfo, 'system:dict:add')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let dictId = ctx.request.body.dictId
        let dictName = ctx.request.body.dictName
        let dictType = ctx.request.body.dictType
        let status = ctx.request.body.status

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
            dictId,
            dictName,
            dictType,
            status
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        createBy = ctx.userInfo.username // 记录一下创建人



        let result = await mongodb.save('dict', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveAddDict end

    // removeDict Start
    removeDict = async (ctx) => { // 字典删除
        if ((await isPermission(ctx.userInfo, 'system:dict:remove')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id

        ctx.checkBody('_id', 'id来查询 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }



        let isId = await mongodb.findById('dict', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('dict', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeDict end

    // findWhereGetDictList Start
    findWhereGetDictList = async (ctx) => { // 字典列表
        if ((await isPermission(ctx.userInfo, 'system:dict:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let createBy = ctx.query.createBy
        let updateBy = ctx.query.updateBy
        let remark = ctx.query.remark
        let params = ctx.query.params
        let dictId = ctx.query.dictId
        let dictName = ctx.query.dictName
        let dictType = ctx.query.dictType
        let status = ctx.query.status

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
        if (status) {
            where.status = status
        }

        where.dictName = new RegExp(dictName)

        where.dictType = new RegExp(dictType)
        //console.log(ctx.query['params[beginTime]'])
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
        let filerCode = {}




        let result = await mongodb.findWhere('dict', where, otherWhere, filerCode)
        // console.log("打印权限")
        // console.log(isPermission(ctx.userInfo, 'system:dict:query'))
        if ((await isPermission(ctx.userInfo, 'system:dict:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereGetDictList end


}
module.exports = new gui
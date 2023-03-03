const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')

const {
    isPermission
} = require('../utils/permissions')

class gui {
    // addCode
    // findOneDictDataInfo Start
    findOneDictDataInfo = async (ctx) => { // 字典内容详细



        let _id = ctx.query._id

        ctx.checkQuery('_id', '内容id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }





        let result = await mongodb.findOne('dictData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneDictDataInfo end

    // saveAddDictData Start
    saveAddDictData = async (ctx) => { // 字典内容新增



        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let dictCode = ctx.request.body.dictCode
        let dictSort = ctx.request.body.dictSort
        let dictLabel = ctx.request.body.dictLabel
        let dictValue = ctx.request.body.dictValue
        let dictType = ctx.request.body.dictType
        let cssClass = ctx.request.body.cssClass
        let listClass = ctx.request.body.listClass
        let isDefault = ctx.request.body.isDefault
        let status = ctx.request.body.status
        let defaultStr = ctx.request.body.defaultStr

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
            dictCode,
            dictSort,
            dictLabel,
            dictValue,
            dictType,
            cssClass,
            listClass,
            isDefault,
            status
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        where.default = defaultStr // 注意：这里的default是系统关键字，只能放在where里进行中转



        let result = await mongodb.save('dictData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveAddDictData end

    // removeDictData Start
    removeDictData = async (ctx) => { // 字典内容删除



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



        let isId = await mongodb.findById('dictData', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('dictData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeDictData end

    // findWhereGetDictDataList Start
    findWhereGetDictDataList = async (ctx) => { // 字典内容列表



        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let createBy = ctx.query.createBy
        let updateBy = ctx.query.updateBy
        let remark = ctx.query.remark
        let params = ctx.query.params
        let dictCode = ctx.query.dictCode
        let dictSort = ctx.query.dictSort
        let dictLabel = ctx.query.dictLabel
        let dictValue = ctx.query.dictValue
        let dictType = ctx.query.dictType
        let cssClass = ctx.query.cssClass
        let listClass = ctx.query.listClass
        let isDefault = ctx.query.isDefault
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

        let where = {
            dictType
        }

        let otherWhere = {
            limit: limit,
            skip: start,
            sort: {
                'createTime': -1
            }
        }
        otherWhere.limit = parseInt(limit)
        otherWhere.skip = parseInt(start)

        where.dictLabel = new RegExp(dictLabel)

        if (status) {
            where.status = status
        }
        let filerCode = {}




        let result = await mongodb.findWhere('dictData', where, otherWhere, filerCode)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereGetDictDataList end

    // updateDictData Start
    updateDictData = async (ctx) => { // 字典内容修改



        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let dictCode = ctx.request.body.dictCode
        let dictSort = ctx.request.body.dictSort
        let dictLabel = ctx.request.body.dictLabel
        let dictValue = ctx.request.body.dictValue
        let dictType = ctx.request.body.dictType
        let cssClass = ctx.request.body.cssClass
        let listClass = ctx.request.body.listClass
        let isDefault = ctx.request.body.isDefault
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
            dictCode,
            dictSort,
            dictLabel,
            dictValue,
            dictType,
            cssClass,
            listClass,
            isDefault,
            status
        }

        updateParams.updateTime = new Date()

        let isId = await mongodb.findById('dictData', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('dictData', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateDictData end

















}
module.exports = new gui
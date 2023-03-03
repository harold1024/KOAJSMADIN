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














    // pzZ0-3U1E Start
    findWhereArticleListPC = async (ctx) => { // 前台-文章列表

        const getProjectType = async () => { //获取产品列表

            let where = {
                parentId: ctx.params.typeId
            }
            let otherWhere = {}

            return await mongodb.findWhere('column', where, otherWhere)
        }

        var pageIndex = parseInt(ctx.params.pageIndex) * 10
        var typeId2 = ctx.params.typeId2
        var typeId = ctx.params.typeId

        let startTime = ctx.query.startTime
        let endTime = ctx.query.endTime
        let start = ctx.query.start
        let limit = ctx.query.limit
        let name = ctx.query.name
        let date = ctx.query.date
        let age = ctx.query.age
        let isShow = ctx.query.isShow
        let attribute = ctx.query.attribute

        if (!isShow) {
            isShow = true
        }
        if (!attribute) {
            attribute = []
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let otherWhere = {
            limit: (12),
            skip: pageIndex,
            sort: {
                'createTime': -1
            }
        }
        if (startTime && endTime) {
            where.createTime = {
                $gte: startTime,
                $lt: endTime
            }
        }


        where.typeId = typeId2
        console.log(pageIndex)
        console.log(otherWhere)
        let filerCode = {}




        let result = {}
        result.data = await mongodb.findWhere('product', where, otherWhere, filerCode)
        result.webCache = ctx.webCache
        result.webConfig = ctx.webConfig
        var typeList = (await getProjectType()).list
        result.typeList = typeList
        result.typeData = typeList.find(item => item._id == typeId2) // 产品分类信息返回
        result.columnId = typeId
        result.pageIndex = ctx.params.pageIndex
        if (result.data != false) {
            await ctx.render('article/list.html', result)
        } else {
            await ctx.render('404.html', result)
        }


    }
    // pzZ0-3U1E end
















}
module.exports = new gui
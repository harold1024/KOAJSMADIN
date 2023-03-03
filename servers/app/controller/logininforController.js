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
    // removeLogininforAll Start
    removeLogininforAll = async (ctx) => { // 登录日志-清空
        if ((await isPermission(ctx.userInfo, 'system:logininfor:remove')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }



        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}





        let result = await mongodb.remove('logininfor', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeLogininforAll end

    // removeLogininfor Start
    removeLogininfor = async (ctx) => { // 登录日志-删除
        if ((await isPermission(ctx.userInfo, 'system:logininfor:remove')) == false) {
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



        let isId = await mongodb.findById('logininfor', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('logininfor', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeLogininfor end

    // findWhereLogininfor Start
    findWhereLogininfor = async (ctx) => { // 登录日志-分页查询
        if ((await isPermission(ctx.userInfo, 'monitor:logerininfor:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let isCurrentTime = ctx.query.isCurrentTime
        let infoId = ctx.query.infoId
        let userName = ctx.query.userName
        let status = ctx.query.status
        let ipaddr = ctx.query.ipaddr
        let loginLocation = ctx.query.loginLocation
        let browser = ctx.query.browser
        let os = ctx.query.os
        let msg = ctx.query.msg
        let loginTime = ctx.query.loginTime
        let startTime = ctx.query.startTime
        let endTime = ctx.query.endTime

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

        if (ipaddr) {
            where.ipaddr = new RegExp(ipaddr)
        }

        if (userName) {
            where.userName = new RegExp(userName)
        }

        if (status) {
            where.status = status
        }



        if (isCurrentTime) {
            where.loginTime = {
                $gte: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                $lt: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
            }
        } else
        if (startTime && endTime) {

            where.loginTime = {
                $gte: startTime || new Date(),
                $lt: endTime || new Date()
            }
        }
        let filerCode = {}




        let result = await mongodb.findWhere('logininfor', where, otherWhere, filerCode)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereLogininfor end


}
module.exports = new gui
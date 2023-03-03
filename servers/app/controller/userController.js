const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const captcha = require('trek-captcha')
const {
    isPermission
} = require('../utils/permissions')
const {
    sign,
    verify
} = require('../utils/auth')

class gui {



    constructor() {

    }

    // addCode
    // updateTokenUser Start
    updateTokenUser = async (ctx) => { // token修改用户信息



        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let deptId = ctx.request.body.deptId
        let username = ctx.request.body.username
        let nickName = ctx.request.body.nickName
        let email = ctx.request.body.email
        let phonenumber = ctx.request.body.phonenumber
        let sex = ctx.request.body.sex
        let avatar = ctx.request.body.avatar
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let loginIp = ctx.request.body.loginIp
        let loginDate = ctx.request.body.loginDate
        let dept = ctx.request.body.dept
        let roles = ctx.request.body.roles
        let roleIds = ctx.request.body.roleIds
        let postIds = ctx.request.body.postIds
        let roleId = ctx.request.body.roleId
        let admin = ctx.request.body.admin
        let password = ctx.request.body.password

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        if (!postIds) {
            postIds = []
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
            nickName,
            email,
            phonenumber,
            sex,
            avatar
        }

        updateParams.updateTime = new Date()
        where._id = ctx.userInfo._id

        let isId = await mongodb.findById('user', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('user', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateTokenUser end

    // findOneTokenUser Start
    findOneTokenUser = async (ctx) => { // token用户信息




        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        where._id = ctx.userInfo._id



        let result = await mongodb.findOne('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneTokenUser end

    // updateResetpasswordUser Start
    updateResetpasswordUser = async (ctx) => { // token重置密码

        const getUserInfo = async (_id) => { //获取用户信息

            let where = {
                _id
            }

            return await mongodb.findOne('user', where)
        }

        let oldpassword = ctx.request.body.oldpassword
        let newpassword = ctx.request.body.newpassword

        ctx.checkBody('oldpassword', '旧密码 不能为空').notEmpty()
        ctx.checkBody('newpassword', '新密码 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let updateParams = {}

        updateParams.updateTime = new Date()

        let userInfo = await getUserInfo(ctx.userInfo._id)
        if (oldpassword != userInfo.password) {
            return response.error(ctx, '重置失败，密码错误')
        }
        where._id = ctx.userInfo._id
        updateParams.password = newpassword



        let result = await mongodb.update('user', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateResetpasswordUser end

    // findOneLogout Start
    findOneLogout = async (ctx) => { // 退出登录




        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}





        let result = await mongodb.findOne('user', where)
        result = true
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneLogout end

    // findGetCodeImg Start
    findGetCodeImg = async (ctx) => { // 获取验证码

        const {
            token,
            buffer
        } = await captcha();

        ctx.session.imageCode = token;
        // ctx.set('Content-Type','image/png')
        // ctx.body = buffer

        ctx.status = 200;
        ctx.type = "jpg";
        // console.log(Buffer.isBuffer(buffer));
        ctx.length = Buffer.byteLength(buffer);
        ctx.body = buffer;

        return


        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}





        let result = await mongodb.find('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findGetCodeImg end

    // findOneGetInfo Start
    findOneGetInfo = async (ctx) => { // 获取用户信息

        const getRole = async (_id) => { //获取角色信息

            let where = {
                _id
            }
            let otherWhere = {}

            return await mongodb.find('role', where, otherWhere)
        }
        const getMenu = async (_id) => { //

            let where = {
                _id
            }
            let otherWhere = {}

            return await mongodb.find('menu', where, otherWhere)
        }


        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        if (ctx.userInfo && ctx.userInfo._id) {
            where["_id"] = ctx.userInfo._id
        } else {
            response.error(ctx, '请登录')
            return
        }



        let result = await mongodb.findOne('user', where)
        if (result) {
            result.password = '***' // 密码不要返回
        }
        let roles = await getRole(result.roleIds)
        // logger.info('角色数据')
        // logger.info(roles)
        let menuIds = []
        roles.map(item => {
            menuIds = menuIds.concat(item.menuIds)
        })
        // console.log('过滤菜单')
        // console.log(menuIds)
        let menuList = await getMenu(menuIds)
        // console.log('菜单数据')

        let permissions = []
        menuList.map(item => {
            permissions = permissions.concat(item.perms).filter(Boolean)
        })
        result = {
            data: result,
            permissions
        }
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneGetInfo end

    // findAppGetCodeImgApp Start
    findAppGetCodeImgApp = async (ctx) => { // 移动端获取验证码

        const {
            token,
            buffer
        } = await captcha();

        // ctx.session.imageCode = token; // 移动端不支持跨域 不能用这个方案
        //console.log("获取了验证码" + token)
        //console.log(ctx.session.imageCode)
        // ctx.set('Content-Type','image/png')
        // ctx.body = buffer

        ctx.status = 200;
        ctx.type = "jpg";
        // console.log(Buffer.isBuffer(buffer));
        ctx.length = Buffer.byteLength(buffer);
        const data = new Buffer(buffer).toString('base64');
        let base64 = 'data:image/png;base64,' + data;
        // ctx.body = buffer;
        let result2 = {}
        result2.code = sign({
            token
        })
        result2.imgBuffer = base64
        return response.success(ctx, result2)
        // return


        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}





        let result = await mongodb.find('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findAppGetCodeImgApp end

    // findOneAppLoginApp Start
    findOneAppLoginApp = async (ctx) => { // 移动端登录

        const addLoginInfo = async (userName, status, msg) => { //添加登录日志

            let where = {
                userName,
                status,
                ipaddr: ctx.request.ip,
                loginLocation: ctx.query.loginLocation,
                browser: ctx.header['user-agent'],
                os: 'app', // 移动端登录
                msg,
                loginTime: new Date()
            }

            return await mongodb.save('logininfor', where)
        }

        let username = ctx.query.username
        let password = ctx.query.password
        let code = ctx.query.code
        let serveCode = ctx.query.serveCode

        ctx.checkQuery('username', '用户名 不能为空').notEmpty()
        ctx.checkQuery('password', '密码 不能为空').notEmpty()
        ctx.checkQuery('code', '验证码 不能为空').notEmpty()
        ctx.checkQuery('serveCode', '校验码 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            username,
            password
        }

        if (code != verify(serveCode).admin.token) { // 后续再严谨一点添加验证码过期时间
            await addLoginInfo(username, '1', '验证码错误')
            return response.error(ctx, '验证码错误，请重新输入')
        }



        let result = await mongodb.findOne('user', where)
        if (result) {
            result.password = '' // 清理掉密码，否则token太长了，影响到传输
            let token = sign(result)
            await addLoginInfo(result.username, '0', '登录成功')
            result = token

        } else if (result == null) {
            response.error(ctx, '登录失败用户名或密码错误')
            await addLoginInfo(username, '1', '登录失败')
            return
        }
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneAppLoginApp end

    // findOneAppUserApp Start
    findOneAppUserApp = async (ctx) => { // 移动端用户信息表-详细信息




        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        where._id = ctx.userInfo._id



        let result = await mongodb.findOne('user', where)
        result.password = '*****'
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneAppUserApp end

    // saveAppRegisterApp Start
    saveAppRegisterApp = async (ctx) => { // 移动端注册

        const findUserName = async () => { //查询用户是否唯一
            let where = {
                username: ctx.request.body.username
            }
            return await mongodb.findOne('user', where)
        }

        let username = ctx.request.body.username
        let password = ctx.request.body.password
        let code = ctx.request.body.code
        let serveCode = ctx.request.body.serveCode
        let status = ctx.request.body.status

        ctx.checkBody('username', '用户名 不能为空').notEmpty()
        ctx.checkBody('username', '用户名 长度在3与20之间').len(3, 20)
        ctx.checkBody('password', '密码 不能为空').notEmpty()
        ctx.checkBody('code', '验证码 不能为空').notEmpty()
        ctx.checkBody('serveCode', '加密之后的验证码 不能为空').notEmpty()
        if (!status) {
            status = '0'
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            password,
            username
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        logger.info("调用了注册接口")
        let isUserName = await findUserName()
        if (isUserName) {
            return response.error(ctx, '用户名称重复,请重新命名')
        }

        if (code != verify(serveCode).admin.token) { // 后续再严谨一点添加验证码过期时间
            return response.error(ctx, '验证码错误，请重新输入')
        }


        where.admin = false // 移动端注册的不需要超级管理员权限



        let result = await mongodb.save('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveAppRegisterApp end

    // findOneLogin Start
    findOneLogin = async (ctx) => { // 登录

        const addLoginInfo = async (userName, status, msg) => { //添加登录日志

            let where = {
                userName,
                status,
                ipaddr: ctx.request.ip,
                loginLocation: ctx.query.loginLocation,
                browser: ctx.header['user-agent'],
                os: '',
                msg,
                loginTime: new Date()
            }

            return await mongodb.save('logininfor', where)
        }

        let username = ctx.query.username
        let password = ctx.query.password
        let code = ctx.query.code

        ctx.checkQuery('username', '用户名 不能为空').notEmpty()
        ctx.checkQuery('password', '密码 不能为空').notEmpty()
        ctx.checkQuery('code', '验证码 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            username,
            password
        }

        if (code != ctx.session.imageCode) { // 后续再严谨一点添加验证码过期时间
            await addLoginInfo(username, '1', '验证码错误')
            return response.error(ctx, '验证码错误，请重新输入')
        }


        console.log('where', where)
        let result = await mongodb.findOne('user', where)
        console.log('result', result)
        if (result) {
            result.password = '' // 清理掉密码，否则token太长了，影响到传输
            let token = sign(result)
            await addLoginInfo(result.username, '0', '登录成功')
            result = token

        } else if (result == null) {
            response.error(ctx, '登录失败用户名或密码错误')
            await addLoginInfo(username, '1', '登录失败')
            return
        }
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneLogin end

    // findOneUser Start
    findOneUser = async (ctx) => { // 用户信息表-详细信息



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





        let result = await mongodb.findOne('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneUser end

    // updateUser Start
    updateUser = async (ctx) => { // 用户信息表-更新
        if ((await isPermission(ctx.userInfo, 'system:user:edit')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let deptId = ctx.request.body.deptId
        let username = ctx.request.body.username
        let nickName = ctx.request.body.nickName
        let email = ctx.request.body.email
        let phonenumber = ctx.request.body.phonenumber
        let sex = ctx.request.body.sex
        let avatar = ctx.request.body.avatar
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let loginIp = ctx.request.body.loginIp
        let loginDate = ctx.request.body.loginDate
        let dept = ctx.request.body.dept
        let roles = ctx.request.body.roles
        let roleIds = ctx.request.body.roleIds
        let postIds = ctx.request.body.postIds
        let roleId = ctx.request.body.roleId
        let admin = ctx.request.body.admin
        let password = ctx.request.body.password

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        if (!postIds) {
            postIds = []
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
            createBy,
            updateBy,
            remark,
            params,
            deptId,
            username,
            nickName,
            email,
            phonenumber,
            sex,
            avatar,
            status,
            delFlag,
            loginIp,
            loginDate,
            dept,
            roles,
            roleIds,
            postIds,
            roleId,
            password
        }

        updateParams.updateTime = new Date()

        let isId = await mongodb.findById('user', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('user', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateUser end

    // saveUser Start
    saveUser = async (ctx) => { // 用户信息表-新增
        if ((await isPermission(ctx.userInfo, 'system:user:add')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let deptId = ctx.request.body.deptId
        let username = ctx.request.body.username
        let nickName = ctx.request.body.nickName
        let email = ctx.request.body.email
        let phonenumber = ctx.request.body.phonenumber
        let sex = ctx.request.body.sex
        let avatar = ctx.request.body.avatar
        let status = ctx.request.body.status
        let delFlag = ctx.request.body.delFlag
        let loginIp = ctx.request.body.loginIp
        let loginDate = ctx.request.body.loginDate
        let dept = ctx.request.body.dept
        let roles = ctx.request.body.roles
        let roleIds = ctx.request.body.roleIds
        let postIds = ctx.request.body.postIds
        let roleId = ctx.request.body.roleId
        let admin = ctx.request.body.admin
        let password = ctx.request.body.password

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
            deptId,
            username,
            nickName,
            email,
            phonenumber,
            sex,
            avatar,
            status,
            delFlag,
            loginIp,
            loginDate,
            dept,
            roles,
            roleIds,
            postIds,
            roleId,
            password
        }

        where.createTime = new Date()
        where.updateTime = new Date()



        let result = await mongodb.save('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveUser end

    // removeUser Start
    removeUser = async (ctx) => { // 用户信息表-删除
        if ((await isPermission(ctx.userInfo, 'system:user:remove')) == false) {
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



        let isId = await mongodb.findById('user', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeUser end

    // findWhereUser Start
    findWhereUser = async (ctx) => { // 用户信息表-分页查询
        if ((await isPermission(ctx.userInfo, 'system:user:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let start = ctx.query.start
        let limit = ctx.query.limit
        let searchValue = ctx.query.searchValue
        let createBy = ctx.query.createBy
        let updateBy = ctx.query.updateBy
        let remark = ctx.query.remark
        let params = ctx.query.params
        let deptId = ctx.query.deptId
        let username = ctx.query.username
        let nickName = ctx.query.nickName
        let email = ctx.query.email
        let phonenumber = ctx.query.phonenumber
        let sex = ctx.query.sex
        let avatar = ctx.query.avatar
        let status = ctx.query.status
        let delFlag = ctx.query.delFlag
        let loginIp = ctx.query.loginIp
        let loginDate = ctx.query.loginDate
        let dept = ctx.query.dept
        let roles = ctx.query.roles
        let roleIds = ctx.query.roleIds
        let postIds = ctx.query.postIds
        let roleId = ctx.query.roleId
        let admin = ctx.query.admin
        let password = ctx.query.password

        if (!start) {
            start = 0
        }
        if (!limit) {
            limit = 10
        }
        if (!admin) {
            admin = true
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
        if (deptId) {
            where.deptId = deptId
        }
        if (status) {
            where.status = status
        }
        if (username) {
            where.username = new RegExp(username)
        }
        if (phonenumber) {
            where.phonenumber = new RegExp(phonenumber)
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
        if (ctx.query['params[beginTime]'] && ctx.query['params[endTime]']) {
            where.createTime = {
                $gte: new Date(ctx.query['params[beginTime]']),
                $lt: new Date(ctx.query['params[endTime]'])
            }
        }
        // console.log(where)
        let filerCode = {}




        let result = await mongodb.findWhere('user', where, otherWhere, filerCode)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereUser end

    // saveRegister Start
    saveRegister = async (ctx) => { // 注册

        const findUserName = async () => { //查询用户是否唯一
            let where = {
                username: ctx.request.body.username
            }
            return await mongodb.findOne('user', where)
        }

        let username = ctx.request.body.username
        let password = ctx.request.body.password
        let code = ctx.request.body.code

        ctx.checkBody('username', '用户名 不能为空').notEmpty()
        ctx.checkBody('password', '密码 不能为空').notEmpty()
        ctx.checkBody('code', '验证码 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            password,
            username
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        logger.info("调用了注册接口")
        let isUserName = await findUserName()
        console.log('username',username)
        console.log('isUserName',isUserName)
        if (username != 'admin') {
            return response.error(ctx, '后台账号不正确')
        }
        if (isUserName) {
            return response.error(ctx, '用户名称重复,请重新命名')
        }

        if (code != ctx.session.imageCode) { // 后续再严谨一点添加验证码过期时间
            return response.error(ctx, '验证码错误，请重新输入')
        }
        where.admin = true



        let result = await mongodb.save('user', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveRegister end












}
var userController = new gui
module.exports = userController
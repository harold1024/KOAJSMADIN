// GzXtBjuLj Start
saveAppRegisterApp = async (ctx) => { // 移动端注册dd

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



    let result = await mongodb.save('users', where)

    if (result != false) {
        response.success(ctx, result)
    } else {
        response.error(ctx, '服务器错误')
    }


}
// GzXtBjuLj end
/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'



// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/upload',
        method: 'post',
        data: data
    })
}
// addCode
// updateTokenUser Start
// token修改用户信息
export function updateTokenUser(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建者
        updateBy: params.updateBy, // 更新者
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        username: params.username, // 用户名
        nickName: params.nickName, // 用户分类名称
        email: params.email, // 邮箱
        phonenumber: params.phonenumber, // 电话号码
        sex: params.sex, // 性别
        avatar: params.avatar, // 头像
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        loginIp: params.loginIp, // 登录地址
        loginDate: params.loginDate, // 登录日期
        dept: params.dept, // 所属部门信息
        roles: params.roles, // 所有权限信息
        roleIds: params.roleIds, // 权限id
        postIds: params.postIds, // 所属部门id
        roleId: params.roleId, // 
        admin: params.admin, // admin用户
        password: params.password // 密码
    }
    return request({
        url: '/user/token/update',
        method: 'post',
        data: _params
    })
}
// updateTokenUser end

// findOneTokenUser Start
// token用户信息
export function findOneTokenUser(params) {
    let _params = {

    }
    return request({
        url: '/user/token/data',
        method: 'get',
        params: _params
    })
}
// findOneTokenUser end

// updateResetpasswordUser Start
// token重置密码
export function updateResetpasswordUser(params) {
    let _params = {

        oldpassword: params.oldpassword, // 旧密码
        newpassword: params.newpassword // 新密码
    }
    return request({
        url: '/user/resetpassword/update',
        method: 'post',
        data: _params
    })
}
// updateResetpasswordUser end

// findOneLogout Start
// 退出登录
export function findOneLogout(params) {
    let _params = {

    }
    return request({
        url: '/logout',
        method: 'get',
        params: _params
    })
}
// findOneLogout end

// findGetCodeImg Start
// 获取验证码
export function findGetCodeImg(params) {
    let _params = {

        undefined: params.undefined // undefined
    }
    return request({
        url: '/user/getimagecode',
        method: 'get',
        params: _params
    })
}
// findGetCodeImg end

// findOneGetInfo Start
// 获取用户信息
export function findOneGetInfo(params) {
    let _params = {

        undefined: params.undefined // undefined
    }
    return request({
        url: '/getinfo',
        method: 'get',
        params: _params
    })
}
// findOneGetInfo end

// findOneLogin Start
// 登录
export function findOneLogin(params) {
    let _params = {

        username: params.username, // 用户名
        password: params.password, // 密码
        code: params.code // 验证码
    }
    return request({
        url: '/login',
        method: 'get',
        params: _params
    })
}
// findOneLogin end

// findOneUser Start
// 用户信息表-详细信息
export function findOneUser(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/user/data',
        method: 'get',
        params: _params
    })
}
// findOneUser end

// updateUser Start
// 用户信息表-更新
export function updateUser(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建者
        updateBy: params.updateBy, // 更新者
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        username: params.username, // 用户名
        nickName: params.nickName, // 用户分类名称
        email: params.email, // 邮箱
        phonenumber: params.phonenumber, // 电话号码
        sex: params.sex, // 性别
        avatar: params.avatar, // 头像
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        loginIp: params.loginIp, // 登录地址
        loginDate: params.loginDate, // 登录日期
        dept: params.dept, // 所属部门信息
        roles: params.roles, // 所有权限信息
        roleIds: params.roleIds, // 权限id
        postIds: params.postIds, // 所属部门id
        roleId: params.roleId, // 
        admin: params.admin, // admin用户
        password: params.password // 密码
    }
    return request({
        url: '/user/update',
        method: 'post',
        data: _params
    })
}
// updateUser end

// saveUser Start
// 用户信息表-新增
export function saveUser(params) {
    let _params = {

        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建者
        updateBy: params.updateBy, // 更新者
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        username: params.username, // 用户名
        nickName: params.nickName, // 用户分类名称
        email: params.email, // 邮箱
        phonenumber: params.phonenumber, // 电话号码
        sex: params.sex, // 性别
        avatar: params.avatar, // 头像
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        loginIp: params.loginIp, // 登录地址
        loginDate: params.loginDate, // 登录日期
        dept: params.dept, // 所属部门信息
        roles: params.roles, // 所有权限信息
        roleIds: params.roleIds, // 权限id
        postIds: params.postIds, // 
        roleId: params.roleId, // 
        admin: params.admin, // admin用户
        password: params.password // 密码
    }
    return request({
        url: '/user/add',
        method: 'post',
        data: _params
    })
}
// saveUser end

// removeUser Start
// 用户信息表-删除
export function removeUser(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/user/delete',
        method: 'post',
        data: _params
    })
}
// removeUser end

// findWhereUser Start
// 用户信息表-分页查询
export function findWhereUser(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建者
        updateBy: params.updateBy, // 更新者
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        username: params.username, // 用户名
        nickName: params.nickName, // 用户昵称
        email: params.email, // 邮箱
        phonenumber: params.phonenumber, // 电话号码
        sex: params.sex, // 性别
        avatar: params.avatar, // 头像
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        loginIp: params.loginIp, // 登录地址
        loginDate: params.loginDate, // 登录日期
        dept: params.dept, // 所属部门信息
        roles: params.roles, // 所有权限信息
        roleIds: params.roleIds, // 权限id
        postIds: params.postIds, // 
        roleId: params.roleId, // 
        admin: params.admin, // admin用户
        password: params.password // 密码
    }
    return request({
        url: '/user/list',
        method: 'get',
        params: _params
    })
}
// findWhereUser end

// saveRegister Start
// 注册
export function saveRegister(params) {
    let _params = {

        username: params.username, // 用户名
        password: params.password, // 密码
        code: params.code // 验证码
    }
    return request({
        url: '/register',
        method: 'post',
        data: _params
    })
}
// saveRegister end
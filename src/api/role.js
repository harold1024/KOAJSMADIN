/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// findOneRole Start
// 角色表-详细信息
export function findOneRole(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/role/data',
        method: 'get',
        params: _params
    })
}
// findOneRole end

// updateRole Start
// 角色表-更新
export function updateRole(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        roleId: params.roleId, // 校色id
        roleName: params.roleName, // 校色名称
        roleKey: params.roleKey, // 权限字符
        roleSort: params.roleSort, // 排序
        dataScope: params.dataScope, // 数据
        menuCheckStrictly: params.menuCheckStrictly, // 
        deptCheckStrictly: params.deptCheckStrictly, // 
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        flag: params.flag, // 
        menuIds: params.menuIds, // 所选菜单id
        deptIds: params.deptIds, // 
        admin: params.admin // 管理员
    }
    return request({
        url: '/role/update',
        method: 'post',
        data: _params
    })
}
// updateRole end

// saveRole Start
// 角色表-新增
export function saveRole(params) {
    let _params = {

        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        roleId: params.roleId, // 校色id
        roleName: params.roleName, // 校色名称
        roleKey: params.roleKey, // 权限字符
        roleSort: params.roleSort, // 排序
        dataScope: params.dataScope, // 数据
        menuCheckStrictly: params.menuCheckStrictly, // 
        deptCheckStrictly: params.deptCheckStrictly, // 
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        flag: params.flag, // 
        menuIds: params.menuIds, // 所选菜单id
        deptIds: params.deptIds, // 
        admin: params.admin // 管理员
    }
    return request({
        url: '/role/add',
        method: 'post',
        data: _params
    })
}
// saveRole end

// removeRole Start
// 角色表-删除
export function removeRole(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/role/delete',
        method: 'post',
        data: _params
    })
}
// removeRole end

// findWhereRole Start
// 角色表-分页查询
export function findWhereRole(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        roleId: params.roleId, // 校色id
        roleName: params.roleName, // 校色名称
        roleKey: params.roleKey, // 权限字符
        roleSort: params.roleSort, // 排序
        dataScope: params.dataScope, // 数据
        menuCheckStrictly: params.menuCheckStrictly, // 
        deptCheckStrictly: params.deptCheckStrictly, // 
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        flag: params.flag, // 
        menuIds: params.menuIds, // 所选菜单id
        deptIds: params.deptIds, // 
        admin: params.admin // 管理员
    }
    return request({
        url: '/role/list',
        method: 'get',
        params: _params
    })
}
// findWhereRole end
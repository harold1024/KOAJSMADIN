/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode










// WbNW2S24p Start
// 前台首页
export function findOneWebsiteHomePC(params) {
    let _params = {

    }
    return request({
        url: '/',
        method: 'get',
        params: _params
    })
}
// WbNW2S24p end

// E7WInGa7V Start
// 部门表-删除
export function removeDept(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/dept/delete',
        method: 'post',
        data: _params
    })
}
// E7WInGa7V end

// WUTKNkOVU Start
// 部门表-新增
export function saveDept(params) {
    let _params = {

        searchValue: params.searchValue, // 关键字搜索
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        parentId: params.parentId, // 父级id
        ancestors: params.ancestors, // 
        deptName: params.deptName, // 部门名称
        orderNum: params.orderNum, // 排序id
        leader: params.leader, // 领导
        phone: params.phone, // 电话
        email: params.email, // 邮箱
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        parentName: params.parentName, // 父节点名称
        children: params.children // 子节点
    }
    return request({
        url: '/dept/add',
        method: 'post',
        data: _params
    })
}
// WUTKNkOVU end

// bwgp8entP Start
// 部门表-详细信息
export function findOneDept(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/dept/data',
        method: 'get',
        params: _params
    })
}
// bwgp8entP end

// PQniiBHK8 Start
// 部门表-更新
export function updateDept(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 关键字搜索
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        parentId: params.parentId, // 父级id
        ancestors: params.ancestors, // 
        deptName: params.deptName, // 部门名称
        orderNum: params.orderNum, // 排序id
        leader: params.leader, // 领导
        phone: params.phone, // 电话
        email: params.email, // 邮箱
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        parentName: params.parentName, // 父节点名称
        children: params.children // 子节点
    }
    return request({
        url: '/dept/update',
        method: 'post',
        data: _params
    })
}
// PQniiBHK8 end

// spo4B_JKe Start
// 部门表-分页查询
export function findWhereDept(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 关键字搜索
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 备注
        params: params.params, // 参数
        deptId: params.deptId, // 部门id
        parentId: params.parentId, // 父级id
        ancestors: params.ancestors, // 
        deptName: params.deptName, // 部门名称
        orderNum: params.orderNum, // 排序id
        leader: params.leader, // 领导
        phone: params.phone, // 电话
        email: params.email, // 邮箱
        status: params.status, // 状态
        delFlag: params.delFlag, // 
        parentName: params.parentName, // 父节点名称
        children: params.children // 子节点
    }
    return request({
        url: '/dept/list',
        method: 'get',
        params: _params
    })
}
// spo4B_JKe end
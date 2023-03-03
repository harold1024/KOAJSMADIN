/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// findOnePost Start
// 岗位-详细信息
export function findOnePost(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/post/data',
        method: 'get',
        params: _params
    })
}
// findOnePost end

// updatePost Start
// 岗位-更新
export function updatePost(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 备注
        params: params.params, // 参数
        postId: params.postId, // 岗位id
        postCode: params.postCode, // 岗位编码
        postName: params.postName, // 岗位名称
        postSort: params.postSort, // 岗位排序
        status: params.status, // 状态
        flag: params.flag // flag
    }
    return request({
        url: '/post/update',
        method: 'post',
        data: _params
    })
}
// updatePost end

// savePost Start
// 岗位-新增
export function savePost(params) {
    let _params = {

        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 备注
        params: params.params, // 参数
        postId: params.postId, // 岗位id
        postCode: params.postCode, // 岗位编码
        postName: params.postName, // 岗位名称
        postSort: params.postSort, // 岗位排序
        status: params.status, // 状态
        flag: params.flag // flag
    }
    return request({
        url: '/post/add',
        method: 'post',
        data: _params
    })
}
// savePost end

// removePost Start
// 岗位-删除
export function removePost(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/post/delete',
        method: 'post',
        data: _params
    })
}
// removePost end

// findWherePost Start
// 岗位-分页查询
export function findWherePost(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 备注
        params: params.params, // 参数
        postId: params.postId, // 岗位id
        postCode: params.postCode, // 岗位编码
        postName: params.postName, // 岗位名称
        postSort: params.postSort, // 岗位排序
        status: params.status, // 状态
        flag: params.flag // flag
    }
    return request({
        url: '/post/list',
        method: 'get',
        params: _params
    })
}
// findWherePost end
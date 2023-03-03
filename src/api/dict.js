/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// findOneGetDictType Start
// 字典详细信息
export function findOneGetDictType(params) {
    let _params = {

        _id: params._id // id来查询
    }
    return request({
        url: '/system/dict/info',
        method: 'get',
        params: _params
    })
}
// findOneGetDictType end

// updateDict Start
// 字典更新
export function updateDict(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        dictId: params.dictId, // 字典id
        dictName: params.dictName, // 字典名称
        dictType: params.dictType, // 字典类型
        status: params.status // 状态
    }
    return request({
        url: '/system/dict/update',
        method: 'post',
        data: _params
    })
}
// updateDict end

// saveAddDict Start
// 字典新增
export function saveAddDict(params) {
    let _params = {

        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        dictId: params.dictId, // 字典id
        dictName: params.dictName, // 字典名称
        dictType: params.dictType, // 字典类型
        status: params.status // 状态
    }
    return request({
        url: '/system/dict/add',
        method: 'post',
        data: _params
    })
}
// saveAddDict end

// removeDict Start
// 字典删除
export function removeDict(params) {
    let _params = {

        _id: params._id // id来查询
    }
    return request({
        url: '/system/dict/list/delete',
        method: 'post',
        data: _params
    })
}
// removeDict end

// findWhereGetDictList Start
// 字典列表
export function findWhereGetDictList(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 搜索关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        dictId: params.dictId, // 字典id
        dictName: params.dictName, // 字典名称
        dictType: params.dictType, // 字典类型
        status: params.status // 状态
    }
    return request({
        url: '/system/dict/list',
        method: 'get',
        params: _params
    })
}
// findWhereGetDictList end
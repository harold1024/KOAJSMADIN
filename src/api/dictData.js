/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// findOneDictDataInfo Start
// 字典内容详细
export function findOneDictDataInfo(params) {
    let _params = {

        _id: params._id // 内容id
    }
    return request({
        url: '/dictData/data',
        method: 'get',
        params: _params
    })
}
// findOneDictDataInfo end

// saveAddDictData Start
// 字典内容新增
export function saveAddDictData(params) {
    let _params = {

        searchValue: params.searchValue, // 关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        dictCode: params.dictCode, // 编码
        dictSort: params.dictSort, // 排序
        dictLabel: params.dictLabel, // 名称
        dictValue: params.dictValue, // 索引值
        dictType: params.dictType, // 类型
        cssClass: params.cssClass, // 样式
        listClass: params.listClass, // 列表样式
        isDefault: params.isDefault, // 是否默认
        status: params.status, // 状态
        defaultStr: params.defaultStr // 是否默认
    }
    return request({
        url: '/system/dict/data/add',
        method: 'post',
        data: _params
    })
}
// saveAddDictData end

// removeDictData Start
// 字典内容删除
export function removeDictData(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/dictData/delete',
        method: 'post',
        data: _params
    })
}
// removeDictData end

// findWhereGetDictDataList Start
// 字典内容列表
export function findWhereGetDictDataList(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        dictCode: params.dictCode, // 编码
        dictSort: params.dictSort, // 排序
        dictLabel: params.dictLabel, // 名称
        dictValue: params.dictValue, // 索引值
        dictType: params.dictType, // 类型
        cssClass: params.cssClass, // 样式
        listClass: params.listClass, // 列表样式
        isDefault: params.isDefault, // 是否默认
        status: params.status // 状态
    }
    return request({
        url: '/system/dict/data/list',
        method: 'get',
        params: _params
    })
}
// findWhereGetDictDataList end

// updateDictData Start
// 字典内容修改
export function updateDictData(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 关键字
        createBy: params.createBy, // 创建人
        updateBy: params.updateBy, // 更新人
        remark: params.remark, // 标记
        params: params.params, // 参数
        dictCode: params.dictCode, // 编码
        dictSort: params.dictSort, // 排序
        dictLabel: params.dictLabel, // 名称
        dictValue: params.dictValue, // 索引值
        dictType: params.dictType, // 类型
        cssClass: params.cssClass, // 样式
        listClass: params.listClass, // 列表样式
        isDefault: params.isDefault, // 是否默认
        status: params.status // 状态
    }
    return request({
        url: '/system/dict/data/update',
        method: 'post',
        data: _params
    })
}
// updateDictData end


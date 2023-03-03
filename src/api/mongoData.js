/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// findOneMongoData Start
// 数据库备份记录-详细信息
export function findOneMongoData(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/mongoData/data',
        method: 'get',
        params: _params
    })
}
// findOneMongoData end

// findOneMongoDirectory Start
// 数据库备份记录-获取数据库目录
export function findOneMongoDirectory(params) {
    let _params = {

    }
    return request({
        url: '/get/mongodirectory',
        method: 'get',
        params: _params
    })
}
// findOneMongoDirectory end

// updateMongoData Start
// 数据库备份记录-更新
export function updateMongoData(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        name: params.name, // 名称
        pathDir: params.pathDir, // 目录
        downNum: params.downNum, // 下载次数
        downUrl: params.downUrl // 下载地址
    }
    return request({
        url: '/mongoData/update',
        method: 'post',
        data: _params
    })
}
// updateMongoData end

// saveMongoData Start
// 数据库备份记录-新增
export function saveMongoData(params) {
    let _params = {

        name: params.name, // 名称
        pathDir: params.pathDir, // 目录
        downNum: params.downNum, // 下载次数
        downUrl: params.downUrl // 下载地址
    }
    return request({
        url: '/mongoData/add',
        method: 'post',
        data: _params
    })
}
// saveMongoData end

// removeMongoData Start
// 数据库备份记录-删除
export function removeMongoData(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/mongoData/delete',
        method: 'post',
        data: _params
    })
}
// removeMongoData end

// findWhereMongoData Start
// 数据库备份记录-分页查询
export function findWhereMongoData(params) {
    let _params = {

        startTime: params.startTime, // 开始日期
        endTime: params.endTime, // 结束日期
        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        name: params.name, // 名称
        pathDir: params.pathDir, // 目录
        downNum: params.downNum, // 下载次数
        downUrl: params.downUrl // 下载地址
    }
    return request({
        url: '/mongoData/list',
        method: 'get',
        params: _params
    })
}
// findWhereMongoData end

// saveMongoDataBackdown Start
// 数据库-执行还原操作
export function saveMongoDataBackdown(params) {
    let _params = {

        pathDir: params.pathDir // 目录
    }
    return request({
        url: '/mongoData/backdown',
        method: 'post',
        data: _params
    })
}
// saveMongoDataBackdown end

// saveMongoDataBackup Start
// 数据库-执行备份操作
export function saveMongoDataBackup(params) {
    let _params = {

        name: params.name, // 名称
        pathDir: params.pathDir, // 目录
        downNum: params.downNum, // 下载次数
        downUrl: params.downUrl // 下载地址
    }
    return request({
        url: '/mongoData/backup',
        method: 'post',
        data: _params
    })
}
// saveMongoDataBackup end
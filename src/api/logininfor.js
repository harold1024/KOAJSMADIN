/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// removeLogininforAll Start
// 登录日志-清空
export function removeLogininforAll(params) {
    let _params = {

    }
    return request({
        url: '/logininfor/delete/all',
        method: 'post',
        data: _params
    })
}
// removeLogininforAll end

// removeLogininfor Start
// 登录日志-删除
export function removeLogininfor(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/logininfor/delete',
        method: 'post',
        data: _params
    })
}
// removeLogininfor end

// findWhereLogininfor Start
// 登录日志-分页查询
export function findWhereLogininfor(params) {
    let _params = {

        start: params.start, // 分页起始位置
        limit: params.limit, // 分页显示条数
        searchValue: params.searchValue, // 关键字搜索
        isCurrentTime: params.isCurrentTime, // 当天时间
        infoId: params.infoId, // 编号
        userName: params.userName, // 用户名
        status: params.status, // 状态
        ipaddr: params.ipaddr, // 登录ip地址
        loginLocation: params.loginLocation, // 登录地区
        browser: params.browser, // 浏览器内核 
        os: params.os, // 操作系统
        msg: params.msg, // 消息
        loginTime: params.loginTime, // 登录时间
        startTime: params.startTime, // 开始时间
        endTime: params.endTime // 结束时间
    }
    return request({
        url: '/logininfor/list',
        method: 'get',
        params: _params
    })
}
// findWhereLogininfor end
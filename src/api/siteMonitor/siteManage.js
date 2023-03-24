/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
 import request from '@/utils/request'
 // addCode
 // findOneMongoData Start
 // 数据库备份记录-详细信息
 export function findOneSiteManage(params) {
     let _params = {
         _id: params._id // 数据唯一id
     }
     return request({
         url: '/siteManage/data',
         method: 'get',
         params: _params
     })
 }
 // findOneMongoData end
 
 // updateMongoData Start
 // 数据库备份记录-更新
 export function updateSiteManage(params) {
     let _params = {
 
         _id: params._id, // 列表唯一id
         siteName: params.siteName, // 站点名称
     }
     return request({
         url: '/siteManage/update',
         method: 'post',
         data: _params
     })
 }
 // updateMongoData end
 
 // saveMongoData Start
 // 数据库备份记录-新增
 export function saveSiteManage(params) {
     let _params = {
 
         siteName: params.siteName, // 站点名称
        
     }
     return request({
         url: '/siteManage/add',
         method: 'post',
         data: _params
     })
 }
 // saveMongoData end
 
 // removeMongoData Start
 // 数据库备份记录-删除
 export function removeSiteManage(params) {
     let _params = {
 
         _id: params._id // 数据唯一id
     }
     return request({
         url: '/siteManage/delete',
         method: 'post',
         data: _params
     })
 }
 // removeMongoData end
 
 // findWhereMongoData Start
 // 数据库备份记录-分页查询
 export function findWhereSiteManage(params) {
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
         url: '/siteManage/list',
         method: 'get',
         params: _params
     })
 }
 // findWhereMongoData end
 

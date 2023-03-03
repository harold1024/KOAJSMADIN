/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// findWhereGetRouters Start
// 获取路由数据
export function findWhereGetRouters(params) {
    let _params = {

    }
    return request({
        url: '/getRouters',
        method: 'get',
        params: _params
    })
}
// findWhereGetRouters end

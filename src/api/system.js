/**
 * api代码文件
 * 注意: //addCode 下方为自动生成的代码，不可删除该注释
 */
import request from '@/utils/request'
// addCode
// saveSystemInit Start
// 初始化数据
export function saveSystemInit(params) {
    let _params = {

        status: params.status, // 状态
        name: params.name, // 是否初始化
        type: params.type, // 类型
        content: params.content, // 要设置的内容
        remark: params.remark // 备注
    }
    return request({
        url: '/system/init',
        method: 'post',
        data: _params
    })
}
// saveSystemInit end





// JKpOxGsZU Start
// 获取网站信息
export function findOneWebcoffig(params) {
    let _params = {

    }
    return request({
        url: '/system/webconfig',
        method: 'get',
        params: _params
    })
}
// JKpOxGsZU end
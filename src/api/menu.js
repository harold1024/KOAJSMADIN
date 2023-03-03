import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
    return request({
        url: '/getRouters',
        method: 'get'
    })
}




// updateEditeMenu Start
// 菜单修改
export function updateEditeMenu(params) {
    let _params = {

        _id: params._id, // 列表唯一id
        searchValue: params.searchValue, // 关键字
        createBy: params.createBy, // 
        updateBy: params.updateBy, // 
        remark: params.remark, // 标记
        params: params.params, // 参数
        menuId: params.menuId, // 菜单id
        menuName: params.menuName, // 菜单名称
        parentName: params.parentName, // 父级菜单名称
        parentId: params.parentId, // 父级菜单id
        orderNum: params.orderNum, // 订单数
        path: params.path, // 页面地址
        component: params.component, // 组件
        query: params.query, // 查询
        isFrame: params.isFrame, // 是否是架构
        isCache: params.isCache, // 是否缓存
        menuType: params.menuType, // 菜单类型
        visible: params.visible, // 是否显示
        status: params.status, // 状态
        perms: params.perms, // 权限标识
        icon: params.icon, // 图标
        children: params.children // 子菜单
    }
    return request({
        url: '/menu/update',
        method: 'post',
        data: _params
    })
}
// updateEditeMenu end
// removeDeleteMenu Start
// 菜单删除
export function removeDeleteMenu(params) {
    let _params = {

        _id: params._id // 数据唯一id
    }
    return request({
        url: '/menu/delete',
        method: 'post',
        data: _params
    })
}
// removeDeleteMenu end
// saveAddMenu Start
// 菜单新增
export function saveAddMenu(params) {
    let _params = {

        searchValue: params.searchValue, // 关键字
        createBy: params.createBy, // 
        updateBy: params.updateBy, // 
        remark: params.remark, // 标记
        params: params.params, // 参数
        menuId: params.menuId, // 菜单id
        menuName: params.menuName, // 菜单名称
        parentName: params.parentName, // 父级菜单名称
        parentId: params.parentId, // 父级菜单id
        orderNum: params.orderNum, // 订单数
        path: params.path, // 页面地址
        component: params.component, // 组件
        query: params.query, // 查询
        isFrame: params.isFrame, // 是否是架构
        isCache: params.isCache, // 是否缓存
        menuType: params.menuType, // 菜单类型
        visible: params.visible, // 是否显示
        status: params.status, // 状态
        perms: params.perms, // 权限标识
        icon: params.icon, // 图标
        children: params.children // 子菜单
    }
    return request({
        url: '/menu/add',
        method: 'post',
        data: _params
    })
}
// saveAddMenu end
// findWhereGetMenu Start
// 菜单查询
export function findWhereGetMenu(params) {
    let _params = {

        menuName: params.menuName, // 菜单名称
        status: params.status // 
    }
    return request({
        url: '/system/menu/list',
        method: 'get',
        params: _params
    })
}
// findWhereGetMenu end
// findOneGetMenuInfo Start
// 菜单详细信息
export function findOneGetMenuInfo(params) {
    let _params = {

        _id: params._id // 菜单id不能为空
    }
    return request({
        url: '/menu/infot',
        method: 'get',
        params: _params
    })
}
// findOneGetMenuInfo end
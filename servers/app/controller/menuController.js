const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const menuData = require('../initData/menuData')
const {
    setMenuList
} = require('../utils/permissions')
const {
    getRouter,
    handleTree
} = require('../utils/guiTree')
const {
    isPermission
} = require('../utils/permissions')
const {
    randomStr
} = require('../utils/random')

class gui {
    // addCode
    // findOneGetMenuInfo Start
    findOneGetMenuInfo = async (ctx) => { // 菜单详细信息
        if ((await isPermission(ctx.userInfo, 'system:menu:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.query._id

        ctx.checkQuery('_id', '菜单id不能为空 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }





        let result = await mongodb.findOne('menu', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneGetMenuInfo end

    // findWhereGetMenu Start
    findWhereGetMenu = async (ctx) => { // 菜单查询
        if ((await isPermission(ctx.userInfo, 'system:menu:query')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let menuName = ctx.query.menuName
        let status = ctx.query.status

        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let otherWhere = {
            sort: {
                'orderNum': 1
            }
        }
        if (menuName) {
            where.menuName = new RegExp(menuName)
        }

        if (status) {
            where.status = status
        }
        let filerCode = {}




        let result = await mongodb.findWhere('menu', where, otherWhere, filerCode)
        setMenuList(result)
        if (result == false) {
            return response.success(ctx, [])
        }
        result = result.list
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereGetMenu end

    // saveAddMenu Start
    saveAddMenu = async (ctx) => { // 菜单新增
        if ((await isPermission(ctx.userInfo, 'system:menu:add')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let menuId = ctx.request.body.menuId
        let menuName = ctx.request.body.menuName
        let parentName = ctx.request.body.parentName
        let parentId = ctx.request.body.parentId
        let orderNum = ctx.request.body.orderNum
        let path = ctx.request.body.path
        let component = ctx.request.body.component
        let query = ctx.request.body.query
        let isFrame = ctx.request.body.isFrame
        let isCache = ctx.request.body.isCache
        let menuType = ctx.request.body.menuType
        let visible = ctx.request.body.visible
        let status = ctx.request.body.status
        let perms = ctx.request.body.perms
        let icon = ctx.request.body.icon
        let children = ctx.request.body.children

        if (!isFrame) {
            isFrame = 1
        }
        if (!isCache) {
            isCache = 0
        }
        if (!visible) {
            visible = 0
        }
        if (!status) {
            status = 0
        }
        if (!icon) {
            icon = 'system'
        }
        if (!children) {
            children = []
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            searchValue,
            createBy,
            updateBy,
            remark,
            params,
            menuId,
            menuName,
            parentName,
            parentId,
            orderNum,
            path,
            component,
            query,
            isFrame,
            isCache,
            menuType,
            visible,
            status,
            perms,
            icon,
            children
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        where.menuId = randomStr(8) // 菜单id随机生成



        let result = await mongodb.save('menu', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveAddMenu end

    // removeDeleteMenu Start
    removeDeleteMenu = async (ctx) => { // 菜单删除
        if ((await isPermission(ctx.userInfo, 'system:menu:remove')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id

        ctx.checkBody('_id', '数据唯一id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }



        let isId = await mongodb.findById('menu', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('menu', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeDeleteMenu end

    // updateEditeMenu Start
    updateEditeMenu = async (ctx) => { // 菜单修改
        if ((await isPermission(ctx.userInfo, 'system:menu:edit')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let _id = ctx.request.body._id
        let searchValue = ctx.request.body.searchValue
        let createBy = ctx.request.body.createBy
        let updateBy = ctx.request.body.updateBy
        let remark = ctx.request.body.remark
        let params = ctx.request.body.params
        let menuId = ctx.request.body.menuId
        let menuName = ctx.request.body.menuName
        let parentName = ctx.request.body.parentName
        let parentId = ctx.request.body.parentId
        let orderNum = ctx.request.body.orderNum
        let path = ctx.request.body.path
        let component = ctx.request.body.component
        let query = ctx.request.body.query
        let isFrame = ctx.request.body.isFrame
        let isCache = ctx.request.body.isCache
        let menuType = ctx.request.body.menuType
        let visible = ctx.request.body.visible
        let status = ctx.request.body.status
        let perms = ctx.request.body.perms
        let icon = ctx.request.body.icon
        let children = ctx.request.body.children

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        if (!isFrame) {
            isFrame = 1
        }
        if (!isCache) {
            isCache = 0
        }
        if (!visible) {
            visible = 0
        }
        if (!status) {
            status = 0
        }
        if (!icon) {
            icon = system
        }
        if (!children) {
            children = []
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }

        let updateParams = {
            searchValue,
            createBy,
            updateBy,
            remark,
            params,
            menuId,
            menuName,
            parentName,
            parentId,
            orderNum,
            path,
            component,
            query,
            isFrame,
            isCache,
            menuType,
            visible,
            status,
            perms,
            icon,
            children
        }

        updateParams.updateTime = new Date()

        let isId = await mongodb.findById('menu', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('menu', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateEditeMenu end

    // findWhereGetRouters Start
    findWhereGetRouters = async (ctx) => { // 获取路由数据

        const saveMenu = async (where) => { //保存菜单

            return await mongodb.save('menu', where)
        }
        const getMenuIds = async (roleId) => { //查询该角色满足权限的菜单id

            let where = {
                _id: roleId[0]
            }
            let otherWhere = {}
            // console.log('查询菜单添加如下')
            // console.log(where)
            return await mongodb.find('role', where)
        }


        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let otherWhere = {
            sort: {
                'orderNum': 1
            }
        }
        let menuIds = []
        if (!ctx.userInfo.admin) { // 如果不是admin用户则需设置查询条件
            let roleIds = ctx.userInfo.roleIds // 权限id
            // console.log('权限id为' + roleIds)
            let list = await getMenuIds(roleIds)
            //console.log('菜单id列表为')
            //console.log(list)
            list = list
            menuIds = []
            if (list.length > 0) {
                list.map(item => {
                    menuIds = menuIds.concat(item.menuIds)
                })
            }
            // where._id = menuIds // 查询条件 注意：这里按条件查询拼接之后的结果顺序不对，前端无法加载。
        }
        // console.log('打印查询条件')
        // console.log(where)
        let filerCode = {}




        let result = await mongodb.findWhere('menu', where, otherWhere, filerCode)
        result = result.list
        if (ctx.userInfo.admin && result.length < 1 && Object.keys(where).length < 1) { // 如果是超级管理员账号，且查询到的没有任何数据
            menuData.map(async item => { // 批量初始化数据
                await saveMenu(item)
            })
            result = menuData
        }
        // console.log(menuIds)
        let permissions = []
        if (!ctx.userInfo.admin) {
            result = result.map(item => {
                item.hidden = true
                //console.log('循环打印')
                //console.log(item._id)
                let isId = menuIds.find(item2 => {
                    if (item2 == item._id) {
                        permissions.push(item.perms)
                        return true
                    }

                })
                if (isId) {
                    item.hidden = false
                }
                return item
            })
        }


        result = handleTree(result, 'menuId', 'parentId', 'children') // 拼接为树结构
        // console.log(result)
        result = getRouter(result) // 再映射为动态路由

        // console.log(result)
        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereGetRouters end
















}
module.exports = new gui
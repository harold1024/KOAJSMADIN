const mongodb = require('../mongodb')
let permissData = []
let menuList = []

async function getPermission(){ // 重新刷新缓存获取权限管理数据
    // console.log("查询权限与菜单数据并加入到缓存中")
    permissData = await mongodb.findWhere('role', {start:0,limit:100}, {}, {})
    permissData = permissData.list
    menuList = await mongodb.find('menu', {})
    // console.log('各种权限查询与菜单缓存查询')
    // console.log(permissData)
    // console.log(menuList)
}

function setPermissData(data){ // 每次查询角色则自动刷新缓存
    // console.log(data)
    permissData = data
}
function setMenuList(data){ // 每次查询菜单则自动刷新缓存
    if(Array.isArray(data)){
        menuList = data
    }
}

async function isPermission(userInfo,permissKey){ // 判断是否满足权限
    if(permissData.length < 1){
        await getPermission()
    }
    // await getPermission() // 测试
    if(!userInfo){
        return false
    }
    if(userInfo.admin){ // 超级管理员不需要控制权限
        return true
    }
    // console.log("打印用户权限")
    // console.log(userInfo)
    
    let roleIds = userInfo.roleIds // 含有那些权限
    
    // roleIds = ['sJahxDgHqC'] // 测试 暂时写死测试，普通权限
    let menuIds = [] //将所有的菜单权限提取出来
    let result = false
    permissData.map(item=>{
        roleIds.map(item2=>{
            if(item2 == item._id){
                menuIds.push(...item.menuIds)
            }
        })
    })
    // console.log("过滤出来的权限id为")
    // console.log(menuIds)
    // console.log(Array.isArray(menuList))
    menuList.some(item=>{ // 数据查询到了就中断循环
        menuIds.some(item2=>{
            if(item2 == item._id){
                if(item.perms&&item.perms == permissKey){
                    // console.log("找到符合条件的数据")
                    // console.log(item)
                    result = true
                    return true
                }
            }
            if(result == true){
                return true
            }
        })
    })
    // console.log('打印结果' + result)
    return result 
}
module.exports = {
    getPermission,
    isPermission,
    setPermissData,
    setMenuList
}
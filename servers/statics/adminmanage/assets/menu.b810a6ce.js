import{z as n}from"./index.23926b0b.js";function d(e){let t={_id:e._id,searchValue:e.searchValue,createBy:e.createBy,updateBy:e.updateBy,remark:e.remark,params:e.params,menuId:e.menuId,menuName:e.menuName,parentName:e.parentName,parentId:e.parentId,orderNum:e.orderNum,path:e.path,component:e.component,query:e.query,isFrame:e.isFrame,isCache:e.isCache,menuType:e.menuType,visible:e.visible,status:e.status,perms:e.perms,icon:e.icon,children:e.children};return n({url:"/menu/update",method:"post",data:t})}function i(e){let t={_id:e._id};return n({url:"/menu/delete",method:"post",data:t})}function r(e){let t={searchValue:e.searchValue,createBy:e.createBy,updateBy:e.updateBy,remark:e.remark,params:e.params,menuId:e.menuId,menuName:e.menuName,parentName:e.parentName,parentId:e.parentId,orderNum:e.orderNum,path:e.path,component:e.component,query:e.query,isFrame:e.isFrame,isCache:e.isCache,menuType:e.menuType,visible:e.visible,status:e.status,perms:e.perms,icon:e.icon,children:e.children};return n({url:"/menu/add",method:"post",data:t})}function o(e){let t={menuName:e.menuName,status:e.status};return n({url:"/system/menu/list",method:"get",params:t})}function c(e){let t={_id:e._id};return n({url:"/menu/infot",method:"get",params:t})}export{c as a,o as f,i as r,r as s,d as u};

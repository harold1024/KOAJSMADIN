import{z as o}from"./index.23926b0b.js";function d(t){let e={_id:t._id};return o({url:"/post/data",method:"get",params:e})}function u(t){let e={_id:t._id,searchValue:t.searchValue,createBy:t.createBy,updateBy:t.updateBy,remark:t.remark,params:t.params,postId:t.postId,postCode:t.postCode,postName:t.postName,postSort:t.postSort,status:t.status,flag:t.flag};return o({url:"/post/update",method:"post",data:e})}function r(t){let e={searchValue:t.searchValue,createBy:t.createBy,updateBy:t.updateBy,remark:t.remark,params:t.params,postId:t.postId,postCode:t.postCode,postName:t.postName,postSort:t.postSort,status:t.status,flag:t.flag};return o({url:"/post/add",method:"post",data:e})}function a(t){let e={_id:t._id};return o({url:"/post/delete",method:"post",data:e})}function l(t){let e={start:t.start,limit:t.limit,searchValue:t.searchValue,createBy:t.createBy,updateBy:t.updateBy,remark:t.remark,params:t.params,postId:t.postId,postCode:t.postCode,postName:t.postName,postSort:t.postSort,status:t.status,flag:t.flag};return o({url:"/post/list",method:"get",params:e})}export{l as a,d as f,a as r,r as s,u};

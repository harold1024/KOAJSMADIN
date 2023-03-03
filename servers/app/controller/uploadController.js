const response = require('../utils/response')
const fs = require('fs')
const path = require('path')
const config = require('../config')
const mkdirs = require('../utils/mikdirs')
const {
    isPermission
} = require('../utils/permissions')
class uploadController{
    upload= async (ctx)=>{ // 手写上传方法
        const file = (ctx.request.files||ctx.request.file).file
        
        // if ((await isPermission(ctx.userInfo, 'system:upload:img')) == false) { // 图片上传添加权限  移动端的用户都是刚注册的，并没有任何权限，暂时去掉权限判断
        //     return response.error(ctx, '对不起您的权限不足')
        // }
        let filePath1 = ctx.query.filePath1
        
        let filePath2 = ctx.query.filePath2
        if(file){
            const fileType = file.type
            const typeSet = new Set(['image/jpeg','image/jpg','image/gif','image/png'])
            const size = file.size
            if(!typeSet.has(fileType)){
                return response.error(ctx,'非法文件上传')
            }
            if(size > 2 * 1024 * 1024){
                return response.error(ctx,'文件大小不得大于两兆')
            }
            // console.log(file)
            const reader = fs.createReadStream(file.path)
            const ext = path.extname(file.name)||'.jpg' // 获取文件后缀格式
            let filePath = '/upload/' + this.randomStr(32) + ext
            if(filePath1){ // 加一个文件夹
                filePath = '/upload/' + filePath1 + '/' + this.randomStr(32) + ext
                if(filePath2){
                    filePath = '/upload/' + filePath1 + '/'+ filePath2 + '/' + this.randomStr(32) + ext
                }
            }
            
            mkdirs.mkdirs('../../' + path.dirname(config.static.path + filePath), err => {// 自动生成文件夹
                console.log(err); // 错误的话，直接打印
             })
            //  return response.error(ctx,'上传失败,文件不能为空')
            
            const writer = fs.createWriteStream(config.static.path + filePath)
            reader.pipe(writer)
            response.success(ctx,{file:filePath})
        }else{
            return response.error(ctx,'上传失败,文件不能为空')
        }
    }
    randomStr = (lenght)=>{ // 生成随机内容
        const seeder = `ABCDEFGHIJKLMNOPQRSTUVWXVZabcdefghijklmnopqrstuvwxvz123456789`
        let randomStr = ''
        for(let i=0;i<lenght;i++){
            randomStr += seeder.charAt(Math.floor(Math.random()*seeder.length))
        }
        return randomStr
    }
}

module.exports =  new uploadController

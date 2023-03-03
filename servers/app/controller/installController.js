const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')

class gui{
	// addCode
			
			
			// cR0Lucs6U Start
		
         saveInstall = async (ctx)=>{ // install-安装
            
          const isInstall = async()=>{ //是否安装过
            
            let where = {}
        	  
            return  await mongodb.findOne('install', where)
        }
        	  
        	let dbName = ctx.request.body.dbName
        	let username = ctx.request.body.username
        	let password = ctx.request.body.password
        	let host = ctx.request.body.host
        	let port = ctx.request.body.port
        	let jwtCode = ctx.request.body.jwtCode
            
        	if(!host){
        		host = 'localhost'
        	}
        	if(!port){
        		port = '27017'
        	}
          let errors = await ctx.validationErrors()
          if(errors){
            response.error(ctx,errors[0].msg)
            return
          }
            
        	let where = {dbName,username,password,host,port,jwtCode}
            
            
            where.createTime = new Date()
            where.updateTime = new Date()
        	let mongoConfig = {
              	db_host:host,
        		db_name:dbName,
        		db_user:username,
        		db_port:port,
        		db_pwd:password
            }
          var isConent = mongodb.isConnet(mongoConfig)
           return response.success(ctx,isConent)
        
        	// 先尝试连接数据库
        	// 再查看是否有安装过，读取env文件 找打isInstall 字段，如果有则表示已安装过
        	// 修改env配置文件并且添加isInstall进行标记
        	// 重启服务
            
            
            
                let result = await mongodb.save('install',where)
                    
                if(result != false){
                  response.success(ctx,result)
                }else{
                  response.error(ctx,'服务器错误')
                }
            
            
        }
		// cR0Lucs6U end
			

}
module.exports =  new gui
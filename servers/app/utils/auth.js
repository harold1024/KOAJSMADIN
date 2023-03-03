/**
 * v0.0.1 jwt加密解密
 * sign添加time参数，过期时间可以自己控制。比如两分钟则 time = 60*2
 */
var jwt = require('jsonwebtoken')
var config = require('../config')
function sign(data,time){
    if(typeof(data) == 'object'){
        data = {...data} // 重新解析一遍
    }
    if(!time){
        time = config.jwt.jwt_expire
    }
    return jwt.sign(data,config.jwt.jwt_secret,{expiresIn:time})
}

function verify(token){
    try{
        const decoded = jwt.verify(token,config.jwt.jwt_secret)
        return {
            admin:decoded,
            error:null
        }
    }catch(err){
        return {
            admin:null,
            error:err
        }
    }
}
module.exports = {
    sign,
    verify
}
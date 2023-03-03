const randomStr = (lenght)=>{ // 生成随机数
    const seeder = `ABCDEFGHIJKLMNOPQRSTUVWXVZabcdefghijklmnopqrstuvwxvz123456789`
    let randomStr = ''
    for(let i=0;i<lenght;i++){
        randomStr += seeder.charAt(Math.floor(Math.random()*seeder.length))
    }
    return randomStr
}
module.exports = {
    randomStr
}
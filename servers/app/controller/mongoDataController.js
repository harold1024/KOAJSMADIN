const logger = require('../logger')
const mongodb = require('../mongodb')
const response = require('../utils/response')
const paginate = require('../utils/paginate')
const moment = require('moment')
const {
    getDirectoryList
} = require('../utils/guiGetFirectory')
const {
    spawn
} = require('child_process');
const path = require('path');
const fs = require('fs')
const {
    exec
} = require('child_process');
const {
    isPermission
} = require('../utils/permissions')
class gui {
    // addCode
    // findOneMongoData Start
    findOneMongoData = async (ctx) => { // 数据库备份记录-详细信息



        let _id = ctx.query._id

        ctx.checkQuery('_id', '数据唯一id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }





        let result = await mongodb.findOne('mongoData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneMongoData end

    // findOneMongoDirectory Start
    findOneMongoDirectory = async (ctx) => { // 数据库备份记录-获取数据库目录




        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let pathDir = path.join(__dirname, `../../backup/`) // 服务器linx系统不认这个符合 \\
        if (process.env.NODE_ENV == 'production') {
            pathDir = path.join(__dirname, `backup/`)
        }
        //console.log('地址如下：')
        //console.log(pathDir)
        let list = getDirectoryList(pathDir).map(item => {
            let dbName = getDirectoryList(path.join(pathDir, item, '/')) || [] // 获取数据库名称，也就是子文件夹名称
            if (dbName.length > 0) {
                dbName = dbName[0]
            }
            var obj = {
                name: item,
                pathDir: path.join(pathDir + item, dbName)
            }
            return obj
        })
        return response.success(ctx, list)



        let result = await mongodb.findOne('mongoData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findOneMongoDirectory end

    // updateMongoData Start
    updateMongoData = async (ctx) => { // 数据库备份记录-更新



        let _id = ctx.request.body._id
        let name = ctx.request.body.name
        let pathDir = ctx.request.body.pathDir
        let downNum = ctx.request.body.downNum
        let downUrl = ctx.request.body.downUrl

        ctx.checkBody('_id', '列表唯一id 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            _id
        }

        let updateParams = {
            name,
            pathDir,
            downNum,
            downUrl
        }

        updateParams.updateTime = new Date()

        where.userId = ctx.userInfo._id
        let isId = await mongodb.findById('mongoData', _id)
        if (!isId) {
            return response.error(ctx, '更新失败id没找到')
        }

        let result = await mongodb.update('mongoData', where, updateParams)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // updateMongoData end

    // saveMongoData Start
    saveMongoData = async (ctx) => { // 数据库备份记录-新增



        let name = ctx.request.body.name
        let pathDir = ctx.request.body.pathDir
        let downNum = ctx.request.body.downNum
        let downUrl = ctx.request.body.downUrl

        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            name,
            pathDir,
            downNum,
            downUrl
        }

        where.createTime = new Date()
        where.updateTime = new Date()

        where.userId = ctx.userInfo._id


        let result = await mongodb.save('mongoData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveMongoData end

    // removeMongoData Start
    removeMongoData = async (ctx) => { // 数据库备份记录-删除



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



        let isId = await mongodb.findById('mongoData', _id)
        if (!isId) {
            return response.error(ctx, '删除失败id未找到')
        }

        let result = await mongodb.remove('mongoData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // removeMongoData end

    // findWhereMongoData Start
    findWhereMongoData = async (ctx) => { // 数据库备份记录-分页查询



        let startTime = ctx.query.startTime
        let endTime = ctx.query.endTime
        let start = ctx.query.start
        let limit = ctx.query.limit
        let name = ctx.query.name
        let pathDir = ctx.query.pathDir
        let downNum = ctx.query.downNum
        let downUrl = ctx.query.downUrl

        if (!start) {
            start = 0
        }
        if (!limit) {
            limit = 10
        }
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {}

        let otherWhere = {
            limit: limit,
            skip: start,
            sort: {
                'createTime': -1
            }
        }
        otherWhere.limit = parseInt(limit)
        otherWhere.skip = parseInt(start)
        if (startTime && endTime) {
            where.createTime = {
                $gte: startTime,
                $lt: endTime
            }
        }
        let filerCode = {}




        let result = await mongodb.findWhere('mongoData', where, otherWhere, filerCode)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // findWhereMongoData end

    // saveMongoDataBackdown Start
    saveMongoDataBackdown = async (ctx) => { // 数据库-执行还原操作
        if ((await isPermission(ctx.userInfo, 'system:mongo:recover')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let pathDir = ctx.request.body.pathDir

        ctx.checkBody('pathDir', '目录 不能为空').notEmpty()
        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            pathDir
        }

        // mongorestore --db ${process.env.DB_NAME} --drop ${pathDir}
        let mongoCmd = `mongorestore --db ${process.env.DB_NAME} --drop ${pathDir}`
        if (process.env.DB_PASSWORD) { // 如果需要密码
            mongoCmd = `mongorestore -u  ${process.env.DB_USER} -p ${process.env.DB_PASSWORD} --authenticationDatabase admin --db ${process.env.DB_NAME} --drop ${pathDir}`
        }
        console.log(mongoCmd)
        exec(mongoCmd, (err, stdout, stderr) => {
            if (err) {
                console.error(err);

                return;
            }

        });
        return response.success(ctx, '还原完成')

        where.userId = ctx.userInfo._id


        let result = await mongodb.save('mongoData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveMongoDataBackdown end

    // saveMongoDataBackup Start
    saveMongoDataBackup = async (ctx) => { // 数据库-执行备份操作
        if ((await isPermission(ctx.userInfo, 'system:mongo:backup')) == false) {
            return response.error(ctx, '对不起您的权限不足')
        }


        let name = ctx.request.body.name
        let pathDir = ctx.request.body.pathDir
        let downNum = ctx.request.body.downNum
        let downUrl = ctx.request.body.downUrl

        let errors = await ctx.validationErrors()
        if (errors) {
            response.error(ctx, errors[0].msg)
            return
        }

        let where = {
            name,
            pathDir,
            downNum,
            downUrl
        }

        where.createTime = new Date()
        where.updateTime = new Date()
        let saveName = moment().format('YYY-MM-DD-HH-mm-ss')

        pathDir = path.join(__dirname, '../', '../', path.normalize(`/backup/${saveName}`)) // 不要用\\ 服务器linux系统不支持

        // fs.mkdir(pathDir,function(err){
        //     if(err) console.error('err',err);
        //     console.log('创建目录成功');
        // });

        if (process.env.NODE_ENV == 'production') {
            pathDir = path.join(__dirname, path.normalize(`/backup/${saveName}`))
        }
        let mongoCmd = `mongodump -h ${process.env.DB_HOST} --port ${process.env.DB_PORT}  -d ${process.env.DB_NAME} -o ${pathDir}`
        if (process.env.DB_PASSWORD) { // 如果需要密码
            mongoCmd = `mongodump -h ${process.env.DB_HOST} --port ${process.env.DB_PORT} -u ${process.env.DB_USER} -p ${process.env.DB_PASSWORD} -d ${process.env.DB_NAME} -o ${pathDir}`
        }

        exec(mongoCmd, (err, stdout, stderr) => {
            console.error("mongoCmd",mongoCmd);
            if (err) {
                console.error("789654");
                console.error("err",err);
                return;
            }
            console.log('执行成功');
            console.log(stdout);

        });
        where.name = saveName
        where.pathDir = pathDir //path.join(__dirname, `\\..\\..\\backup\\${saveName}`)

        //return response.success(ctx, '备份完成')

        where.userId = ctx.userInfo._id


        let result = await mongodb.save('mongoData', where)

        if (result != false) {
            response.success(ctx, result)
        } else {
            response.error(ctx, '服务器错误')
        }


    }
    // saveMongoDataBackup end





}
module.exports = new gui
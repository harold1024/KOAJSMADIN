/**
* v0.0.5 添加count方法统计数量
* find添加{lean: true}参数，让查出来的数据可以修改。修复查询数据不能改的问题
* 更新方法修改，没有则不要插入  
**/
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('../logger')
const config = require('../config')
const tableConfig = require('../tables')
const options = config.db
console.log("配置信息如下")
console.log(options)
let dbURL = ''
if (options.db_pwd) {   // 若有密码则写法如下，注意：没密码切勿用此写法
  dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name + '?authSource=admin';
} else {
  dbURL = "mongodb://" + options.db_host + ":" + options.db_port + "/" + options.db_name; // mongodb://localhost:27017/koaadmin
}
console.log(dbURL)
const db = mongoose.connect(dbURL); // , {useMongoClient: true}
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function (err) {
  if (err) logger.error('Database connection failure ');
});

mongoose.connection.on('error', function (err) {
  logger.error('Mongoose connected error ' + err);
});

mongoose.connection.on('disconnected', function () {
  logger.error('Mongoose disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

const mongoClient = {}

const isConnet = (options)=>{ // 是否可以连接数据库
  let dbURL = ''
  if (options.db_pwd) {   // 若有密码则写法如下，注意：没密码切勿用此写法
    dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name + '?authSource=admin';
  } else {
    dbURL = "mongodb://" + options.db_host + ":" + options.db_port + "/" + options.db_name; // mongodb://localhost:27017/koaadmin
  }
  // console.log(dbURL)
  const db = mongoose.connect(dbURL); // , {useMongoClient: true}
  // console.log(db)
  return db
}

const getConnection = (table_name) => { // 获取链接状态并构建数据表
  if (!table_name) return;
  if (!DB.tabConf[table_name]) {
    logger.error('No table structure');
    return false;
  }

  let client = mongoClient[table_name];
  if (!client) {

    let tConf = DB.tabConf[table_name]
    //构建用户信息表结构
    let nodeSchema = new mongoose.Schema(tConf); // 构建用户表不要乱添加插入字段，自动生成配置文件时把id,创建日期，更新日期，用户id都自动添加上即可


    //构建model
    client = mongoose.model(table_name, nodeSchema, table_name);
    mongoClient[table_name] = client;
  }
  return client;
}


const save = async (table_name, fields) => { // 保存数据
  if (!fields || !table_name) {
    logger.error('保存失败，表内容与表名称不能为空');
    return false;
  }
  let err_num = 0;
  let errArr = [] // 记录一下传递错误的字段，好排查错误
  for (let i in fields) {
    if (!DB.tabConf[table_name][i]) {
      errArr.push(i + "--" + DB.tabConf[table_name][i])
      err_num++; // 比对所传参数，表中是否有配置
    }
  }

  if (err_num > 0) {
    logger.error('保存失败，所传参数不正确,错误的参数有' + errArr.join("  "));
    return false;
  }
  let node_model = getConnection(table_name);
  let mongooseEntity = node_model(fields);
  return await mongooseEntity.save();
}

const findOne = async (table_name, conditions,filterParams) => { // 查询详情
  let node_model = getConnection(table_name);
  return await node_model.findOne(conditions,filterParams,{lean: true})
}

const findWhere = async (table_name, conditions, options, filterParams) => { // 条件查询   filterParams为对象表示过滤0为过滤   filterParams{name:1} 则会显示name值
  let node_model = getConnection(table_name);
  let list = node_model.find(conditions);
  let total = await node_model.find(conditions).count()
  list = await node_model.find(conditions, filterParams,{lean: true}).select(options.fields || '').sort(options.sort || {}).limit(options.limit || {}).skip(options.skip || 0)
  return {
    total,
    list
  }
}
const count = async (table_name,conditions)=>{
  let node_model = getConnection(table_name);
  let total = await node_model.find(conditions).count()
  return total
}

const find = async (table_name, conditions, fields) => { // 查询多条数据
  let node_model = getConnection(table_name)
  return (await node_model.find(conditions, fields || null,{lean: true})||[]) // 没有数据则返回空数组
}

const findById = async (table_name, _id) => { // 根据id查询
  let node_model = getConnection(table_name);
  return await node_model.findById(_id)
}

const remove = async (table_name, conditions) => { // 删除数据
  let node_model = getConnection(table_name);
  return await node_model.remove(conditions)
}
const update = async (table_name, conditions, update_fields) => { // 更新数据
  let node_model = getConnection(table_name);
  return await node_model.findOneAndUpdate(conditions, {
    $set: update_fields
  }, {
    multi: true,
    upsert: false
  })
}


const updateData = async (table_name, conditions, update_fields) => { // 更新数据自己写操作符
  let node_model = getConnection(table_name);
  return await node_model.findOneAndUpdate(conditions, update_fields, {
    multi: true,
    upsert: false
  })
}





const DB = {
  isConnet,
  mongoClient,
  getConnection,
  tabConf: tableConfig,
  save,
  findOne,
  findWhere,
  findById,
  update,
  updateData,
  remove,
  find,
  count
}

module.exports = DB

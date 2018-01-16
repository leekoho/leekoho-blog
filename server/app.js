/**
 * Created by leekoho on 2018/1/12.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
import koa from 'koa'
import config from './config/index'
import mongose from 'mongoose'
import api from './api'
import middleware from './middleware/index'
import fs from 'fs'
import logUtil from './utils/log'
import logConfig from './config/log'
import responseFormatter from './middleware/response_formatter'

const {host, database, auth} = config.mongodb

mongose.connect(`mongodb://${host}/${database}`, auth)
mongose.connection.on('error', (error) => {
  console.log(`数据库连接失败, error: ${error}`)
  throw new Error('数据库连接失败')
})

/**
 * 确定日志目录是否存在，如果不存在则创建日志目录
 */
let confirmPath = (pathStr) => {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr)
    console.log('createPath: ' + pathStr)
  }
}

/**
 * 初始化log相关目录
 */
let initLogPath = () => {
  //创建log的根目录'logs'
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath)
    //根据不同的logType创建不同的文件目录
    for (let i = 0, len = logConfig.appenders.length; i < len; i++) {
      if (logConfig.appenders[i].path) {
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
      }
    }
  }
}

initLogPath()

// 创建一个Koa对象表示web app本身:
const app = new koa()

app.use(async(ctx, next) => {
  const start = new Date()
  let ms = null
  try {
    await next()
    ms = new Date() - start
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start
    logUtil.logError(ctx, error, ms)
  }
})

app.use(responseFormatter(`^${config.app.baseApi}`))

app.use(middleware())

app.use(api())

// 在端口3000监听:
app.listen(config.app.port)
console.log(`app started at port ${config.app.port}...`)

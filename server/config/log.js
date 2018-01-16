/**
 * Created by leekoho on 2018/1/13.
 */
import path from 'path'

const baseLogPath = path.resolve(__dirname, '../logs')

const errPath = '/error'
const errFileName = 'error'
const errLogPath = `${baseLogPath}${errPath}/${errFileName}`

const resPath = '/response'
const resFileName = 'response'
const resLogPath = `${baseLogPath}${resPath}/${resFileName}`

export default {
  appenders: {
    out: {type: 'console'},
    errorLogger: {
      type: 'dateFile',
      filename: errLogPath,
      encoding: 'utf-8',
      maxLogSize: 2000000,
      numBackups: 5,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      path: errPath
    },
    resLogger: {
      type: 'dateFile',
      filename: resLogPath,
      encoding: 'utf-8',
      maxLogSize: 2000000,
      numBackups: 5,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      path: resPath
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    },
    errorLogger: {
      appenders: ['errorLogger'],
      level: 'error'
    },
    resLogger: {
      appenders: ['resLogger'],
      level: 'info'
    },
  },
  baseLogPath: baseLogPath
}
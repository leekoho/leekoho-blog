const APPNAME = 'leekoho-blog'
const SERVER = {
  host: '97.64.47.175',
  username: 'root',
  password: 'ljh68584549',
  port: 26588,
  dest: `/var/www/${APPNAME}/server`
}

const path = require('path')
const gulp = require('gulp')
// sftp上传
const scp = require('gulp-scp2')
// 把gulp的任务当作同步处理
const sequence = require('gulp-sequence')

const DIST_PATH = path.resolve(__dirname)

gulp.task('deploy', () => {
  return gulp.src(path.join(DIST_PATH, '/**'))
    .pipe(scp(Object.assign(SERVER, {
      watch (client) {
        client.on('write', o => {
          console.log(`正在上传文件到服务器:  ${o.destination}`)
        })
      }
    })))
    .on('error', err => {
      console.log(err)
    })
})

gulp.task('default', sequence('deploy', () => {
  console.log('上传完成')
}))

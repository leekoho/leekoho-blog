/**
 * Created by leekoho on 2018/1/13.
 */
const config = {
  app: {
    port: process.env.Port || 3000,
    baseApi: '/api'
  },
  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'leekoho-blog',
    auth: {
      user: '',
      pwd: ''
    }
  },
  jwt: {
    secret: 'leekoho-blog',
    // token过期时间 => 24小时 * 30
    expiration: Math.floor(Date.now() / 1000) + 24 * 3600 * 30
  },
  admin: {
    username: 'leekoho',
    password: '12345678'
  }
}

export default config
const path = require('path')
const Redis = require('ioredis')

const redisConfig = {
  host: '127.0.0.1',
  port: 6379,
  password: '1234',
  db: 0
}

exports.keys = 'onixinfo-api'

exports.security = {
  csrf: {enable: false}
}

exports.middleware = ['ratelimit']

exports.redis = {
  client: redisConfig
}

exports.ratelimit = {
  db: new Redis(redisConfig),
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total',
  },
  disableHeader: false,
  errorMessage: 'Rate Limit Exceeded',
  duration: 10 * 60 * 1000,
  max: 10 * 60
}

exports.io = {
  redis: {
    ...redisConfig,
    key: 'onixinfo-api-socket.io'
  },
  namespace: {
    '/': {connectionMiddleware: ['connection']}
  }
}

exports.sequelize = {
  dialect: 'mysql',
  database: 'onix_mainnet',
  host: 'localhost',
  port: 3306,
  username: 'onix',
  password: ''
}

exports.onix = {
  chain: 'mainnet'
}

exports.onixinfo = {
  path: path.resolve('..', 'onixinfo'),
  port: 3002,
  rpc: {
    protocol: 'http',
    host: 'localhost',
    port: 5889,
    user: 'user',
    password: 'password'
  }
}

exports.cmcAPIKey = null

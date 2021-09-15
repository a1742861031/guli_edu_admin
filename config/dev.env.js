'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:9000/"',
  OSS_PATH: '"https://guli-edu-bobo0125.oss-cn-chengdu.aliyuncs.com"'
})

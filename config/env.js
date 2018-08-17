/**
 * @file 项目配置文件
 *
 * @AUTH 默认账户
 * @mongo && port  数据库连接配置
 * @QINIU 七牛密钥
 * @QCLOUD 腾讯云相关信息
 * @GITHUB github账号
 *
 * @development 开发环境配置
 * @production  生产环境配置
 */

//console.log('__dirname=' + __dirname);

// TODO 密钥信息存放在加密数据库
let {AUTH, QINIU, QCLOUD, EMAIL, AKISMET, BAIDU, SPOTIFY} = require('./key/server.json')

const APP = {
    ROOT_PATH: __dirname,
    LIMIT: 16
}

const INFO = {
    title: 'koa2-rest-server',
    version: '1.0.0',
    author: 'anson',
    site: 'https://www.1ktips.com',
    GA: 'UA-60588613-1',
    with: ['Node.js', 'MongoDB', 'Koa2', 'Nginx']
}

const GITHUB = {
    account: 'anyonghua',
}

const session = {
    key: 'KOA_REST_SESSION',
    maxAge: 604800000,
    overwrite: true,
    signed: true,
}

module.exports = {
    // 开发环境配置
    development: {
        AUTH,
        APP,
        INFO,
        QINIU,
        QCLOUD,
        GITHUB,
        session,
        EMAIL,
        AKISMET,
        BAIDU,
        SPOTIFY,
        mongo: {
            uri: 'mongodb://localhost:27017/koa2-rest-server-dev'
        },
        redis: {
            uri: 'redis://localhost:6379/0'
        },
        port: '8090'
    },

    // 生产环境配置
    production: {
        AUTH,
        APP,
        INFO,
        QINIU,
        QCLOUD,
        GITHUB,
        session,
        EMAIL,
        AKISMET,
        BAIDU,
        SPOTIFY,
        mongo: {
            uri: 'mongodb://localhost:27017/koa2-rest-server-prd'
        },
        redis: {
            uri: 'redis://localhost:6379/1'
        },
        port: '8090'
    }
}

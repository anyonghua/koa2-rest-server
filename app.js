require('app-module-path').addPath(__dirname + '/');

const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')

const convert = require('koa-convert')
const bodyparser = require('koa-bodyparser')()
//const logger = require('koa-logger')
const logger = require('./middlewares/log4js')

const mongodb = require('db/mongodb')
const mongoosePaginate = require('mongoose-paginate')
const redis = require('db/redis')

const config = require('config/env')[process.env.NODE_ENV || 'development']
const middleware = require('middlewares')
const router = require('./routes')

// data server
mongodb.connect()
redis.connect()

// global options
mongoosePaginate.paginate.options = {
    limit: config.APP.LIMIT
}

app.proxy = true

app.use(cors({
    credentials: true
}))

// middleware
app
    .use(convert(logger()))
    .use(bodyparser)

// logger
/*
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    //console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    console.log(`响应时间为: ${(ms / 1000).toFixed(4)}s, 请求 url : ${ctx.request.method} - ${ctx.request.url}, Status Code : ${ctx.response.status}, UA : ${ctx.request.header['user-agent']}`);
})
*/

// router
app.use(middleware.errorHandler)
app.use(router.routes(), router.allowedMethods())

module.exports = app

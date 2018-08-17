const log4js = require('log4js');

const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];

module.exports = () => {

    const contextLogger = {};

    log4js.configure({
        appenders: {
            console: {
                type: 'stdout',
            },
            error: {
                type: 'file',           //日志类型
                category: 'errLogger',    //日志名称
                filename: __dirname + '/../logs/error.log', //日志输出位置，当目录文件或文件夹不存在时自动创建
                maxLogSize: 104800, // 文件最大存储空间
                backups: 100  //当文件内容超过文件存储空间时，备份文件的数量
            },
            response: {
                type: 'dateFile',
                encoding: 'utf-8',
                filename: __dirname + '/../logs/responseLog',
                layout: {
                    type: "pattern",
                    pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
                },
                pattern: "-yyyy-MM-dd.log",
                alwaysIncludePattern: true,
            },
        },
        categories: {
            error: {appenders: ['error'], level: 'error'},
            response: {appenders: ['response'], level: 'debug'},
            default: {appenders: ['response','console'], level: 'debug'}
        },
        replaceConsole: true
    });

    // 获取默认 log4js category
    const logger = log4js.getLogger('default');

    return async (ctx, next) => {
        const start = Date.now();

        // 循环 methods 将所有方法挂载到ctx 上
        methods.forEach(method => {
            contextLogger[method] = (message) => {
                logger[method](message);
            }
        });

        // 为 ctx 增加 log 方法，并且指定 log 属性不可删除或修改
        // 防止后续错误修改 ctx 属性
        Object.defineProperty(ctx, 'log', {
            value: contextLogger,
            writable: false,
            enumerable: true,
            configurable: false
        });

        await next();
        const end = Date.now();
        const responseTime = end - start;
        ctx.log.info(`响应时间为: ${(responseTime / 1000).toFixed(4)}s, 请求 url : ${ctx.request.method} - ${ctx.request.url}, Status Code : ${ctx.response.status}, UA : ${ctx.request.header['user-agent']}`);
    }
};

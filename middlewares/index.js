/**
 * @file middlewares统一出口
 */

const verifyToken = require('./verifyToken')
const errorHandler= require('./errorHandler')

module.exports = {
  verifyToken,
  errorHandler
}

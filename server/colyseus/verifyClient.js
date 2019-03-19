const consola = require('consola')
/**
 * Verification function to verify clients
 * 
 * @param {*} info
 * @param {string} info.origin - Origin of sender
 * @param {Object} info.req - Request object of sender
 * @param {boolean} info.secure - Flag determining if request secure
 * @param {function} next - callback(result, code, msg)
 * @returns {*}
 */
module.exports = function verifyClient({origin, req, secure}, next) {
  consola.info('verifyClient - origin', origin)
  consola.info('verifyClient - req', req)
  consola.info('verifyClient - secure', secure)
  return next(true, 200, 'Message')
}
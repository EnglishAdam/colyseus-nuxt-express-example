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
  // Acceptable urls
  const urls = [
    'http://colyseus-nuxt-express.herokuapp.com/',
    'https://colyseus-nuxt-express.herokuapp.com/'
  ]

  // Set local url
  const localOrigin = 'http://localhost:3000'
  
  // Get handshake url & serverToken
  const url = new URL(origin + req.url);
  const serverToken = url.searchParams.get('serverToken')

  console.log('origin', origin)
  console.log('serverToken', url.searchParams.get('serverToken'))
  console.log('process.env.SERVER_TOKEN', process.env.SERVER_TOKEN)

  // If from local host need server token
  if (origin === localOrigin && serverToken !== process.env.SERVER_TOKEN) next(false, 401, 'Unable to connect')

  // If from web needs to come from accepted origin
  if (!urls.includes(origin)) next(false, 401, 'Unable to connect')

  // Accept handshake
  return next(true, 200, 'Message')
}

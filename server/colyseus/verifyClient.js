const consola = require('consola')

const isServerTokenWorking = false

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

  // If from local host need server token
  if (origin === localOrigin) {
    if (!isServerTokenWorking) return next(true)
    else if (serverToken !== process.env.SERVER_TOKEN) return next(false, 401, 'Unable to connect')
  }

  // If from web needs to come from accepted origin
  if (origin !== localOrigin && !urls.includes(origin)) return next(false, 401, 'Unable to connect')

  // Accept handshake
  return next(true)
}

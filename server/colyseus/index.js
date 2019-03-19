
// Colyseus
const consola = require('consola')
const http = require('http')
const colyseus = require("colyseus");

// Get utility functions
const verifyClient = require('./verifyClient')

// Rooms
const rooms = require('./rooms/rooms')


/**
 * Initialises colyseus game server and returns is
 * 
 * @param {Express} app - Express application
 * @returns {Server} gameServer - coluseus game server
 */
module.exports = function createGameServer (app) {
  consola.info({ message: 'Colyseus - Creating game server.', badge: true })
  
  /**
   * Create game server
   * 
   * new colyseus.Server({
   *  server: http.createServer(app)
   *  verifyClient: ({origin, req, secure}, next) => { next(result, code, message) }
   *  presents: new colyseus.RedisPresence(clientOpts)
   *  gracefullyShutdown: true
   * })
   */
  const gameServer = new colyseus.Server({
    server: http.createServer(app),
    verifyClient
  });
  
  // Register chat room
  rooms.forEach(room => {
    consola.info({ message: `Colyseus - Registering room "${room.name}".`, badge: true })
    gameServer.register(room.name, room.room, room.options);
  });
  
  // return game server
  return gameServer
}
const colyseus = require('colyseus')
const consola = require('consola')
const Room = colyseus.Room

class ChatRoom extends Room {
    constructor() {
        super()
        // this room supports only 4 clients connected
        this.maxClients = 4;
    }

    onInit (options) {
        consola.log("BasicRoom created!", options);
    }

    onJoin (client) {
        this.broadcast(`${ client.sessionId } joined.`);
    }

    onLeave (client) {
        this.broadcast(`${ client.sessionId } left.`);
    }

    onMessage (client, data) {
        consola.log("BasicRoom received message from", client.sessionId, ":", data);
        this.broadcast(`(${ client.sessionId }) ${ data.message }`);
    }

    onDispose () {
        consola.log("Dispose BasicRoom");
    }

}

module.exports = ChatRoom
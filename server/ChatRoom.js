const colyseus = require('colyseus')
const Room = colyseus.Room

class ChatRoom extends Room {
    constructor() {
        super()
        // this room supports only 4 clients connected
        this.maxClients = 4;
    }

    onInit (options) {
        console.log("BasicRoom created!", options);
    }

    onJoin (client) {
        this.broadcast(`${ client.sessionId } joined.`);
    }

    onLeave (client) {
        this.broadcast(`${ client.sessionId } left.`);
    }

    onMessage (client, data) {
        console.log("BasicRoom received message from", client.sessionId, ":", data);
        this.broadcast(`(${ client.sessionId }) ${ data.message }`);
    }

    onDispose () {
        console.log("Dispose BasicRoom");
    }

}

module.exports = ChatRoom
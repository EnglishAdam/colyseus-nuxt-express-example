const consola = require('consola')
const colyseus = require('colyseus')
const Room = colyseus.Room
const State = require('./State')

class ChatRoom extends Room {
    constructor() {
        super()
        // this room supports only 4 clients connected
        this.maxClients = 4
    }

    onInit (options) {
        consola.log("onInit")
        this.setState(new State())
    }

    requestJoin (options, isNew) {
        consola.log("requestJoin")
        return true
    }

    onAuth (options) {
        consola.log("onAuth")
        return true
    }

    onJoin (client, options, auth) {
        consola.log("onJoin")
        this.state.addUser(client, auth.name)
        this.broadcast(`${ client.sessionId } joined.`)
    }

    onMessage (client, data) {
        consola.log("BasicRoom received message from", client.sessionId, ":", data)
        this.broadcast(`(${ client.sessionId }) ${ data.message }`)
    }

    onLeave (client) {
        consola.log("onLeave", client)
        this.state.removeUser(client, name)
        this.broadcast(`${ client.sessionId } left.`)
    }

    onDispose () {
        consola.log("Dispose BasicRoom")
    }

}

module.exports = {
    name: 'chat',
    room: ChatRoom,
    options: {
        test: 'testOption'
    }
}
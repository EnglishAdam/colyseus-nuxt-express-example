class User {
  constructor(name = 'Unknown') {
    this.name = name
  }
}

class State {
  constructor() {
    this.user = {}
  }

  addUser (client, name) {
    this.user[client.sessionId] = new User(name)
  }

  removeUser (client) {
    if (this.user[client.sessionId] != null) delete this.user[client.sessionId]
  }
}

module.exports = State
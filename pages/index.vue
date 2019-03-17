<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12>
      <v-btn @click="login">Login</v-btn>
    </v-flex>
    <!-- Login Button -->

    <v-flex xs12>
      <v-text-field v-model="message" />
      <v-btn @click="add">Add Message</v-btn>
    </v-flex>
    <!-- Add Message -->

    <v-flex xs12>
      <p v-for="(message, index) in messages" :key="index">{{message}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import * as Colyseus from "colyseus.js"

export default {

  data() {
    return {
      message: '',
      messages: [],
      client: null,
      room: null
    }
  },

  methods: {
    login() {
      // this.$client()
      // console.log('$colyseus', this.$colyseus())
      // console.log('$init', this.$init(this.url))
      // console.log('$client', this.$client())

      // Get host
      let host = window.document.location.host.replace(/:.*/, '');
      let urls = window.document.location.protocol.replace("https:", "wss:") + '//' + host + ( window.document.location.port ? ':' + window.document.location.port : '')
      let url = window.document.location.protocol.replace("http:", "ws:") + '//' + host + ( window.document.location.port ? ':' + window.document.location.port : '')
      let clientUrl = (window.document.location.protocol === 'https:') ? urls : url
      console.log('clientUrl', clientUrl)

      // Connect to server
      this.client = new Colyseus.Client(clientUrl);

      // Join Room & Set up
      this.room = this.client.join("chat");
      this.room.onJoin.add(() => console.log("joined"))
      this.room.onStateChange.addOnce((state) => console.log("initial room state:", state))
      this.room.onStateChange.addOnce((state) => {
        // new room state
        // this signal is triggered on each patch
      })
      this.room.onMessage.add((message) => this.messages.push(message)) // listen to patches coming from the server
    },

    // send message to room on submit
    add () {
      this.room.send({ message: this.message });
    }
  }

}
</script>

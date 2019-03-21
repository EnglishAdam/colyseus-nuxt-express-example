<template>
  <v-layout row>
    <start-dialog />
    <!-- dialogs -->
    
    <v-flex xs2>
      <v-list class="fill-height grey lighten-4" subheader>
        <v-subheader>Users in channel</v-subheader>
        <v-divider></v-divider>
        <v-list-tile
          v-for="user in users"
          :key="user.name"
          avatar
          @click=""
        >
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="user.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>

    <v-flex xs10 white>
      <p>Right Panel</p>
    </v-flex>

  </v-layout>
</template>

<script>
import Dialog from '~/components/Dialog.vue'

export default {
  layout: 'blank',

  components: {
    'start-dialog': Dialog
  },

  data () {
    return {
      users: [
        { name: 'user 1', joinedAt: Date.now() },
        { name: 'user 2', joinedAt: Date.now() },
        { name: 'user 3', joinedAt: Date.now() },
        { name: 'user 4', joinedAt: Date.now() }
      ]
    }
  }
  
}
</script>

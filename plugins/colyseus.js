

import Vue from 'vue'
import * as Colyseus from "colyseus.js"

let client = null

// Create ds plugin
const ColyseusPlugin = {}
ColyseusPlugin.install = function(Vue, options) {
  Vue.prototype.$colyseus = function(...args) {
    console.log('$colyseus', ...args)
    return Colyseus
  }

  Vue.prototype.$init = function(...args) {
    console.log('$init', ...args)
    if (client == null) client = new Colyseus.Client(...args)
    return client
  }

  Vue.prototype.$client = function(...args) {
    console.log('$client', ...args)
    return client
  }
}

// Attach to vue
Vue.use(ColyseusPlugin)

// FILE: main.js

import { createApp } from 'vue'
import { Quasar ,SessionStorage,Notify} from 'quasar'


// Import icon libraries
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

//quasar css and our css
import 'quasar/src/css/index.sass'
import("./css/main.css");
import 'css-paint-polyfill';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from './router'

const myApp = createApp(App)
myApp.use(router)
myApp.use(Quasar, {
  plugins: {SessionStorage,Notify}, // import Quasar plugins and add here
  config: {
    notify: { timeout:450 }
  }
})


// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')

<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png">
  <div><x-input placeholder="htllo" :error="error" v-model="ip"/></div>
</div>
</template>

<script>
  import { getMessaging, onMessage } from "firebase/messaging";

import XInput from './components/XInput.vue'
import firebaseMessaging from './firebase'
export default {
  name: 'App',
  components: {
    XInput
  },
  watch : {
  },
  data() {
    return {
      ip: '',
      error: true
    }
  },
  mounted() {
    const key = "BC1mtP-qOA8vbgNMvFHe1wcvICSblPWV8IScA9DfZVTocCEFGA_kNl7zmrFG0t4VDtGnOX5PWMDGrp8Fo12XHPk";
    console.log('Firebase cloud messaging object', this.$messaging)
    firebaseMessaging.firebaseDependencies.installations.getToken({ vapidKey: key })
      .then((currentToken) => {
        if (currentToken) {
          console.log('client token', currentToken)
          
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      })


  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    alert()
    // ...
  });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

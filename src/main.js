import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import firebaseMessaging from './firebase'

const app = createApp(App)

app.config.globalProperties.$messaging = firebaseMessaging

app.mount('#app')

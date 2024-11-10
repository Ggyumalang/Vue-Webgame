import { createApp } from 'vue';
import App from './App.vue'
import { store } from './store'; //Vuex 스토어

const app = createApp(App).use(store).mount('#app');

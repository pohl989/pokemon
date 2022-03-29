import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";

import { $http } from "./axios-config";

createApp(App).use(store).use(router).use(VueAxios, $http).mount("#app");

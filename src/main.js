import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useAuthStore } from "@/stores/auth";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

const authStore = useAuthStore(pinia);
await authStore.initializeAuth();

app.mount("#app");

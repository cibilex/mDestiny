import { createRouter, createWebHistory } from "../../node_modules/vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
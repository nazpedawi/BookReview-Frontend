import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BookDetailsView from "@/views/BookDetailsView.vue";
import LoginView from "@/components/Login.vue";
import SignupView from "@/components/Signup.vue";
import AddBookView from "@/components/AddBook.vue";
import EditBookView from "@/components/EditBook.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/book/:id",
      name: "BookDetails",
      component: BookDetailsView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
    },
    {
      path: "/addbook",
      name: "AddBook",
      component: AddBookView,
    },
    {
      path: "/editbook/:id",
      name: "EditBook",
      component: EditBookView, 
    },
  ],
});

export default router;

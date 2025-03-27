import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BookDetailsView from "@/views/BookDetailsView.vue";
import LoginView from "@/components/Login.vue";
import SignupView from "@/components/Signup.vue";
import AddBookView from "@/components/AddBook.vue";
import EditBookView from "@/components/EditBook.vue";
import { useAuthStore } from "@/stores/auth"; 

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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); 

  if (!authStore.isAuthenticated) {
    // Fetch user data if not loaded yet
    if (!authStore.user) {
      await authStore.fetchUser();
    }

    // If trying to access restricted pages (AddBook, EditBook) as a non-admin, redirect to home
    if (to.name === "AddBook" || to.name === "EditBook") {
      if (!authStore.isAdmin) {
        return next("/"); 
      }
    }
  } else {
    // If the user is already logged in, prevent access to login and signup pages
    if (to.name === "Login" || to.name === "Signup") {
      return next("/");
    }
  }

  next();  // Proceed with the navigation
});

export default router;

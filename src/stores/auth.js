import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user && state.user.role === "Admin",
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
    
      try {
        const response = await axios.post(API_ENDPOINTS.users.login, credentials);
    
        if (response.data.token) {
          this.token = response.data.token;
          this.user = response.data.user;
          localStorage.setItem("authToken", this.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
          return response;
        }
      } catch (error) {
        this.error = error?.response?.data?.error || "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  
    async signup(userData) {
      this.loading = true;
      this.error = null;
    
      try {
        const response = await axios.post(API_ENDPOINTS.users.signup, userData);
    
        if (response.data.success) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.error =
          error?.response?.data?.error || "There was an error signing up. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    },

    async initializeAuth() {
      const token = localStorage.getItem("authToken");
      if (token) {
        this.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          await this.fetchUser();
        } catch (error) {
            this.logout();
      }
    }
    },

    async fetchUser() {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.get(API_ENDPOINTS.users.me, {
            headers: { Authorization: `Bearer ${token}` },
          });

          this.user = response.data;
        } catch (error) {
            this.logout();
        }
      } else {
        this.user = null;
      }
    },
  },
});

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
        const response = await axios.post(API_ENDPOINTS.users.login, {
          username: credentials.username,
          password: credentials.password,
        });

        if (response.data.token) {
          this.token = response.data.token;
          this.user = response.data.user;
          localStorage.setItem("authToken", this.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
          return response;
        } else {
          this.error = 'Invalid username or password. Please try again.';
          throw new Error(this.error);
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'There was an error logging in. Please try again later.';
        throw new Error(this.error);
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
          return response;
        } else {
          this.error = 'Signup failed. Please try again.';
          throw new Error(this.error);
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'There was an error signing up. Please try again later.';
        throw new Error(this.error);
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
          this.user = null;
        }
      } else {
        this.user = null;
      }
    },
  },
});

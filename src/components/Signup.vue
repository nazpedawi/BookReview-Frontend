<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card bg-dark text-white h-100 border border-light rounded">
          <div class="card-header">
            <h4 class="text-center">Sign Up</h4>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <form @submit.prevent="submitForm" class="signup-form">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    v-model="firstName"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    v-model="lastName"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <!-- Hidden input for role, defaulting to "RegularUser" -->
              <input type="hidden" v-model="role" value="RegularUser" />
              <div class="mb-3 text-center">
                <button type="submit" class="btn btn-outline-light btn-lg w-100">
                  Sign Up
                </button>
              </div>
            </form>
            <p class="text-center mt-3">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role: "RegularUser",
    };
  },

  computed: {
    authStore() {
      return useAuthStore(); 
    },
  },
  methods: {
    async submitForm() {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role,
      };

      try {
        await this.authStore.signup(userData); 
        this.$router.push("/login");
      } catch (error) {
        console.error("Signup error", error);
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header {
  background-color: #343a40;
}

.card-body {
  padding: 20px;
}

.btn-outline-light {
  color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-outline-light:hover {
  background-color: #f8f9fa;
  color: #343a40;
}

.text-center a {
  color: #f8f9fa;
}

.text-center a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center my-5">
    <div class="row w-100">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card bg-dark text-white h-100 border border-light rounded">
          <div class="card-header">
            <h4 class="text-center">Login</h4>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <!-- Display error if there is a login issue -->
            <div v-if="authStore.error" class="alert alert-danger">
              {{ authStore.error }}
            </div>

            <form @submit.prevent="handleLogin" class="flex-grow-1">
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

              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>

              <div class="mb-4 text-center">
                <button type="submit" class="btn btn-outline-light btn-lg w-100">Login</button>
              </div>
            </form>

            <p class="text-center mt-2">
              Don't have an account yet?
              <router-link to="/signup">Sign Up</router-link>
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
      username: "",
      password: "",
    };
  },
  computed: {
    authStore() {
      return useAuthStore(); 
    },
  },
  methods: {
    async handleLogin() {
      try {
        await this.authStore.login({
          username: this.username,
          password: this.password,
        });
        
        this.$router.push("/"); 
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  background-color: #343a40;
}

.form-label {
  font-weight: 500;
}

.btn-outline-light {
  border-color: #fff;
  color: #fff;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #343a40;
}

a {
  color: #fff;
}

a:hover {
  color: #007bff;
}
</style>

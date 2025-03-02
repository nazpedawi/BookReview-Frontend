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
              <div v-if="loginError" class="alert alert-danger">
                {{ loginErrorMessage }}
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
  export default {
    data() {
      return {
        username: '',
        password: '',
        loginError: false,
        loginErrorMessage: '',
      };
    },
    methods: {
      async handleLogin() {
        // Simulating an API request for login
        try {
          const response = await this.$axios.post('/login', {
            username: this.username,
            password: this.password,
          });
          
          // Handle successful login (e.g., redirect to dashboard)
          if (response.data.success) {
            this.$router.push('/dashboard');
          } else {
            this.loginError = true;
            this.loginErrorMessage = 'Invalid username or password. Please try again.';
          }
        } catch (error) {
          this.loginError = true;
          this.loginErrorMessage = 'There was an error logging in. Please try again later.';
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
  
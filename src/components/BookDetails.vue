<template>
  <div class="container my-5">
    <div class="card mb-3 book-details-card custom-card">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="getCoverImagePath(book.cover_image)"
            :alt="book.title"
            class="img-fluid cover-image"
          />
        </div>

        <div class="col-md-8">
          <div class="card-body d-flex flex-column">
            <div>
              <h3 class="card-title">{{ book.title }}</h3>
              <p class="card-text">{{ book.description }}</p>
              <p class="card-text">
                <strong>Author:</strong> {{ book.author }}
              </p>
              <p class="card-text">
                <strong>Genre(s):</strong>
                {{ book.genres.map((genre) => genre.name).join(", ") }}
              </p>
              <p class="card-text">
                <strong>Publication Year:</strong> {{ book.publication_year }}
              </p>
            </div>

            <!-- Actions Section (For Admin Only) -->
            <div class="mt-auto">
              <div
                class="card-footer d-flex flex-column flex-md-row justify-content-between"
              >
                <router-link
                  v-if="isAdmin"
                  :to="`/editbook/${book.book_id}`"
                  class="btn btn-outline-light btn-lg mb-2 mb-md-0 w-100 w-md-50 me-md-2"
                >
                  Edit
                </router-link>

                <button
                  v-if="isAdmin"
                  @click="$emit('request-delete')"
                  class="btn btn-outline-danger btn-lg w-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_ENDPOINTS } from '@/config';

export default {
  props: {
    book: Object,
  },
  data() {
    return {
      user: null,
      isLoggedIn: false,
      isAdmin: false,
    };
  },
  methods: {
    async fetchUser() {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.get(API_ENDPOINTS.users.me, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.user = response.data;
          this.isLoggedIn = true;

          // Check if the user is an admin
          if (this.user.role === 'Admin') {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        } catch (error) {
          this.isLoggedIn = false;
          this.user = null;
        }
      }
    },
    getCoverImagePath(relativePath) {
      const baseUrl = "http://localhost/images/";
      return baseUrl + relativePath;
    },
  },
  mounted() {
    this.fetchUser(); // Fetch user when the component is mounted
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.fetchUser(); // Re-fetch user after logging in
      } else {
        this.user = null; // Clear user data if logged out
        this.isAdmin = false; // Reset admin status
      }
    },
  },
};
</script>

<style scoped>
.book-details-card {
  background-color: rgb(80, 60, 60);
  color: white;
}

.cover-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-body {
  flex-grow: 1;
}

.btn-outline-light {
  background-color: rgba(0, 123, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.895);
  color: rgba(255, 255, 255, 0.7);
}

.btn-outline-light:hover {
  background-color: rgba(0, 123, 255, 0.4);
  border-color: rgba(0, 123, 255, 0.397);
  color: white;
}

.btn-outline-danger {
  background-color: rgba(220, 53, 69, 0.2);
  border-color: rgba(220, 53, 69, 0.8);
  color: rgba(220, 53, 69, 0.7);
}

.btn-outline-danger:hover {
  background-color: rgba(220, 53, 69, 0.4);
  border-color: rgba(220, 53, 69, 0.7);
  color: white;
}

@media (max-width: 768px) {
  .cover-image {
    height: auto;
  }
}
</style>

<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center text-white">Edit Book</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>

    <form @submit.prevent="submitForm">
      <!-- Book Title -->
      <div class="mb-3">
        <label for="title" class="form-label text-white">Book Title</label>
        <input
          type="text"
          class="form-control"
          v-model="form.title"
          id="title"
          required
        />
      </div>

      <!-- Book Description -->
      <div class="mb-3">
        <label for="description" class="form-label text-white"
          >Book Description</label
        >
        <textarea
          class="form-control"
          v-model="form.description"
          id="description"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Author -->
      <div class="mb-3">
        <label for="author" class="form-label text-white">Author</label>
        <input
          type="text"
          class="form-control"
          v-model="form.author"
          id="author"
          required
        />
      </div>

      <!-- Genre(s) -->
      <div class="mb-3">
        <label class="form-label text-white">Genre(s)</label><br />
        <div class="row">
          <div
            class="col-lg-3 col-md-4 col-sm-4"
            v-for="genre in genres"
            :key="genre.id"
          >
            <input
              type="checkbox"
              :value="genre.id"
              v-model="form.genres"
              :id="`genre_${genre.id}`"
              class="mx-1"
            />
            <label :for="`genre_${genre.id}`" class="text-white">
              {{ genre.name }}
            </label>
          </div>
        </div>
        <div v-if="genreError" class="text-danger mt-2">
          Please select at least one genre.
        </div>
      </div>

      <!-- Publication Year -->
      <div class="mb-3">
        <label for="publication_year" class="form-label text-white"
          >Publication Year</label
        >
        <select
          class="form-control"
          v-model="form.publication_year"
          id="publication_year"
          required
        >
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <!-- Cover Image -->
      <div class="mb-5">
        <label for="cover_image" class="form-label text-white"
          >Cover Image (only jpg, png, jpeg, and webp file types are
          allowed)</label
        >
        <input
          type="file"
          class="form-control"
          @change="handleFileUpload"
          accept="image/*"
        />
        <small class="text-white">Leave blank to keep the current image.</small>
      </div>

      <!-- Submit Button -->
      <div class="mb-3 d-flex justify-content-center">
        <button type="submit" class="btn btn-outline-light btn-lg w-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.146.854a2 2 0 0 1 2.828 2.828l-9 9a2 2 0 0 1-.707.392l-3.5 1.4a1 1 0 0 1-1.278-1.277l1.4-3.5a2 2 0 0 1 .392-.707l9-9a2 2 0 0 1 2.828 0z"
            />
          </svg>
          Update Book
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config"; // Adjust according to your project setup

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        author: "",
        genres: [],
        publication_year: "",
        cover_image: null,
      },
      genres: [],
      years: Array.from(
        { length: new Date().getFullYear() - 1899 },
        (_, i) => 1900 + i
      ),
      genreError: false,
      error: null,
      success: null,
      bookId: null, // To hold the book ID from the route params
      isLoading: false,
    };
  },

  mounted() {
    this.bookId = this.$route.params.id;
    this.fetchGenres();
    this.loadBookDetails();
  },

  methods: {
    handleFileUpload(event) {
      this.form.cover_image = event.target.files[0];
    },

    async fetchGenres() {
      try {
        this.error = null;
        const response = await axios.get(`${API_ENDPOINTS.genres}`);
        this.genres = response.data;
      } catch (error) {
        this.genres = [];
        this.error = error.response?.data?.message || "Failed to load genres.";
      }
    },

    async loadBookDetails() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(
          `${API_ENDPOINTS.books}/${this.bookId}`
        );
        const { book, reviews } = response.data;

        this.form.title = book.title;
        this.form.description = book.description;
        this.form.author = book.author;
        this.form.publication_year = book.publication_year;
        this.form.cover_image = book.cover_image;
        console.log(book.genres);
        this.form.genres = book.genres.map(genre => genre.genre_id);
      } catch (error) {
        console.error("Error fetching book details:", error);
        this.error = error.message || "Failed to load book.";
      } finally {
        this.isLoading = false;
      }
    },

    async submitForm() {
      if (this.form.genres.length === 0) {
        this.genreError = true;
        return;
      }
      this.genreError = false;

      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("author", this.form.author);
      formData.append("publication_year", this.form.publication_year);
      this.form.genres.forEach((genreId) => {
        formData.append("genres[]", genreId);
      });
      if (this.form.cover_image) {
        formData.append("cover_image", this.form.cover_image);
      }

      try {
        const response = await axios.post(
          `${API_ENDPOINTS.books}/${this.bookId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.success = "Book updated successfully!";
        this.error = null;
      } catch (err) {
        this.error = err.response?.data || "Failed to update book.";
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>

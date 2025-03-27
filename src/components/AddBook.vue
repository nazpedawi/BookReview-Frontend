<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center text-white">Add New Book</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>

    <form @submit.prevent="submitForm">
    
      <div class="mb-3">
        <label for="title" class="form-label text-white">Book Title</label>
        <input type="text" class="form-control" v-model="form.title" id="title" required />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label text-white">Book Description</label>
        <textarea class="form-control" v-model="form.description" id="description" rows="4" required></textarea>
      </div>

      <div class="mb-3">
        <label for="author" class="form-label text-white">Author</label>
        <input type="text" class="form-control" v-model="form.author" id="author" required />
      </div>

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
        <div v-if="genreError" class="text-danger mt-2">Please select at least one genre.</div>
      </div>

      <div class="mb-3">
        <label for="publication_year" class="form-label text-white">Publication Year</label>
        <select
          class="form-control"
          v-model="form.publication_year"
          id="publication_year"
          required
        >
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="mb-5">
        <label for="cover_image" class="form-label text-white">Cover Image (only jpg, png, jpeg, and webp file types are
          allowed)</label>
        <input
          type="file"
          class="form-control"
          @change="handleFileUpload"
          accept="image/*"
          required
        />
      </div>

      <div class="mb-3 d-flex justify-content-center">
        <button type="submit" class="btn btn-outline-light btn-lg w-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm1 4v3h3v1H9v3H8V8H5V7h3V4h1z"
            />
          </svg>
          Add Book
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

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
      years: Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 1900 + i),
      genreError: false,
      error: null,
      success: null,
    };
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
  formData.append("cover_image", this.form.cover_image);

  try {
    const response = await axios.post(API_ENDPOINTS.books, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    this.success = "Book added successfully!";
    this.error = null;

    // Reset form
    this.form = {
      title: "",
      description: "",
      author: "",
      genres: [],
      publication_year: "",
      cover_image: null,
    };
  } catch (err) {
    if (err.response) {
      this.error = err.response.data.error || "Failed to add book.";
    }
  }
}
    },
  mounted() {
    this.fetchGenres();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>

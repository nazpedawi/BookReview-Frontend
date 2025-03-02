<template>
    <div class="container mt-5">
      <h2 class="mb-4 text-center text-white">Add New Book</h2>
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
          <label for="description" class="form-label text-white">Book Description</label>
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
          <label class="form-label text-white">Genre(s)</label><br>
          <div class="row">
            <div
              class="col-lg-3 col-md-4 col-sm-6"
              v-for="genre in genres"
              :key="genre.id"
            >
              <input
                type="checkbox"
                :value="genre.id"
                v-model="form.genres"
                :id="genre.name.toLowerCase().replace(' ', '_')"
              />
              <label :for="genre.name.toLowerCase().replace(' ', '_')" class="text-white"
                >{{ genre.name }}</label
              >
            </div>
          </div>
          <div
            v-if="genreError"
            style="color: red; display: block; margin-top: 5px;"
          >
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
            <option
              v-for="year in years"
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>
  
        <!-- Cover Image -->
        <div class="mb-5">
          <label for="cover_image" class="form-label text-white"
            >Cover Image (only jpg, png, jpeg, and webp file types are allowed)</label
          >
          <input
            type="file"
            class="form-control"
            @change="handleFileUpload"
            accept="image/*"
            required
          />
        </div>
  
        <!-- Submit Button -->
        <div class="mb-3 d-flex justify-content-center">
          <button type="submit" class="btn btn-outline-light btn-lg w-50 mr-2">
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
  export default {
    data() {
      return {
        form: {
          title: '',
          description: '',
          author: '',
          genres: [],
          publication_year: '',
          cover_image: null,
        },
        genres: [
          { id: 1, name: 'Fiction' },
          { id: 2, name: 'Science' },
          { id: 3, name: 'Fantasy' },
          { id: 4, name: 'Biography' },
          // Add more genres as needed
        ],
        genreError: false,
        years: Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 1900 + i),
      };
    },
    methods: {
      handleFileUpload(event) {
        this.form.cover_image = event.target.files[0];
      },
      submitForm() {
        if (this.form.genres.length === 0) {
          this.genreError = true;
          return;
        }
        this.genreError = false;
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('description', this.form.description);
        formData.append('author', this.form.author);
        formData.append('genres', JSON.stringify(this.form.genres));
        formData.append('publication_year', this.form.publication_year);
        formData.append('cover_image', this.form.cover_image);
  
        // Submit the form data via an API call (example)
        // You can replace this with your actual API endpoint
        fetch('/book/add', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Book added:', data);
            // Handle the response (show success message or redirect)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles for the form */
  .container {
    max-width: 800px;
  }
  </style>
  
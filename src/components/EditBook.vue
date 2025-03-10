<template>
    <div class="container mt-5">
      <h2 class="mb-4 text-center text-white">Edit Book</h2>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <input type="hidden" v-model="book.id" />
  
        <div class="mb-3">
          <label for="title" class="form-label text-white">Book Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="book.title"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="description" class="form-label text-white">Book Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="book.description"
            rows="4"
            required
          ></textarea>
        </div>
  
        <div class="mb-3">
          <label for="author" class="form-label text-white">Author</label>
          <input
            type="text"
            class="form-control"
            id="author"
            v-model="book.author"
            required
          />
        </div>
  
        <div class="mb-3">
          <label class="form-label text-white">Genre(s)</label><br />
          <div class="row">
            <div
              v-for="genre in genres"
              :key="genre.id"
              class="col-lg-3 col-md-4 col-sm-6"
            >
              <input
                type="checkbox"
                :value="genre.id"
                v-model="book.genres"
                :id="genre.name.toLowerCase().replace(' ', '_')"
              />
              <label
                class="text-white"
                :for="genre.name.toLowerCase().replace(' ', '_')"
                >{{ genre.name }}</label
              ><br />
            </div>
          </div>
          <div
            v-if="genreError"
            id="genre-error"
            style="color: red; display: block; margin-top: 5px;"
          >
            Please select at least one genre.
          </div>
        </div>
  
        <div class="mb-3">
          <label for="publication_year" class="form-label text-white">Publication Year</label>
          <select
            class="form-control"
            id="publication_year"
            v-model="book.publication_year"
            required
          >
            <option
              v-for="year in years"
              :key="year"
              :value="year"
              :selected="year === book.publication_year"
              >{{ year }}</option
            >
          </select>
        </div>
  
        <div class="mb-5">
          <label for="cover_image" class="form-label text-white">Cover Image (only jpg, png, jpeg, and webp file types are allowed)</label>
          <input
            type="file"
            class="form-control"
            @change="handleFileUpload"
            accept="image/*"
          />
          <small class="text-white">Leave blank to keep the current image.</small>
        </div>
  
        <div class="mb-3 d-flex justify-content-center">
          <button type="submit" class="btn btn-outline-light btn-lg w-50 mr-2">
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
  export default {
    data() {
      return {
        book: {
          id: null,
          title: "",
          description: "",
          author: "",
          genres: [],
          publication_year: null,
          cover_image: null,
        },
        genres: [
          { id: 1, name: "Fiction" },
          { id: 2, name: "Science" },
          { id: 3, name: "Fantasy" },
          { id: 4, name: "Biography" },
          // More genres can be added as needed
        ],
        years: Array.from(
          { length: new Date().getFullYear() - 1900 },
          (_, i) => 1900 + i
        ),
        genreError: false,
      };
    },
    created() {
      // Fetch book details based on the book id passed via route params
      const bookId = this.$route.params.id;
      // Assuming `getBookDetails` is a method that fetches book data from your API
      this.getBookDetails(bookId);
    },
    methods: {
      async getBookDetails(bookId) {
        // Replace with actual API call to fetch book details by ID
        try {
          const response = await fetch(`/api/book/${bookId}`);
          const data = await response.json();
          if (data) {
            this.book = data;
          }
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      },
      handleFileUpload(event) {
        this.book.cover_image = event.target.files[0];
      },
      async submitForm() {
        if (this.book.genres.length === 0) {
          this.genreError = true;
          return;
        }
        this.genreError = false;
        const formData = new FormData();
        formData.append("title", this.book.title);
        formData.append("description", this.book.description);
        formData.append("author", this.book.author);
        formData.append("genres", JSON.stringify(this.book.genres));
        formData.append("publication_year", this.book.publication_year);
        if (this.book.cover_image) {
          formData.append("cover_image", this.book.cover_image);
        }
  
        // Replace with actual API call to update the book
        try {
          const response = await fetch(`/api/book/update/${this.book.id}`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log("Book updated successfully:", data);
          // Redirect or show success message
        } catch (error) {
          console.error("Error updating book:", error);
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
  